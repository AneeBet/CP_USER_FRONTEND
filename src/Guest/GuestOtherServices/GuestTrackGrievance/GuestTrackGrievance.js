


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './GuestTrackGrievance.css';

 
const GuestTrackGrievance = () => {
  const [grievances, setGrievances] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');  
  const { email } = useUser(); 
  const [error, setError] = useState('');  

  useEffect(() => {
    fetchGrievances();
  }, [email]);
 
  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`http://localhost:3551/guest/grievance/readall/${email}`);
      setGrievances(response.data);  
    } catch (error) {
      console.error('Failed to fetch grievances:', error);
      setError('Failed to fetch grievances');
    }
  };
 
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
 
 
  const filteredGrievances = grievances.filter(grievance =>
    selectedStatus === 'All' || grievance.status === selectedStatus
  );
 
  return (
    <div className="guest-other-services-container">
      <div className="grievance-tracking-container">
        <div className="guest-form-group">
          <label htmlFor="statusFilter">Select Status:</label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="All">All</option>
            <option value="PENDING">Pending</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
        {error && <div className="guest-grievance-error">{error}</div>}
        <div className="guest-grievance-tracking-info">
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
              {filteredGrievances.map(grievance => (
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
    </div>
  );
};
 
export default GuestTrackGrievance;
