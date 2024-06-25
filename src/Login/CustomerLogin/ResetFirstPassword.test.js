import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ResetFirstPassword from './ResetFirstPassword';
import { useUser } from '../Context/UserContext';
 
jest.mock('axios');
jest.mock('../Context/UserContext');
 
const mockNavigate = jest.fn();
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams({ customerId: '123' })],
}));
 
describe('ResetFirstPassword', () => {
  const mockSetCustomerId = jest.fn();
  const mockCustomerId = '123';
 
  beforeEach(() => {
    useUser.mockReturnValue({
      customerId: mockCustomerId,
      setCustomerId: mockSetCustomerId,
      setUserLogged: jest.fn(),
      userType: '',
      setUserType: jest.fn(),
      guestName: '',
      setName: jest.fn(),
      email: '',
      setEmail: jest.fn(),
      UserLogged: false,
      ActiveAccounts: [],
      setActiveAccounts: jest.fn(),
    });
    jest.clearAllMocks();
  });
 
  const setup = () => render(
    <BrowserRouter>
      <ResetFirstPassword />
    </BrowserRouter>
  );
 
  test('renders the reset password form', () => {
    const { getByLabelText, getByRole } = setup();
    expect(getByLabelText("New Password:")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password:")).toBeInTheDocument();
    expect(getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
  });
 
  test('displays error when passwords do not match', async () => {
    const { getByLabelText, getByRole, findByText } = setup();
    fireEvent.change(getByLabelText("New Password:"), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText("Confirm Password:"), { target: { value: 'different123' } });
    fireEvent.click(getByRole('button', { name: /Reset Password/i }));
 
    expect(await findByText("Passwords do not match")).toBeInTheDocument();
  });
 
  test('submits form with correct passwords', async () => {
    axios.post.mockResolvedValue({ data: 'Password reset successful!' });
 
    const { getByLabelText, getByRole } = setup();
    fireEvent.change(getByLabelText("New Password:"), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText("Confirm Password:"), { target: { value: 'password123' } });
    fireEvent.click(getByRole('button', { name: /Reset Password/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/update-password', {
        customerId: '123',
        password: 'password123'
      });
      expect(mockSetCustomerId).toHaveBeenCalledWith('123');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
 
