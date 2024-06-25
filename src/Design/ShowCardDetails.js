import React from 'react';
import PropTypes from 'prop-types';
import './ShowCardDetails.css';

function ShowCardDetails2({ cardName, features }) {
  return (
    <div>
        
      
      <ul className="credit-card-details__list">
      <li className="credit-card-details__title">{cardName} Card</li>
        {features.map((feature, index) => (  
          <li key={index} className="credit-card-details__item">{feature}</li>
        ))}
      </ul>
    </div>
  );
}

ShowCardDetails2.propTypes = {
  cardName: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShowCardDetails2;
