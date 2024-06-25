import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomerScheduleCall from './CustomerScheduleCall';
import '@testing-library/jest-dom';
import { useUser, UserProvider } from '../../../Login/Context/UserContext'; 


jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('axios');

describe('CustomerScheduleCall Component', () => {
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

  test('renders the schedule call form', () => {
    const { getByLabelText, getByText } = render(
      
        <CustomerScheduleCall />
      
    );
    expect(getByLabelText(/Select Account Number/i)).toBeInTheDocument();
    expect(getByLabelText(/Select Time Slot/i)).toBeInTheDocument();
    expect(getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(getByLabelText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  test('displays an error message when fields are empty', async () => {
    const { getByText } = render(
      
        <CustomerScheduleCall />
     
    );

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(getByText(/All fields are required/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays account numbers', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { accountNumber: '1111222233334444' },
        { accountNumber: '5555666677778888' }
      ]
    });

    const { getByLabelText, getByText } = render(
      
        <CustomerScheduleCall />
     
    );

    await waitFor(() => {
      expect(getByLabelText(/Select Account Number/i)).toBeInTheDocument();
      expect(getByText('1111222233334444')).toBeInTheDocument();
      expect(getByText('5555666677778888')).toBeInTheDocument();
    });
  });

  test('submits the schedule call form successfully', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { accountNumber: '1111222233334444' }
      ]
    });

    axios.post.mockResolvedValueOnce({ data: { scheduleCallId: 123, message: 'Success' } });

    const { getByLabelText, getByText, queryByText } = render(
     
        <CustomerScheduleCall />
    
    );

    await waitFor(() => {
      expect(getByLabelText(/Select Account Number/i)).toBeInTheDocument();
    });

    fireEvent.change(getByLabelText(/Select Account Number/i), { target: { value: '1111222233334444' } });
    fireEvent.change(getByLabelText(/Select Time Slot/i), { target: { value: 'Morning(9am-12pm)' } });
    fireEvent.change(getByLabelText(/Subject/i), { target: { value: 'Schedule a call' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'I want to schedule a call.' } });

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      expect(getByText(/Schedule call request submitted successfully!/i)).toBeInTheDocument();
    });
  });

  test('displays an error message when submission fails', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { accountNumber: '1111222233334444' }
      ]
    });

    axios.post.mockRejectedValueOnce(new Error('Submission failed'));

    const { getByLabelText, getByText, queryByText } = render(
      
        <CustomerScheduleCall />
     
    );

    await waitFor(() => {
      expect(getByLabelText(/Select Account Number/i)).toBeInTheDocument();
    });

    fireEvent.change(getByLabelText(/Select Account Number/i), { target: { value: '1111222233334444' } });
    fireEvent.change(getByLabelText(/Select Time Slot/i), { target: { value: 'Morning(9am-12pm)' } });
    fireEvent.change(getByLabelText(/Subject/i), { target: { value: 'Schedule a call' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'I want to schedule a call.' } });

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      expect(getByText(/Error submitting schedule call request/i)).toBeInTheDocument();
    });
  });

  test('shows error message when failing to fetch account numbers', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch account numbers'));

    const { getByText } = render(
      
        <CustomerScheduleCall />
     
    );

    await waitFor(() => {
      expect(getByText(/Failed to fetch account numbers/i)).toBeInTheDocument();
    });
  });
});
