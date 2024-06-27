import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './CustomerRegisterGrievance.css';

const CustomerRegisterGrievance = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [error, setError] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal
  const { customerId } = useUser(); 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:3552/customer/readall/${customerId}`);
        setAccountNumbers(response.data.map(account => account.accountNumber));
        if (response.data.length > 0) {
          setSelectedAccount(response.data[0].accountNumber.toString());
        }
        setError(''); 
      } catch (error) {
        console.error('Failed to fetch account numbers:', error);
        setError('Failed to fetch account numbers');
      }
    };
    if (customerId) {
      fetchAccounts();
    }
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAccount || !subject || !description) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);

    const grievanceData = {
      customerCardAccount: {
        accountNumber: selectedAccount,
      },
      subject,
      description,
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    };

    try {
      const response = await axios.post('http://localhost:3552/customer/grievance/add', grievanceData);
      console.log('Grievance submitted successfully:', response.data);
      setError('');
      setIsModalOpen(true); // Open modal
     
      setSubject('');
      setDescription('');
      setSelectedAccount('');
    } catch (error) {
      console.error('Error submitting grievance:', error);
      setError('Error submitting grievance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="register-grievance-container">
      <form className="grievance-form" onSubmit={handleSubmit}>
        <div className="grievance-form-group">
          <label htmlFor="accountNumber">
            Select Account Number: <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            id="accountNumber"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            required
          >
            {accountNumbers.map(accountNumber => (
              <option key={accountNumber} value={accountNumber}>
                {accountNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="grievance-form-group">
          <label htmlFor="subject">
            Subject: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="grievance-form-group">
          <label htmlFor="description">
            Description: <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="grievance-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className="grievance-error-message">{error}</p>} 
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>Grievance submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerRegisterGrievance;
