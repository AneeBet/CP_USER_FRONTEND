import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

import { FaCreditCard, FaRegGem, FaPlane } from 'react-icons/fa';
import CreditCard2 from '../../Design/CreditCard2';
import ShowCardDetails2 from '../../Design/ShowCardDetails';


const LandingPage = () => {
  const navigate = useNavigate();

  const goToNewPage = () => {
    navigate('/customer-login');
  };

  const goToGuest = () => {
    navigate('/guest-login');
  };

  const features = [
    'Metal card',
    'Unlimited Airport Lounge Access',
    '2X Reward Points on Weekend Dining',
    '10,000 Bonus Reward Points on spends of ₹ 4 lakh every calendar quarter',
  ];

  return (
    <>
    <div className='landing_page_body'>
      <div className="landingPage__navbar">
        <div className="landingPage__navbar-brand">CREDIT PULSE</div>
        <div className="landingPage__navbar-links">
          <button onClick={goToNewPage} className="landingPage__btn">Login</button>
        </div>
      </div>
      <div className="landingPage">
        <div className="landingPage__welcome-section">
          <h1>WELCOME TO CREDIT PULSE</h1>
          <p>Your Trusted Credit Solution</p>
        </div>

        <div className="landingPage__intro-section">
          <p>At Credit Pulse, we offer a range of premium credit cards designed to meet your unique needs. Whether you're looking for rewards, travel benefits, or everyday perks, we have the right card for you. Explore our offerings and choose the card that fits your lifestyle best.</p>
        </div>

        <div className="landingPage__icons">
          <div className="landingPage__icon">
            <FaCreditCard size={40} color="#fff" />
            <p>Premium Cards</p>
          </div>
          <div className="landingPage__icon">
            <FaRegGem size={40} color="#fff" />
            <p>Exclusive Rewards</p>
          </div>
          <div className="landingPage__icon">
            <FaPlane size={40} color="#fff" />
            <p>Travel Benefits</p>
          </div>
        </div>

        <div className="landingPage__cards-offer-section">
          <h2>Cards We Offer</h2>
          <div className="landingPage__cards">
            <div className="landingPage__card-option">
              <CreditCard2 
                cardType="Platinum"
                cardName="Platinum"
                customerName="Amal Parambat"
                expiryDate="04/25"
                cardNumber="xxx xxx xx34"
              />
              <ShowCardDetails2 cardName="Platinum" features={features} />
            </div>

            <div className="landingPage__card-option">
              <CreditCard2 
                cardType="Gold"
                cardName="Gold"
                customerName="Anurag Saraswat"
                expiryDate="04/25"
                cardNumber="xxx xxx xx35"
              />
              <ShowCardDetails2 cardName="Gold" features={features} />
            </div>

            <div className="landingPage__card-option">
              <CreditCard2 
                cardType="Silver"
                cardName="Silver"
                customerName="Amit Patil"
                expiryDate="04/25"
                cardNumber="xxx xxx xx38"
              />
              <ShowCardDetails2 cardName="Silver" features={features} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default LandingPage;