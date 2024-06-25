import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Apply from './Apply';
import CreditCard2 from '../../../Design/CreditCard2';
 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 

jest.mock('../../../Design/CreditCard2', () => () => <div data-testid="credit-card">Credit Card Mock</div>);
 
describe('Apply Component', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });
 
  test('renders Apply component correctly', () => {
    render(
      <MemoryRouter initialEntries={['/apply']}>
        <Routes>
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </MemoryRouter>
    );
 
    expect(screen.getByText('Get Your Perfect Credit Card')).toBeInTheDocument();
    expect(screen.getByText('Discover the best credit card for you. Enjoy great rewards, low interest rates, and exclusive benefits. Apply now and take control of your financial future!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply Now' })).toBeInTheDocument();
    expect(screen.getByTestId('credit-card')).toBeInTheDocument();
  });
 
  test('navigates to personal details page on button click', () => {
    render(
      <MemoryRouter initialEntries={['/apply']}>
        <Routes>
          <Route path="/apply" element={<Apply />} />
        </Routes>
      </MemoryRouter>
    );
 
    fireEvent.click(screen.getByRole('button', { name: 'Apply Now' }));
    expect(mockNavigate).toHaveBeenCalledWith('/apply/personal-details');
  });
});