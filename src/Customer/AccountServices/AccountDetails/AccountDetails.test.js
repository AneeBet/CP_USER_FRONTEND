import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AccountDetails from './AccountDetails';
import { useUser } from '../../../Login/Context/UserContext';
import { useNavigate } from 'react-router-dom';
 
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
 
describe('AccountDetails', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ customerId: '123' });
    useNavigate.mockReturnValue(jest.fn());
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders without crashing', () => {
    render(<AccountDetails />);
    expect(screen.getByLabelText('Select Account')).toBeInTheDocument();
  });
 
  test('loads and displays accounts', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { accountNumber: 'acc1', cardNumber: '1234', cardStatus: 'Active', creditCard: 'Gold', cardSwipeLimit: 50000, openingDate: '2023-01-01', expiryDate: '2025-01-01', dueAmount: 1000, dueDate: '2023-02-01', baseCurrency: 'INR' },
        { accountNumber: 'acc2' }
      ]
    });
 
    render(<AccountDetails />);
 
    await waitFor(() => {
      expect(screen.getByText('acc1')).toBeInTheDocument();
      expect(screen.getByText('acc2')).toBeInTheDocument();
    });
  });
 
  test('fetches and displays account details when account is selected', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { accountNumber: 'acc1', cardNumber: '1234', cardStatus: 'Active', creditCard: 'Gold', cardSwipeLimit: 50000, openingDate: '2023-01-01', expiryDate: '2025-01-01', dueAmount: 1000, dueDate: '2023-02-01', baseCurrency: 'INR' }
      ]
    });
 
    render(<AccountDetails />);
 
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Select Account'), { target: { value: 'acc1' } });
    });
 
    await waitFor(() => {
      expect(screen.getByText('Card No.: 1234')).toBeInTheDocument();
      expect(screen.getByText('Status: Active')).toBeInTheDocument();
      expect(screen.getByText('Card Type: Gold')).toBeInTheDocument();
      expect(screen.getByText('Maximum Limit: 50000')).toBeInTheDocument();
      expect(screen.getByText('Opening Date: 2023-01-01')).toBeInTheDocument();
      expect(screen.getByText('Expiry Date: 2025-01-01')).toBeInTheDocument();
      expect(screen.getByText('Due Amount: 1000')).toBeInTheDocument();
      expect(screen.getByText('Due Date: 2023-02-01')).toBeInTheDocument();
      expect(screen.getByText('Account Currency: INR')).toBeInTheDocument();
    });
  });
 
  test('handles error when fetching accounts fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch account details'));
 
    render(<AccountDetails />);
 
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch account details')).toBeInTheDocument();
    });
  });
 
  test('navigates to manage cards page when button is clicked', async () => {
    const navigateMock = useNavigate();
    axios.get.mockResolvedValueOnce({
      data: [
        { accountNumber: 'acc1', cardNumber: '1234', cardStatus: 'Active', creditCard: 'Gold', cardSwipeLimit: 50000, openingDate: '2023-01-01', expiryDate: '2025-01-01', dueAmount: 1000, dueDate: '2023-02-01', baseCurrency: 'INR' }
      ]
    });
 
    render(<AccountDetails />);
 
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Select Account'), { target: { value: 'acc1' } });
    });
 
    await waitFor(() => {
      fireEvent.click(screen.getByText('Manage Account'));
    });
 
    expect(navigateMock).toHaveBeenCalledWith('/managecards/changepin');
  });
});