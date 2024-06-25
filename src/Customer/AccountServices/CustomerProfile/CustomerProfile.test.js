import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomerProfile from './CustomerProfile';
import { useUser } from '../../../Login/Context/UserContext';
 
jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
jest.mock('axios');
 
describe('CustomerProfile Component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ customerId: 'test-customer-id' });
    console.error = jest.fn(); // Mock console.error to suppress error messages in the test output
  });
 
  const userProfile = {
    name: 'John Doe',
    customerId: 12345,
    email: 'john.doe@example.com',
    aadhaarNumber: 123456789012,
    dob: '1990-01-01T00:00:00.000Z',
    mobileNumber: '1234567890',
    address: '123 Main St, Springfield',
  };
 
  test('fetches and displays user profile data on component mount', async () => {
    axios.get.mockResolvedValueOnce({ data: userProfile });
 
    const { getByText } = render(<CustomerProfile />);
 
    await waitFor(() => {
      expect(getByText('User Profile')).toBeInTheDocument();
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('12345')).toBeInTheDocument();
      expect(getByText('john.doe@example.com')).toBeInTheDocument();
      expect(getByText('123456789012')).toBeInTheDocument();
      expect(getByText('1/1/1990')).toBeInTheDocument();
      expect(getByText('1234567890')).toBeInTheDocument();
      expect(getByText('123 Main St, Springfield')).toBeInTheDocument();
    });
  });
 
  test('handles fetch user profile error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching user profile'));
 
    render(<CustomerProfile />);
 
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error fetching user profile'));
    });
  });
});
 
