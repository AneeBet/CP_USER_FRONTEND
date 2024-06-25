import React from 'react';
import { render, screen } from '@testing-library/react';
import CardSelection from './CardSelection';
import CreditCard2 from '../../../Design/CreditCard2';
 
jest.mock('../../../Design/CreditCard2', () => {
  return jest.fn(({ name, imageUrl, benefits }) => (
    <div data-testid="credit-card2">
      <h3>{name}</h3>
      <img src={imageUrl} alt={name} />
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  ));
});
 
describe('CardSelection', () => {
  const mockCardData = [
    {
      name: 'Card 1',
      imageUrl: 'https://example.com/card1.jpg',
      benefits: ['Benefit 1', 'Benefit 2'],
    },
    {
      name: 'Card 2',
      imageUrl: 'https://example.com/card2.jpg',
      benefits: ['Benefit 3', 'Benefit 4'],
    },
  ];
 
  test('renders without crashing', () => {
    render(<CardSelection cardData={mockCardData} />);
    expect(screen.getByText('Choose the Right Credit Card for Your Lifestyle')).toBeInTheDocument();
  });
 
  test('displays the correct number of credit cards', () => {
    render(<CardSelection cardData={mockCardData} />);
    expect(screen.getAllByTestId('credit-card2')).toHaveLength(mockCardData.length);
  });
 
  test('passes the correct props to CreditCard2 component', () => {
    render(<CardSelection cardData={mockCardData} />);
 
    mockCardData.forEach((card, index) => {
      expect(CreditCard2).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({
          name: card.name,
          imageUrl: card.imageUrl,
          benefits: card.benefits,
        }),
        {}
      );
    });
  });
 
  test('renders the apply button', () => {
    render(<CardSelection cardData={mockCardData} />);
    expect(screen.getByTestId('apply-button')).toBeInTheDocument();
  });
 
  test('renders the card benefits', () => {
    render(<CardSelection cardData={mockCardData} />);
   
    mockCardData.forEach(card => {
      card.benefits.forEach(benefit => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    });
  });
});
 
