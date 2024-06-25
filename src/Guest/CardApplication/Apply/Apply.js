import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Apply.css'
import CreditCard2 from '../../../Design/CreditCard2';

const Apply = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply/personal-details');
  };

  return (
    <div className="apply-container">
      <div className="apply-content">
        <h1>Get Your Perfect Credit Card</h1>
        <p>Discover the best credit card for you. Enjoy great rewards, low interest rates, and exclusive benefits. Apply now and take control of your financial future!</p>
        <button className="apply-button" onClick={handleApplyClick}>Apply Now</button>
      </div>
      <div className="apply-image">
      <CreditCard2
          cardType="Gold"
          cardName="Gold"
          customerName="Ashwini Khedkar"
          expiryDate="12/28"
          cardNumber="5678 1234 5678 1234"
        />
      </div>
    </div>
  );
};

export default Apply;

