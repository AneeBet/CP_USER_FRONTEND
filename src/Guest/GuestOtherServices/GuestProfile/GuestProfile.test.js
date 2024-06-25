import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import GuestProfile from './GuestProfile';
 

jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: () => ({ email: 'test@example.com' }),
}));
 
jest.mock('axios');
 
describe('GuestProfile Component', () => {
  test('renders the user profile', async () => {
    const userData = {
      name: 'John Doe',
      guestEmail: 'john.doe@example.com',
      mobileNumber: '1234567890',
    };
 
    axios.get.mockResolvedValueOnce({ data: userData });
 
    const { getByTestId } = render(<GuestProfile />);
 
    await waitFor(() => {
      expect(getByTestId('username')).toHaveTextContent('Customer Name: John Doe');
      expect(getByTestId('useremail')).toHaveTextContent('Email: john.doe@example.com');
      expect(getByTestId('usernumber')).toHaveTextContent('Mobile Number: 1234567890');
    });
  });
 
  test('displays an error message when fetching user data fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch user data'));
 
    const { getByText } = render(<GuestProfile />);
 
    await waitFor(() => {
      expect(getByText('Error loading profile data.')).toBeInTheDocument();
    });
  });
});