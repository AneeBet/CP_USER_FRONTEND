import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import CreditCard2 from '../../../Design/CreditCard2';
import ShowCardDetails2 from '../../../Design/ShowCardDetails';
import './ChooseYourCard.css';
 
const ChooseyourCard = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);
  const [selectedCard, setSelectedCard] = useState(data.selectedCard || '');
  const [error, setError] = useState('');
 
  const cardFeatures = {
    Platinum: [
      'Metal card',
      'Unlimited Airport Lounge Access',
      '2X Reward Points on Weekend Dining',
      '10,000 Bonus Reward Points on spends of ₹ 4 lakh every calendar quarter',
    ],
    Gold: [
      'Gold card',
      'Access to select Airport Lounges',
      '1.5X Reward Points on Weekend Dining',
      '5,000 Bonus Reward Points on spends of ₹ 3 lakh every calendar quarter',
    ],
    Silver: [
      'Silver card',
      'Access to select Airport Lounges twice a year',
      '1X Reward Points on all Dining',
      '2,000 Bonus Reward Points on spends of ₹ 2 lakh every calendar quarter',
    ],
  };
 
  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
    setError('');
  };
 
  const handleSubmit = () => {
    if (selectedCard) {
      setData({ ...data, selectedCard });
      navigate('/apply/upload-kyc');
    } else {
      setError('Please select a card to proceed.');
    }
  };
 
  const handleBack = () => {
    navigate('/apply/employment-details');
  };
 
  return (
    <>
      <div className="additional-add2-card-container">
        <h2>Choose the Right Credit Card for Your Lifestyle</h2>
        <p>
          Credit Cards serve as a convenient financial tool, providing you with
          the ease of managing your expenses seamlessly.
        </p>
        {error && <p className="error-text">{error}</p>}
        <div className="choose-add-cards">
          <div className="choose-add-card-option">
            <input
              type="radio"
              id="Platinum-card"
              name="card-type"
              value="Platinum"
              checked={selectedCard === 'Platinum'}
              onChange={handleCardChange}
            />
            <label htmlFor="Platinum-card" className="choose-add-card-label">
              <CreditCard2
                cardType="Platinum"
                cardName="Platinum"
                customerName="John Doe"
                expiryDate="04/25"
                cardNumber="1234 4567 7890 1234"
                className="credit-card2"
              />
              <ShowCardDetails2
                className={`card-details2 ${selectedCard === 'Platinum' ? 'expanded' : ''}`}
                cardName="Platinum"
                features={cardFeatures.Platinum}
              />
            </label>
          </div>
          <div className="choose-add-card-option">
            <input
              type="radio"
              id="Gold-card"
              name="card-type"
              value="Gold"
              checked={selectedCard === 'Gold'}
              onChange={handleCardChange}
            />
            <label htmlFor="Gold-card" className="choose-add-card-label">
              <CreditCard2
                cardType="Gold"
                cardName="Gold"
                customerName="John Doe"
                expiryDate="04/25"
                cardNumber="1234 4567 7890 1234"
                className="credit-card2"
              />
              <ShowCardDetails2
                className={`card-details2 ${selectedCard === 'Gold' ? 'expanded' : ''}`}
                cardName="Gold"
                features={cardFeatures.Gold}
              />
            </label>
          </div>
          <div className="choose-add-card-option">
            <input
              type="radio"
              id="Silver-card"
              name="card-type"
              value="Silver"
              checked={selectedCard === 'Silver'}
              onChange={handleCardChange}
            />
            <label htmlFor="Silver-card" className="choose-add-card-label">
              <CreditCard2
                cardType="Silver"
                cardName="Silver"
                customerName="John Doe"
                expiryDate="04/25"
                cardNumber="1234 4567 7890 1234"
                className="credit-card2"
              />
              <ShowCardDetails2
                className={`card-details2 ${selectedCard === 'Silver' ? 'expanded' : ''}`}
                cardName="Silver"
                features={cardFeatures.Silver}
              />
            </label>
          </div>
        </div>
        <div className="choose-add-action-buttons">
          <button className="choose-add-button" onClick={handleBack}>
            Back
          </button>
          <button className="choose-add-button" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};
 
export default ChooseyourCard;