import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import DuePayments from './DuePayments';
import { useUser } from '../../../Login/Context/UserContext';
 
// Mock dependencies
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext');
 
const mockUser = { customerId: '123' };
const mockActiveAccounts = ['acc1', 'acc2'];
const mockDueInfo = {
  data: {
    dueDate: '2021-09-15T00:00:00.000Z',
    dueAmount: 3000,
  },
};
 
describe('DuePayments', () => {
  beforeEach(() => {
    // Mock useUser implementation
    useUser.mockReturnValue(mockUser);
 
    // Mock axios get response
    axios.get.mockResolvedValue({ data: mockActiveAccounts });
 
    // Mock axios post response
    axios.post.mockResolvedValue(mockDueInfo);
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders without crashing', async () => {
    const { getByText, getByRole } = render(<DuePayments />);
   
    await waitFor(() => {
      expect(getByRole('combobox')).toBeInTheDocument();
    });
 
    expect(getByText('DUE PAYMENT')).toBeInTheDocument();
  });
 
  test('loads and displays active accounts', async () => {
    const { getByRole } = render(<DuePayments />);
   
    await waitFor(() => {
      expect(getByRole('combobox')).toBeInTheDocument();
    });
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByRole('option', { name: 'acc1' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'acc2' })).toBeInTheDocument();
    });
  });
 
  test('displays due info when an account is selected', async () => {
    const { getByText, getByRole } = render(<DuePayments />);
   
    await waitFor(() => {
      expect(getByRole('combobox')).toBeInTheDocument();
    });
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByText('September 15, 2021')).toBeInTheDocument();
      expect(getByText('Rs. 3000')).toBeInTheDocument();
      expect(getByText(/LIMIT EXCEEDED!!/i)).toBeInTheDocument();
    });
  });
 
  test('shows error message when no account is selected and pay now is clicked', () => {
    const { getByText, getByRole } = render(<DuePayments />);
   
    const payNowButton = getByRole('button', { name: /Pay Now/i });
    fireEvent.click(payNowButton);
 
    expect(getByText('Please select an account.')).toBeInTheDocument();
  });
 
  test('handles payment process successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Payment successful!' } });
 
    const { getByText, getByRole } = render(<DuePayments />);
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
   
    await waitFor(() => {
      expect(getByText('September 15, 2021')).toBeInTheDocument();
    });
 
    const payNowButton = getByRole('button', { name: /Pay Now/i });
    fireEvent.click(payNowButton);
 
    await waitFor(() => {
      const confirmButton = getByRole('button', { name: /confirm/i });
      fireEvent.click(confirmButton);
 
      expect(getByText('Payment successful!')).toBeInTheDocument();
    });
  });
 
  test('handles payment failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Payment failed'));
 
    const { getByText, getByRole } = render(<DuePayments />);
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByText('September 15, 2021')).toBeInTheDocument();
    });
 
    const payNowButton = getByRole('button', { name: /Pay Now/i });
    fireEvent.click(payNowButton);
 
    await waitFor(() => {
      const confirmButton = getByRole('button', { name: /confirm/i });
      fireEvent.click(confirmButton);
 
      expect(getByText('Payment failed. Please try again.')).toBeInTheDocument();
    });
  });
});