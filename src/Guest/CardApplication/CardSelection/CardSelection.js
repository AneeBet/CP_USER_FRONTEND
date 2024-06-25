import React from 'react';
import PropTypes from 'prop-types';
import CreditCard2 from '../../../Design/CreditCard2';

const CardSelection = ({ cardData }) => {
  return (
    <div className="card-selection">
      <h2>Choose the Right Credit Card for Your Lifestyle</h2>
      <p>
        Credit Cards serve as a convenient financial tool, providing you with the ease of managing your expenses seamlessly.
      </p>
      <div className="cards">
        {cardData.map((card, index) => (
          <CreditCard2
            key={index}
            name={card.name}
            imageUrl={card.imageUrl}
            benefits={card.benefits}
          />
        ))}
      </div>
      <div className="apply-button-container">
        <button className="apply-button">Apply</button>
      </div>
    </div>
  );
};

CardSelection.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default CardSelection;


