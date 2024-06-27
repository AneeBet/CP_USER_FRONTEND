import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './GuestScheduleCall.css';

const GuestScheduleCall = () => {
  const [timeSlot, setTimeSlot] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal
  const { email } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!timeSlot || !subject || !description) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);

    const scheduleCallData = {
      guestProfile: {
        guestEmail: email 
      },
      subject,
      description,
      timeSlot,
      status: 'PENDING' 
    };

    try {
      const response = await axios.post('http://localhost:3551/guest/schedulecall/add', scheduleCallData);
      console.log(response.data);
      setError(''); 
      setIsModalOpen(true); // Open modal
      setTimeSlot(''); 
      setSubject(''); 
      setDescription(''); 
    } catch (error) {
      console.error('Error submitting schedule call:', error);
      setError('Error submitting schedule call');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="guest-schedule-call-container">
      <form className="guest-schedule-call-form" onSubmit={handleSubmit}>
        <div className="guest-form-group">
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
        <div className="guest-form-group">
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
        <div className="guest-form-group">
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
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="submit" className="guest-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Schedule call request submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestScheduleCall;
