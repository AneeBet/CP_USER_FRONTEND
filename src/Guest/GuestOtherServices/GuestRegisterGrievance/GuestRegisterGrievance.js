import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './GuestRegisterGrievance.css';

const GuestRegisterGrievance = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal
  const { email } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !description) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);

    const grievanceData = {
      guestProfile: {
        guestEmail: email 
      },
      subject,
      description,
      timestamp: new Date().toISOString(), 
      status: 'PENDING'
    };

    try {
      const response = await axios.post('http://localhost:3551/guest/grievance/add', grievanceData);
      console.log('Grievance submitted successfully:', response.data);
      setError(''); 
      setIsModalOpen(true); // Open modal
      setSubject(''); 
      setDescription(''); 
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
    <div className="guest-register-grievance-container">
      <form className="guest-grievance-form" onSubmit={handleSubmit}>
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
            <p>Grievance submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestRegisterGrievance;
