import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CloseAccount from './CloseAccount';
import { useUser } from '../../../Login/Context/UserContext';
 
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
describe('CloseAccount', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ customerId: '12345' });
    axios.get.mockResolvedValue({
      data: ['Account1', 'Account2'],
    });
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  const setup = () => {
    return render(<CloseAccount />);
  };
 
  test('renders the close account form', async () => {
    setup();
    expect(screen.getByText('Select Account:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();
  });
 
  test('displays accounts in the select dropdown', async () => {
    setup();
    await waitFor(() => {
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3); 
    });
  });
 
  test('shows message if no account is selected', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Please select an account./i)).toBeInTheDocument();
    });
  });
 
  test('opens confirmation modal when account is selected', async () => {
    setup();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Confirm Deactivation/i)).toBeInTheDocument();
    });
  });
 
  test('handles successful account deactivation', async () => {
    axios.put.mockResolvedValue({});
    setup();
 
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /OK/i }));
    });
 
    await waitFor(() => {
      expect(screen.getByText(/Account deactivated successfully./i)).toBeInTheDocument();
    });
  });
 
  test('handles account deactivation failure', async () => {
    axios.put.mockRejectedValue({
      response: {
        data: {
          message: 'Error deactivating account'
        }
      }
    });
    setup();
 
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /OK/i }));
    });
 
    await waitFor(() => {
      expect(screen.getByText(/Error deactivating account/i)).toBeInTheDocument();
    });
  });
 
  test('closes the modal when the OK button is clicked', async () => {
    setup();
 
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /OK/i }));
    });
 
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /OK/i }));
    });
 
    await waitFor(() => {
      expect(screen.queryByText(/Please select an account./i)).not.toBeInTheDocument();
    });
  });
 
  test('closes the confirmation modal when Cancel button is clicked', async () => {
    setup();
 
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Confirm Deactivation/i)).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    });
 
    await waitFor(() => {
      expect(screen.queryByText(/Confirm Deactivation/i)).not.toBeInTheDocument();
    });
  });
});
 
