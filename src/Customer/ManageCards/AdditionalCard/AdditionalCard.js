import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../Login/Context/UserContext';
import CreditCard2 from '../../../Design/CreditCard2';
import ShowCardDetails2 from '../../../Design/ShowCardDetails';
import './AdditionalCard.css'


const AdditionalCard = () => {
  const [selectedCard, setSelectedCard] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const {customerId}=useUser();


  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  const handleSubmit = async () => {
 

   const isUpgrade = location.pathname.includes("upgrade");

    const requestData = {
      customerId: customerId, 
      cardType: selectedCard,
      isUpgrade:isUpgrade,
      status: "PENDING"
    };

    try {
      const response = await axios.post("http://localhost:3552/customer/create-customer-card-application", requestData);
      console.log("Response:", requestData.isUpgrade);
      
      alert("Application sent successfully");
     
      
    } catch (error) {
      console.error("Error submitting the application:", error);
    }
  };

  const features = [
    'Metal card',
    'Unlimited Airport Lounge Access',
    '2X Reward Points on Weekend Dining',
    '10,000 Bonus Reward Points on spends of ₹ 4 lakh every calendar quarter',
  ];

  return (
    <>   
     <div className="additional-card-container">
      <h2>Choose the Right Credit Card for Your Lifestyle</h2>
      <p>
        Credit Cards serve as a convenient financial tool, providing you with
        the ease of managing your expenses seamlessly.
      </p>

      <div className="additional-cards">
        <div className="additional-card-option">
          <input
            type="radio"
            id="Platinum-card"
            name="card-type"
            value="Platinum"
            checked={selectedCard === 'Platinum'}
            onChange={handleCardChange}
          />
          <label htmlFor="Platinum-card" className="additional-card-label">
            <div className="credit-card-container">
              <CreditCard2
                cardType="Platinum"
                cardName="Platinum"
                customerName="YOUR NAME"
                expiryDate="04/25"
                cardNumber="1234 4567 7890 1234"
              />
            </div>
            <div className="show-card-details">
              <ShowCardDetails2 cardName="Platinum" features={features} />
            </div>
          </label>
        </div>

        <div className="additional-card-option">
          <input
            type="radio"
            id="Gold-card"
            name="card-type"
            value="Gold"
            checked={selectedCard === 'Gold'}
            onChange={handleCardChange}
          />
          <label htmlFor="Gold-card" className="additional-card-label">
            <div className="credit-card-container">
              <CreditCard2 
                cardType="Gold"
                cardName="Gold"
                customerName="YOUR NAME"
                expiryDate="04/25"
                cardNumber="1234 4567 7890 1234"
              />
            </div>
            <div className="show-card-details">
              <ShowCardDetails2 cardName="Gold" features={features} />
            </div>
          </label>
        </div>

        <div className="additional-card-option">
          <input
            type="radio"
            id="Silver-card"
            name="card-type"
            value="Silver"
            checked={selectedCard === 'Silver'}
            onChange={handleCardChange}
          />
          <label htmlFor="Silver-card" className="additional-card-label">
            <div className="credit-card-container">
              <CreditCard2 
                cardType="Silver"
                cardName="Silver"
                customerName="YOUR NAME"
                expiryDate="04/25"
                cardNumber="1234 4567 7890 1234"
              />
            </div>
            <div className="show-card-details">
              <ShowCardDetails2 cardName="Silver" features={features} />
            </div>
          </label>
        </div>
      </div>

      <div className="additional-action-buttons">
        <button className="additional-button" onClick={handleSubmit}>
          Submit Application
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{message}</h2>
          </div>
        </div>
      )}
    </div>
      
      
    </>
  );
};

export default AdditionalCard;
