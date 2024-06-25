import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './GuestFeedback.css';

const GuestFeedback = () => {
  const [rating, setRating] = useState('5');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { email } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !description) {
      setError('All fields are required');
      return;
    }

    const feedbackData = {
      rating: Number(rating), 
      guestProfile: {
        guestEmail: email 
      },
      description,
      timestamp: new Date().toISOString() 
    };

    try {
      const response = await axios.post('http://localhost:3551/guest/feedback/add', feedbackData);
      console.log('Feedback submitted successfully:', response.data);
      setSuccess(true);
      setError('');
      setRating('5');
      setDescription('');
  
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="guest-feedback-container">
      <form className="guest-feedback-form" onSubmit={handleSubmit}>
        <div className="guest-form-group">
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
        {error && <div className="guest-feedback-error">{error}</div>}
        <button type="submit" className="guest-submit-button">Submit</button>
      </form>
      {success && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSuccess(false)}>&times;</span>
            <p>Feedback submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestFeedback;
