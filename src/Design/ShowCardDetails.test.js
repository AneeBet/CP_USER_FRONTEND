import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowCardDetails2 from './ShowCardDetails';
 
describe('ShowCardDetails2', () => {
  const props = {
    cardName: 'Platinum',
    features: [
      'Metal card',
      'Unlimited Airport Lounge Access',
      '2X Reward Points on Weekend Dining',
      '10,000 Bonus Reward Points on spends of ₹ 4 lakh every calendar quarter',
    ],
  };
 
  test('renders the card name and features correctly', () => {
    render(<ShowCardDetails2 {...props} />);
 
    expect(screen.getByText(`${props.cardName} Card`)).toBeInTheDocument();
    props.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });
 
  test('renders the correct number of features', () => {
    render(<ShowCardDetails2 {...props} />);
   
    const featureItems = screen.getAllByRole('listitem');
    expect(featureItems.length).toBe(props.features.length + 1); 
  });
});
 
