import React from 'react';
import { render, screen } from '@testing-library/react';
import CreditCard2 from './CreditCard2';
 
describe('CreditCard2', () => {
  const props = {
    cardType: 'Platinum',
    cardName: 'Platinum Card',
    customerName: 'John Doe',
    expiryDate: '04/25',
    cardNumber: '1234 4567 7890 1234',
  };
 
  test('renders correctly with given props', () => {
    render(<CreditCard2 {...props} />);
 
    expect(screen.getByText(props.cardName)).toBeInTheDocument();
    expect(screen.getByText(props.customerName)).toBeInTheDocument();
    expect(screen.getByText(props.expiryDate)).toBeInTheDocument();
    expect(screen.getByText(props.cardNumber)).toBeInTheDocument();
    expect(screen.getByText('Card Holder')).toBeInTheDocument();
    expect(screen.getByText('Expiry')).toBeInTheDocument();
  });
 
  test('applies the correct card type class', () => {
    render(<CreditCard2 {...props} />);
 
    const cardElement = screen.getByText(props.cardName).closest('.credit-card');
    expect(cardElement).toHaveClass(`credit-card--${props.cardType}`);
  });
});
 
