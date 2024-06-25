import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import DisablePayments from './DisablePayments';
import { useUser } from '../../../Login/Context/UserContext';
 
// Mock dependencies
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext');
 
const mockUser = { customerId: '123' };
const mockActiveAccounts = ['acc1', 'acc2'];
const mockPaymentStatuses = {
  data: {
    onlinePayment: 'ENABLE',
    internationalPayment: 'DISABLE',
    cardSwipe: 'ENABLE',
  },
};
 
describe('DisablePayments', () => {
  beforeEach(() => {
    useUser.mockReturnValue(mockUser);
    axios.get.mockResolvedValue({ data: mockActiveAccounts });
    axios.post.mockResolvedValue(mockPaymentStatuses);
    axios.put.mockResolvedValue({ data: 'Success' });
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders without crashing', async () => {
    const { getByText, getByRole } = render(<DisablePayments />);
 
    await waitFor(() => {
      expect(getByText('DISABLE PAYMENT MODES')).toBeInTheDocument();
      expect(getByRole('combobox')).toBeInTheDocument();
    });
  });
 
  test('loads and displays active accounts', async () => {
    const { getByRole } = render(<DisablePayments />);
 
    await waitFor(() => {
      expect(getByRole('combobox')).toBeInTheDocument();
    });
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByRole('option', { name: 'acc1' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'acc2' })).toBeInTheDocument();
    });
  });
 
  test('fetches and displays payment statuses when an account is selected', async () => {
    const { getByRole, getByText, queryByText } = render(<DisablePayments />);
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/get-payment-statuses', {
        accountNumber: 'acc1',
      });
    });
 
    await waitFor(() => {
      expect(getByText(/online payments/i)).toBeInTheDocument();
      expect(queryByText(/current status: enable/i)).toBeInTheDocument();
      expect(getByText(/international payments/i)).toBeInTheDocument();
      expect(queryByText(/current status: disable/i)).toBeInTheDocument();
      expect(getByText(/card swipe/i)).toBeInTheDocument();
      expect(queryByText(/current status: enable/i)).toBeInTheDocument();
    });
  });
 
  test('handles enabling and disabling payment options', async () => {
    const { getByRole, getByText } = render(<DisablePayments />);
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByText(/online payments/i)).toBeInTheDocument();
    });
 
    fireEvent.click(getByText(/disable/i));
 
    await waitFor(() => {
      expect(getByText(/are you sure you want to disable/i)).toBeInTheDocument();
    });
 
    fireEvent.click(getByText('OK'));
 
    await waitFor(() => {
      expect(getByText('Payment status changed successfully')).toBeInTheDocument();
    });
 
    fireEvent.click(getByText('OK'));
 
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3552/customer/update-payment-status', {
        accountNumber: 'acc1',
        paymentType: 'onlinePayment',
        status: 'DISABLE',
      });
    });
  });
 
  test('handles error when changing payment status', async () => {
    axios.put.mockRejectedValueOnce(new Error('Error changing payment status'));
 
    const { getByRole, getByText } = render(<DisablePayments />);
 
    fireEvent.change(getByRole('combobox'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByText(/online payments/i)).toBeInTheDocument();
    });
 
    fireEvent.click(getByText(/disable/i));
 
    await waitFor(() => {
      expect(getByText(/are you sure you want to disable/i)).toBeInTheDocument();
    });
 
    fireEvent.click(getByText('OK'));
 
    await waitFor(() => {
      expect(getByText('Error changing payment status')).toBeInTheDocument();
    });
 
    fireEvent.click(getByText('OK'));
 
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3552/customer/update-payment-status', {
        accountNumber: 'acc1',
        paymentType: 'onlinePayment',
        status: 'DISABLE',
      });
    });
  });
});