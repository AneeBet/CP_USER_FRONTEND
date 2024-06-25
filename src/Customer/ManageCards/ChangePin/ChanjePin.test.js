import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import ChangePin from './ChangePin';
import { useUser } from '../../../Login/Context/UserContext';
 
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
describe('ChangePin', () => {
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
    return render(<ChangePin />);
  };
 
  test('renders the change pin form', async () => {
    setup();
    expect(screen.getByText('Select Account:')).toBeInTheDocument();
    expect(screen.getByLabelText(/Current PIN:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New PIN:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();
  });
 
  test('displays accounts in the select dropdown', async () => {
    setup();
    await waitFor(() => {
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3); 
    });
  });
 
  test('validates form fields', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Please fill in the following fields:/i)).toBeInTheDocument();
    });
  });
 
  test('validates PIN length', async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Current PIN:/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/New PIN:/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/PINs must be exactly 4 digits./i)).toBeInTheDocument();
    });
  });
 
  test('handles successful pin change', async () => {
    axios.put.mockResolvedValue({});
    setup();
 
    fireEvent.change(screen.getByLabelText(/Current PIN:/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/New PIN:/i), { target: { value: '5678' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
 
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/PIN changed successfully/i)).toBeInTheDocument();
    });
  });
 
  test('handles pin change failure', async () => {
    axios.put.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid PIN'
        }
      }
    });
    setup();
 
    fireEvent.change(screen.getByLabelText(/Current PIN:/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/New PIN:/i), { target: { value: '5678' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
 
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/Invalid PIN/i)).toBeInTheDocument();
    });
  });
 
  test('displays error for invalid PIN format', async () => {
    setup();
 
    fireEvent.change(screen.getByLabelText(/Current PIN:/i), { target: { value: '123a' } });
    fireEvent.blur(screen.getByLabelText(/Current PIN:/i));
    expect(screen.getByText(/PIN can only be a four-digit number/i)).toBeInTheDocument();
 
    fireEvent.change(screen.getByLabelText(/New PIN:/i), { target: { value: '567a' } });
    fireEvent.blur(screen.getByLabelText(/New PIN:/i));
    expect(screen.getByText(/PIN can only be a four-digit number/i)).toBeInTheDocument();
  });
 
  test('resets form after successful PIN change', async () => {
    axios.put.mockResolvedValue({});
    setup();
 
    fireEvent.change(screen.getByLabelText(/Current PIN:/i), { target: { value: '1234' } });
    fireEvent.change(screen.getByLabelText(/New PIN:/i), { target: { value: '5678' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Account1' } });
 
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
 
    await waitFor(() => {
      expect(screen.getByText(/PIN changed successfully/i)).toBeInTheDocument();
    });
 
    await waitFor(() => {
      expect(screen.getByLabelText(/Current PIN:/i).value).toBe('');
      expect(screen.getByLabelText(/New PIN:/i).value).toBe('');
      expect(screen.getByRole('combobox').value).toBe('');
    });
  });
});
 
