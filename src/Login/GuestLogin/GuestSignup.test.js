import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import GuestSignup from './GuestSignup';
import { UserProvider } from '../Context/UserContext';
 
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
 
describe('GuestSignup', () => {
  const mockNavigate = jest.fn();
  const setName = jest.fn();
  const setEmail = jest.fn();
  const setUserType = jest.fn();
 
  beforeEach(() => {
    jest.clearAllMocks();
    const mockUseNavigate = require('react-router-dom').useNavigate;
    mockUseNavigate.mockReturnValue(mockNavigate);
  });
 
  const setup = () => render(
    <UserProvider value={{ setName, setEmail, setUserType }}>
      <BrowserRouter>
        <GuestSignup />
      </BrowserRouter>
    </UserProvider>
  );
 
  test('renders the signup form', () => {
    setup();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signup as Guest/i })).toBeInTheDocument();
  });
 
  test('displays error when fields are empty', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Signup as Guest/i }));
    expect(await screen.findByText('All fields are required')).toBeInTheDocument();
  });
 
  test('displays error when email format is invalid', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Signup as Guest/i }));
    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });
 
  test('displays error when password format is invalid', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /Signup as Guest/i }));
    expect(await screen.findByText('Password must be at least 8 characters long and include at least one letter and one number')).toBeInTheDocument();
  });
 
  test('displays error message on signup failure', async () => {
    axios.post.mockRejectedValue({ response: { status: 400, data: 'Email already in use' } });
 
    setup();
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Signup as Guest/i }));
 
    expect(await screen.findByText('Email already in use')).toBeInTheDocument();
  });
 
  test('handles successful signup', async () => {
    axios.post.mockResolvedValue({});
 
    setup();
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Signup as Guest/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3551/guest/signup', {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
    });
 
 
  });
});