import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext'; 
import './CustomerScheduleCall.css';

const CustomerScheduleCall = () => {
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null); 
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
        setError(null); 
      } catch (error) {
        console.error('Failed to fetch account numbers:', error);
        setError('Failed to fetch account numbers');
      }
    };
    fetchAccounts();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAccount || !timeSlot || !subject || !description) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);

    const scheduleCallData = {
      customerCardAccount: {
        accountNumber: selectedAccount
      },
      subject,
      description,
      timeSlot,
      status: "PENDING"
    };

    try {
      const response = await axios.post('http://localhost:3552/customer/schedulecall/add', scheduleCallData);
      console.log('Schedule call request submitted successfully:', response.data);
      setError(null); 
      setIsModalOpen(true); // Open modal
      
      setSelectedAccount('');
      setTimeSlot('');
      setSubject('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting schedule call request:', error);
      setError('Error submitting schedule call request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="schedule-call-container">
      {error && <div className="schedule-call-error-message">{error}</div>} 
      <form className="schedule-call-form" onSubmit={handleSubmit}>
        <div className="schedule-call-form-group">
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
        <div className="schedule-call-form-group">
          <label htmlFor="timeSlot">
            Select Time Slot: <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select Time Slot</option>
            <option value="Morning(9am-12pm)">Morning(9am-12pm)</option>
            <option value="Afternoon(12pm-3pm)">Afternoon(12pm-3pm)</option>
            <option value="Evening(3pm-6pm)">Evening(3pm-6pm)</option>
          </select>
        </div>
        <div className="schedule-call-form-group">
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
        <div className="schedule-call-form-group">
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
        <button type="submit" className="schedule-call-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>Schedule call request submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerScheduleCall;
