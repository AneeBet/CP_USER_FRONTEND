// __tests__/LandingPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import { FaCreditCard, FaRegGem, FaPlane } from 'react-icons/fa';
import CreditCard2 from '../../Design/CreditCard2';
import ShowCardDetails2 from '../../Design/ShowCardDetails';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LandingPage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<LandingPage />);
  });

  test('displays the correct brand name', () => {
    render(<LandingPage />);
    expect(screen.getByText('CREDIT PULSE')).toBeInTheDocument();
  });

  test('displays the welcome section', () => {
    render(<LandingPage />);
    expect(screen.getByText('WELCOME TO CREDIT PULSE')).toBeInTheDocument();
    expect(screen.getByText('Your Trusted Credit Solution')).toBeInTheDocument();
  });

  test('displays the introduction section', () => {
    render(<LandingPage />);
    expect(screen.getByText(/At Credit Pulse, we offer a range of premium credit cards/i)).toBeInTheDocument();
  });

  test('displays the icons with correct labels', () => {
    render(<LandingPage />);
    expect(screen.getByText('Premium Cards')).toBeInTheDocument();
    expect(screen.getByText('Exclusive Rewards')).toBeInTheDocument();
    expect(screen.getByText('Travel Benefits')).toBeInTheDocument();
  });

  test('displays the correct cards', () => {
    render(<LandingPage />);
    expect(screen.getByText('Platinum')).toBeInTheDocument();
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
  });

  test('navigates to customer login on Login button click', () => {
    render(<LandingPage />);
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('/customer-login');
  });

  test('navigates to guest login on Guest button click', () => {
    render(<LandingPage />);
    const guestButton = screen.getByText('Guest');
    fireEvent.click(guestButton);
    expect(mockNavigate).toHaveBeenCalledWith('/guest-login');
  });
});
