import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './CustomerFeedback.css';

const CustomerFeedback = () => {
  const [rating, setRating] = useState('5');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal
  const { customerId } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !description) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);

    const feedbackData = {
      customerId: customerId, 
      rating,
      description
    };

    try {
      const response = await axios.post('http://localhost:3552/customer/feedback/add', feedbackData);
      console.log('Feedback submitted successfully:', response.data);
      setError(''); 
      setIsModalOpen(true); // Open modal
      
      setRating('5');
      setDescription('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <button type="submit" className="feedback-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>Feedback submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;
