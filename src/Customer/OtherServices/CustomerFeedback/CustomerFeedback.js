


import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './CustomerFeedback.css';

const CustomerFeedback = () => {
  const [rating, setRating] = useState('5');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const { customerId } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !description) {
      setError('All fields are required');
      return;
    }

    const feedbackData = {
      customerId: customerId, 
      rating,
      description
    };

    try {
      const response = await axios.post('http://localhost:3552/customer/feedback/add', feedbackData);
      console.log('Feedback submitted successfully:', response.data);
      setError(''); 
      setSuccessMessage('Feedback submitted successfully!'); 
      
      setRating('5');
      setDescription('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSuccessMessage(''); 
      setError('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-form-group">
          <label htmlFor="rating">
            Rating: <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="feedback-form-group">
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
        {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
        <button type="submit" className="feedback-submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CustomerFeedback;

