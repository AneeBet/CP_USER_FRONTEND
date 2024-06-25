import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import EditTransactionLimit from './EditTransactionLimit';
import { useUser } from '../../../Login/Context/UserContext';
 
// Mock dependencies
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext');
 
describe('EditTransactionLimit', () => {
  const mockActiveAccounts = ['acc1', 'acc2'];
  const mockCurrentLimit = { currentLimit: 5000 };
  const mockMaxLimit = { maxLimit: 10000 };
  const mockUser = { customerId: '12345' };
 
  beforeEach(() => {
    useUser.mockReturnValue(mockUser);
    axios.get.mockResolvedValue({ data: mockActiveAccounts });
    axios.post.mockImplementation((url) => {
      if (url.includes('get-transaction-limit')) {
        return Promise.resolve({ data: { currentLimit: mockCurrentLimit.currentLimit } });
      }
      if (url.includes('get-credit-limit')) {
        return Promise.resolve({ data: mockMaxLimit });
      }
      return Promise.reject(new Error('Unexpected POST request'));
    });
    axios.put.mockResolvedValue({});
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders without crashing', async () => {
    render(<EditTransactionLimit />);
    expect(screen.getByText('Select Account:')).toBeInTheDocument();
  });
 
  test('loads and displays active accounts', async () => {
    render(<EditTransactionLimit />);
 
    await waitFor(() => {
      expect(screen.getByText('acc1')).toBeInTheDocument();
      expect(screen.getByText('acc2')).toBeInTheDocument();
    });
  });
 
  test('fetches and displays current limit when account and payment mode are selected', async () => {
    render(<EditTransactionLimit />);
 
    fireEvent.change(screen.getByLabelText('Select Account:'), { target: { value: 'acc1' } });
    fireEvent.change(screen.getByLabelText('Select Payment Mode:'), { target: { value: 'Online Payment' } });
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/get-transaction-limit', {
        accountNumber: 'acc1',
        paymentType: 'onlinepayment',
      });
      expect(screen.getByText('Current Limit')).toBeInTheDocument();
      expect(screen.getByText('Rs. 5000')).toBeInTheDocument();
    });
  });
 
  test('handles confirmation dialog correctly', async () => {
    render(<EditTransactionLimit />);
 
    fireEvent.change(screen.getByLabelText('Select Account:'), { target: { value: 'acc1' } });
    fireEvent.change(screen.getByLabelText('Select Payment Mode:'), { target: { value: 'Online Payment' } });
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/get-transaction-limit', {
        accountNumber: 'acc1',
        paymentType: 'onlinepayment',
      });
    });
 
    fireEvent.change(screen.getByLabelText('New Limit'), { target: { value: '6000' } });
    fireEvent.click(screen.getByText('Confirm'));
 
    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to change the transaction limit?')).toBeInTheDocument();
    });
 
    fireEvent.click(screen.getByText('OK'));
 
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:3552/customer/update-transaction-limit', {
        accountNumber: 'acc1',
        paymentType: 'onlinepayment',
        newLimit: 6000,
      });
      expect(screen.getByText('Transaction limit changed successfully!')).toBeInTheDocument();
    });
  });
 
  test('displays error when fields are missing', async () => {
    render(<EditTransactionLimit />);
 
    fireEvent.click(screen.getByText('Confirm'));
 
    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
    });
  });
 
  test('displays error when new limit exceeds max limit', async () => {
    render(<EditTransactionLimit />);
 
    fireEvent.change(screen.getByLabelText('Select Account:'), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/get-credit-limit', {
        accountNumber: 'acc1',
      });
    });
 
    fireEvent.change(screen.getByLabelText('Select Payment Mode:'), { target: { value: 'Online Payment' } });
    fireEvent.change(screen.getByLabelText('New Limit'), { target: { value: '15000' } });
    fireEvent.click(screen.getByText('Confirm'));
 
    await waitFor(() => {
      expect(screen.getByText('New limit cannot exceed the maximum limit of Rs. 10000.')).toBeInTheDocument();
    });
  });
});