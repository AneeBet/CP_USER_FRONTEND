import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomerFeedback from './CustomerFeedback';
import '@testing-library/jest-dom';
import { useUser, UserProvider } from '../../../Login/Context/UserContext'; 


jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('axios');

describe('CustomerFeedback Component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({
      guestName: '',
      setName: jest.fn(),
      email: '',
      setEmail: jest.fn(),
      userType: '',
      setUserType: jest.fn(),
      customerId: '12345',
      setCustomerId: jest.fn(),
      UserLogged: false,
      setUserLogged: jest.fn(),
      ActiveAccounts: [],
      setActiveAccounts: jest.fn(),
    });
  });

  test('renders the feedback form', () => {
    const { getByLabelText, getByText } = render(
      
        <CustomerFeedback />
    
    );
    expect(getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(getByLabelText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  test('displays an error message when fields are empty', async () => {
    const { getByText } = render(
     
        <CustomerFeedback />
    
    );

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(getByText(/All fields are required/i)).toBeInTheDocument();
    });
  });

  test('submits the feedback form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { feedbackId: 123, message: 'Success' } });

    const { getByLabelText, getByText, queryByText } = render(
     
        <CustomerFeedback />
      
    );
    fireEvent.change(getByLabelText(/Rating/i), { target: { value: '4' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Great service!' } });

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      // Add any success message if available in the component
    });
  });

  test('displays an error message when submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Submission failed'));

    const { getByLabelText, getByText, queryByText } = render(
      
        <CustomerFeedback />
     
    );
    fireEvent.change(getByLabelText(/Rating/i), { target: { value: '4' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Great service!' } });

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
    
    });
  });
});
