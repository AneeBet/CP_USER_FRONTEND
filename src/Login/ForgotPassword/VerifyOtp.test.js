import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import VerifyOtp from './VerifyOtp';
import { UserProvider } from '../Context/UserContext';
 
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
 
describe('VerifyOtp', () => {
  const mockNavigate = jest.fn();
  const mockEmail = 'test@example.com';
  const mockOtp = '123456';
 
  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });
 
  const setup = (context) => {
    require('react-router-dom').useLocation.mockReturnValue({
      state: { email: mockEmail, context },
    });
 
    return render(
      <UserProvider>
        <BrowserRouter>
          <VerifyOtp />
        </BrowserRouter>
      </UserProvider>
    );
  };
 
  test('renders the Verify OTP form', () => {
    const { getByPlaceholderText, getByRole } = setup('signup');
    expect(getByPlaceholderText('Enter OTP')).toBeInTheDocument();
    expect(getByRole('button', { name: /Verify OTP/i })).toBeInTheDocument();
  });
 
  test('handles successful OTP verification for signup', async () => {
    axios.post.mockResolvedValue({ status: 200 });
 
    const { getByPlaceholderText, getByRole } = setup('signup');
    fireEvent.change(getByPlaceholderText('Enter OTP'), { target: { value: mockOtp } });
    fireEvent.click(getByRole('button', { name: /Verify OTP/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3551/guest/verify-signup-otp', { email: mockEmail, otp: mockOtp });
      expect(mockNavigate).toHaveBeenCalledWith('/apply');
    });
  });
 
  test('handles successful OTP verification for password-reset-guest', async () => {
    axios.post.mockResolvedValue({ status: 200 });
 
    const { getByPlaceholderText, getByRole } = setup('password-reset-guest');
    fireEvent.change(getByPlaceholderText('Enter OTP'), { target: { value: mockOtp } });
    fireEvent.click(getByRole('button', { name: /Verify OTP/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3551/guest/verify-password-reset-otp', { email: mockEmail, otp: mockOtp });
      expect(mockNavigate).toHaveBeenCalledWith('/reset-password', { state: { email: mockEmail, otp: mockOtp, userType: 'guest' } });
    });
  });
 
  test('handles successful OTP verification for password-reset-customer', async () => {
    axios.post.mockResolvedValue({ status: 200 });
 
    const { getByPlaceholderText, getByRole } = setup('password-reset-customer');
    fireEvent.change(getByPlaceholderText('Enter OTP'), { target: { value: mockOtp } });
    fireEvent.click(getByRole('button', { name: /Verify OTP/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/verify-password-reset-otp', { email: mockEmail, otp: mockOtp });
      expect(mockNavigate).toHaveBeenCalledWith('/reset-password', { state: { email: mockEmail, otp: mockOtp, userType: 'customer' } });
    });
  });
 
  test('handles OTP verification failure', async () => {
    axios.post.mockRejectedValue(new Error('Invalid OTP or OTP expired'));
 
    const { getByPlaceholderText, getByRole, findByText } = setup('signup');
    fireEvent.change(getByPlaceholderText('Enter OTP'), { target: { value: mockOtp } });
    fireEvent.click(getByRole('button', { name: /Verify OTP/i }));
 
    expect(await findByText('Invalid OTP or OTP expired')).toBeInTheDocument();
  });
});
 