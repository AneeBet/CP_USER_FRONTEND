

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './CustomerTrackGrievance.css';

const CustomerTrackGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('None');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [error, setError] = useState(null); 
  const { customerId } = useUser(); 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:3552/customer/readall/${customerId}`);
        setAccounts(response.data);
        setError(null); 
      } catch (error) {
        console.error('Failed to fetch account details:', error);
        setError('Failed to fetch account details');
      }
    };
    fetchAccounts();
  }, [customerId]);

  useEffect(() => {
    if (selectedAccountNumber !== 'None') {
      fetchGrievances();
    } else {
      setGrievances([]);
    }
  }, [selectedAccountNumber, selectedStatus]);

  const fetchGrievances = async () => {
    try {
      const postData = {
        accountNumber: selectedAccountNumber
      };
      const response = await axios.post('http://localhost:3552/customer/grievance/readall', postData);
      const grievancesData = response.data || []; 
      const filteredData = grievancesData.filter(grievance =>
        selectedStatus === 'All' || grievance.status === selectedStatus
      );
      setGrievances(filteredData);
      setError(null); 
    } catch (error) {
      console.error('Failed to fetch grievances:', error);
      setGrievances([]);
      setError('Failed to fetch grievances');
    }
  };

  const handleAccountChange = (e) => {
    setSelectedAccountNumber(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className="track-app-container">
      {error && <div className="track-app-error-message">{error}</div>} 
      <div className="track-app-form-group">
        <label htmlFor="accountNumber">Select Account Number:<span style={{ color: 'red' }}>*</span></label>
        <select
          id="accountNumber"
          value={selectedAccountNumber}
          onChange={handleAccountChange}
          data-testid="accountNumber"
        >
          <option value="None">None</option>
          {accounts.map(account => (
            <option key={account.accountNumber} value={account.accountNumber}>
              {account.accountNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="track-app-form-group">
        <label htmlFor="statusFilter">Select Status:</label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={handleStatusChange}
          data-testid="statusFilter"
        >
          <option value="All">All</option>
          <option value="PENDING">Pending</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>
      <div className="track-app-info">
        <table>
          <thead>
            <tr>
              <th>Grievance ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map(grievance => (
              <tr key={grievance.grievanceId}>
                <td>{grievance.grievanceId}</td>
                <td>{grievance.subject}</td>
                <td>{grievance.description}</td>
                <td>{grievance.timestamp ? new Date(grievance.timestamp).toLocaleString() : ''}</td>
                <td>{grievance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTrackGrievances;
