import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AccountStatement from './AccountStatement';
import { useUser } from '../../../Login/Context/UserContext';
 
jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
jest.mock('axios');
 

jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    text: jest.fn(),
    autoTable: jest.fn(),
  }));
});
 
describe('AccountStatement Component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ customerId: 'test-customer-id' });
  });
 
  const accounts = [
    {
      accountNumber: '123456',
      cardNumber: '987654321',
      activationStatus: 'Active',
      cardStatus: 'Active',
      baseCurrency: 'USD',
      openingDate: '2022-01-01',
      expiryDate: '2025-01-01',
      cardBalance: 1000,
      dueAmount: 200,
      dueDate: '2022-12-31',
    },
    {
      accountNumber: '654321',
      cardNumber: '123456789',
      activationStatus: 'Inactive',
      cardStatus: 'Inactive',
      baseCurrency: 'USD',
      openingDate: '2021-01-01',
      expiryDate: '2024-01-01',
      cardBalance: 500,
      dueAmount: 100,
      dueDate: '2022-11-30',
    },
  ];
 
  const transactions = [
    {
      timestamp: '2022-01-01T10:00:00Z',
      amount: 100,
      description: 'Test Transaction 1',
      transactiontype: 'Debit',
    },
    {
      timestamp: '2022-01-02T10:00:00Z',
      amount: 200,
      description: 'Test Transaction 2',
      transactiontype: 'Credit',
    },
  ];
 
  test('fetches and displays accounts on component mount', async () => {
    axios.get.mockResolvedValueOnce({ data: accounts });
 
    const { getByText, getByLabelText } = render(<AccountStatement />);
 
    await waitFor(() => {
      expect(getByLabelText('Account Number')).toBeInTheDocument();
      expect(getByText('123456')).toBeInTheDocument();
      expect(getByText('654321')).toBeInTheDocument();
    });
  });
 
  test('fetches and displays transactions when an account is selected', async () => {
    axios.get.mockResolvedValueOnce({ data: accounts });
    axios.post.mockResolvedValueOnce({ data: transactions });
 
    const { getByLabelText, getByText } = render(<AccountStatement />);
 
    await waitFor(() => {
      expect(getByLabelText('Account Number')).toBeInTheDocument();
    });
 
    fireEvent.change(getByLabelText('Account Number'), { target: { value: '123456' } });
 
    await waitFor(() => {
      expect(getByText('Test Transaction 1')).toBeInTheDocument();
      expect(getByText('Test Transaction 2')).toBeInTheDocument();
    });
  });
 
  test('handles fetch account details error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch account details'));
 
    const { getByText } = render(<AccountStatement />);
 
    await waitFor(() => {
      expect(getByText('Failed to fetch account details:')).toBeInTheDocument();
    });
  });
 
  test('handles fetch transactions error', async () => {
    axios.get.mockResolvedValueOnce({ data: accounts });
    axios.post.mockRejectedValueOnce(new Error('Failed to fetch transactions'));
 
    const { getByLabelText, getByText } = render(<AccountStatement />);
 
    await waitFor(() => {
      expect(getByLabelText('Account Number')).toBeInTheDocument();
    });
 
    fireEvent.change(getByLabelText('Account Number'), { target: { value: '123456' } });
 
    await waitFor(() => {
      expect(getByText('Failed to fetch transactions:')).toBeInTheDocument();
    });
  });
 
  test('handles PDF download', async () => {
    axios.get.mockResolvedValueOnce({ data: accounts });
    axios.post.mockResolvedValueOnce({ data: transactions });
 
    const { getByLabelText, getByText } = render(<AccountStatement />);
 
    await waitFor(() => {
      expect(getByLabelText('Account Number')).toBeInTheDocument();
    });
 
    fireEvent.change(getByLabelText('Account Number'), { target: { value: '123456' } });
 
    await waitFor(() => {
      expect(getByText('Test Transaction 1')).toBeInTheDocument();
    });
 
   
    fireEvent.click(getByText('Download Statement'));
 
 
    const jsPDFInstance = require('jspdf').mock.instances[0];
    expect(jsPDFInstance.save).toHaveBeenCalled();
    expect(jsPDFInstance.text).toHaveBeenCalledWith('Account Details:', 14, 20);
    expect(jsPDFInstance.autoTable).toHaveBeenCalled();
  });
});
 
