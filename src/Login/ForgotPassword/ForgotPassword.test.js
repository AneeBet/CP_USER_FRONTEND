 
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import { useUser } from '../Context/UserContext';
 
jest.mock('axios');
jest.mock('../Context/UserContext');
 
const mockNavigate = jest.fn();
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
describe('ForgotPassword', () => {
  let setEmail;
 
  beforeEach(() => {
    jest.clearAllMocks();
    setEmail = jest.fn();
  });
 
  const setup = (userType) => {
    useUser.mockReturnValue({
      userType,
      setEmail,
    });
 
    return render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
  };
 
  test('renders the forgot password form', () => {
    const { getByPlaceholderText, getByRole } = setup('guest');
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByRole('button', { name: /Send OTP/i })).toBeInTheDocument();
  });
 
  test('displays error message on OTP sending failure', async () => {
    axios.post.mockRejectedValue(new Error('Error sending OTP'));
 
    const { getByPlaceholderText, getByRole, findByText } = setup('guest');
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByRole('button', { name: /Send OTP/i }));
 
    expect(await findByText('Error sending OTP')).toBeInTheDocument();
  });
 
  test('handles successful OTP sending for guest', async () => {
    axios.post.mockResolvedValue({ data: true });
    const mockEmailInput = 'guest@example.com';
 
    const { getByPlaceholderText, getByRole } = setup('guest');
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: mockEmailInput } });
    fireEvent.click(getByRole('button', { name: /Send OTP/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3551/guest/forgot-password', { email: mockEmailInput });
    });
 
    expect(mockNavigate).toHaveBeenCalledWith('/verify-otp', { state: { email: mockEmailInput, context: 'password-reset-guest' } });
    expect(setEmail).toHaveBeenCalledWith(mockEmailInput);
  });
 
  test('handles successful OTP sending for customer', async () => {
    axios.post.mockResolvedValue({ data: true });
    const mockEmailInput = 'customer@example.com';
 
    const { getByPlaceholderText, getByRole } = setup('customer');
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: mockEmailInput } });
    fireEvent.click(getByRole('button', { name: /Send OTP/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/forgot-password', { email: mockEmailInput });
    });
 
    expect(mockNavigate).toHaveBeenCalledWith('/verify-otp', { state: { email: mockEmailInput, context: 'password-reset-customer' } });
    expect(setEmail).toHaveBeenCalledWith(mockEmailInput);
  });
});