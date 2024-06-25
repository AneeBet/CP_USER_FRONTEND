import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider, AppContext } from '../../Context/AppContext';
import ChooseYourCard from './ChooseYourCard';
 

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
describe('ChooseYourCard Component', () => {
  let mockSetData;
 
  beforeEach(() => {
    mockSetData = jest.fn();
    jest.clearAllMocks();
  });
 
  const renderComponent = (contextValue) =>
    render(
      <AppProvider>
        <AppContext.Provider value={contextValue}>
          <MemoryRouter>
            <ChooseYourCard />
          </MemoryRouter>
        </AppContext.Provider>
      </AppProvider>
    );
 
  test('renders component correctly with cards and features', () => {
    renderComponent({ data: { selectedCard: '' }, setData: mockSetData });
 
    expect(screen.getByText('Choose the Right Credit Card for Your Lifestyle')).toBeInTheDocument();
    expect(screen.getByText('Platinum')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
  });
 
  test('selects a card and handles Next button click', () => {
    renderComponent({ data: { selectedCard: '' }, setData: mockSetData });
 
    fireEvent.click(screen.getByLabelText('Platinum'));
    fireEvent.click(screen.getByText('Next'));
 
    expect(mockSetData).toHaveBeenCalledWith(expect.objectContaining({ selectedCard: 'Platinum' }));
    expect(mockNavigate).toHaveBeenCalledWith('/apply/upload-kyc');
  });
 
  test('handles Back button click', () => {
    renderComponent({ data: { selectedCard: '' }, setData: mockSetData });
 
    fireEvent.click(screen.getByText('Back'));
 
    expect(mockNavigate).toHaveBeenCalledWith('/apply/employment-details');
  });
 
  test('handles case where no card is selected', () => {
    renderComponent({ data: { selectedCard: '' }, setData: mockSetData });
 
    fireEvent.click(screen.getByText('Next'));
 
   
    expect(mockSetData).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
 