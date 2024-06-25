 
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import { UserProvider } from '../Context/UserContext';
 
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
 
describe('ResetPassword', () => {
  const mockNavigate = jest.fn();
  const mockEmail = 'test@example.com';
  const mockOtp = '123456';
  const mockUserType = 'guest';
 
  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    require('react-router-dom').useLocation.mockReturnValue({
      state: { email: mockEmail, otp: mockOtp, userType: mockUserType },
    });
  });
 
  const setup = () => render(
    <UserProvider>
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    </UserProvider>
  );
 
  test('renders the reset password form', () => {
    const { getByPlaceholderText, getByRole } = setup();
    expect(getByPlaceholderText('New Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm New Password')).toBeInTheDocument();
    expect(getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
  });
 
  test('displays error when passwords do not match', async () => {
    const { getByPlaceholderText, getByRole, findByText } = setup();
    fireEvent.change(getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm New Password'), { target: { value: 'different123' } });
    fireEvent.click(getByRole('button', { name: /Reset Password/i }));
 
    expect(await findByText('Passwords do not match')).toBeInTheDocument();
  });
 
  test('handles successful password reset', async () => {
    axios.post.mockResolvedValue({});
    window.alert = jest.fn(); 
 
    const { getByPlaceholderText, getByRole } = setup();
    fireEvent.change(getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm New Password'), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /Reset Password/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3551/guest/reset-password', {
        email: mockEmail,
        otp: mockOtp,
        password: 'password123',
      });
      expect(window.alert).toHaveBeenCalledWith('Password change successful! Login again');
      expect(mockNavigate).toHaveBeenCalledWith('/guest-login');
    });
  });
 
  test('handles error during password reset', async () => {
    axios.post.mockRejectedValue(new Error('Error resetting password'));
    const { getByPlaceholderText, getByRole, findByText } = setup();
    fireEvent.change(getByPlaceholderText('New Password'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('Confirm New Password'), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /Reset Password/i }));
 
    expect(await findByText('Error resetting password')).toBeInTheDocument();
  });
 
  test('displays error when passwords are not provided', async () => {
    const { getByRole, findByText } = setup();
    fireEvent.click(getByRole('button', { name: /Reset Password/i }));
 
    expect(await findByText('Both password fields are required')).toBeInTheDocument();
  });
});