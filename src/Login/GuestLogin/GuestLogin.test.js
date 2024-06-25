import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import GuestLogin from './GuestLogin';
import { useUser } from '../Context/UserContext';
 
jest.mock('../Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: ({ children }) => children,
}));
 
describe('GuestLogin', () => {
  let axiosMock;
  const mockNavigate = jest.fn();
  const setUserType = jest.fn();
  const setEmail = jest.fn();
 
  beforeAll(() => {
    axiosMock = new AxiosMockAdapter(axios);
  });
 
  beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
    useUser.mockReturnValue({
      setUserType,
      setEmail,
    });
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });
 
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <GuestLogin />
      </BrowserRouter>
    );
  };
 
  test('renders the login form', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login as Guest/i })).toBeInTheDocument();
  });
 
  test('handles successful login', async () => {
    axiosMock.onPost('http://localhost:3551/guest/login').reply(200, {});
 
    renderComponent();
 
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'guest@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Login as Guest/i }));
 
    await waitFor(() => expect(setUserType).toHaveBeenCalledWith('guest'));
    expect(setEmail).toHaveBeenCalledWith('guest@example.com');
    expect(mockNavigate).toHaveBeenCalledWith('/guest-track-application');
  });
 
  test('handles login failure', async () => {
    axiosMock.onPost('http://localhost:3551/guest/login').reply(401);
 
    renderComponent();
 
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'guest@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Login as Guest/i }));
 
    await waitFor(() => expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument());
  });
 
  test('displays error when email and password are not provided', async () => {
    renderComponent();
 
    fireEvent.click(screen.getByRole('button', { name: /Login as Guest/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Email and password are required/i)).toBeInTheDocument();
    });
  });
 
  test('clears error message on input field change', async () => {
    renderComponent();
 
    fireEvent.click(screen.getByRole('button', { name: /Login as Guest/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Email and password are required/i)).toBeInTheDocument();
    });
 
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'guest@example.com' } });
    expect(screen.queryByText(/Email and password are required/i)).toBeNull();
 
    fireEvent.click(screen.getByRole('button', { name: /Login as Guest/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Email and password are required/i)).toBeInTheDocument();
    });
 
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password' } });
    expect(screen.queryByText(/Email and password are required/i)).toBeNull();
  });
 
  test('navigates to forgot password page', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Forgot Password/i));
    expect(mockNavigate).toHaveBeenCalledWith('/guest-forgot-password');
  });
 
  test('navigates to customer login page', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Login as Customer/i));
    expect(setUserType).toHaveBeenCalledWith('customer');
    expect(mockNavigate).toHaveBeenCalledWith('/customer-login');
  });
 
});