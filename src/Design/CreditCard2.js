import React from 'react';
import PropTypes from 'prop-types';
import './CreditCard2.css';

function CreditCard2({ cardType, cardName, customerName, expiryDate, cardNumber }) {
  return (
    
      <div className={`credit-card credit-card--${cardType}`}>
        <div className="credit-card__header">
          <p className="credit-card__title">{cardName}</p>
          <div className="credit-card__logos">
            <div className="credit-card__logo credit-card__logo--1"></div>
            <div className="credit-card__logo credit-card__logo--2"></div>
          </div>
        </div>
        <div className="credit-card__info">
          <div className="credit-card__holder">
            <p className="credit-card__holder-title">Card Holder</p>
            <p className="credit-card__holder-name">{customerName}</p>
          </div>
          <div className="credit-card__expiry">
            <p className="credit-card__expiry-title">Expiry</p>
            <p className="credit-card__expiry-date">{expiryDate}</p>
          </div>
        </div>
        <div className="credit-card__number">{cardNumber}</div>
      </div>
    
  );
}

CreditCard2.propTypes = {
  cardType: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
};

export default CreditCard2;
