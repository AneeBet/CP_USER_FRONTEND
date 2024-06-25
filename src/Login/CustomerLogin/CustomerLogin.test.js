 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import CustomerLogin from './CustomerLogin';
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
describe('CustomerLogin', () => {
  let axiosMock;
  const mockNavigate = jest.fn();
  const setUserLogged = jest.fn();
  const setUserType = jest.fn();
  const setCustomerId = jest.fn();
 
  beforeAll(() => {
    axiosMock = new AxiosMockAdapter(axios);
  });
 
  beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
    jest.spyOn(require('../Context/UserContext'), 'useUser').mockReturnValue({
      setUserLogged,
      setUserType,
      setCustomerId,
    });
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });
 
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CustomerLogin />
      </BrowserRouter>
    );
  };
 
  test('renders the login form', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Customer ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });
 
  test('handles successful login', async () => {
    axiosMock.onPost('http://localhost:3552/customer/login').reply(200, {});
 
    renderComponent();
 
    fireEvent.change(screen.getByPlaceholderText('Customer ID'), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));
 
    await waitFor(() => {
      expect(setUserType).toHaveBeenCalledWith('customer');
      expect(setCustomerId).toHaveBeenCalledWith('12345');
      expect(setUserLogged).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
 
  test('handles login with required password change', async () => {
    axiosMock.onPost('http://localhost:3552/customer/login').reply(200, "First login, change password required");
 
    renderComponent();
 
    fireEvent.change(screen.getByPlaceholderText('Customer ID'), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));
 
    await waitFor(() => {
      expect(setUserType).toHaveBeenCalledWith('customer');
      expect(setCustomerId).toHaveBeenCalledWith('12345');
      expect(mockNavigate).toHaveBeenCalledWith('/reset-first-password');
    });
  });
 
  test('handles login failure', async () => {
    axiosMock.onPost('http://localhost:3552/customer/login').reply(401);
 
    renderComponent();
 
    fireEvent.change(screen.getByPlaceholderText('Customer ID'), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));
 
    await waitFor(() => {
      expect(screen.getByText(/Invalid customer ID or password/i)).toBeInTheDocument();
    });
  });
 
  test('displays error when customer ID and password are not provided', async () => {
    renderComponent();
 
    fireEvent.click(screen.getByTestId('login-button'));
 
    await waitFor(() => {
      expect(screen.getByText(/Customer ID and password are required/i)).toBeInTheDocument();
    });
  });
 
  test('clears error message on input field change', async () => {
    renderComponent();
 
    fireEvent.click(screen.getByTestId('login-button'));
 
    await waitFor(() => {
      expect(screen.getByText(/Customer ID and password are required/i)).toBeInTheDocument();
    });
 
    fireEvent.change(screen.getByPlaceholderText('Customer ID'), { target: { value: '12345' } });
    expect(screen.queryByText(/Customer ID and password are required/i)).toBeNull();
 
    fireEvent.click(screen.getByTestId('login-button'));
 
    await waitFor(() => {
      expect(screen.getByText(/Customer ID and password are required/i)).toBeInTheDocument();
    });
 
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    expect(screen.queryByText(/Customer ID and password are required/i)).toBeNull();
  });
 
  test('navigates to forgot password page', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('forgot-password-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/customer-forgot-password');
  });
 
  test('navigates to guest login page', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('guest-login-button'));
    expect(setUserType).toHaveBeenCalledWith('guest');
    expect(mockNavigate).toHaveBeenCalledWith('/guest-login');
  });
});
 