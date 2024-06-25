import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import GuestRegisterGrievance from './GuestRegisterGrievance';
 

jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: () => ({ email: 'test@example.com' }),
}));
 
jest.mock('axios');
 
describe('GuestRegisterGrievance Component', () => {
  test('renders the grievance form', () => {
    const { getByLabelText, getByText } = render(<GuestRegisterGrievance />);
    expect(getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(getByLabelText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });
 
  test('displays an error message when fields are empty', async () => {
    const { getByText } = render(<GuestRegisterGrievance />);
 
    fireEvent.click(getByText(/Submit/i));
 
    await waitFor(() => {
      expect(getByText(/All fields are required/i)).toBeInTheDocument();
    });
  });
 
  test('submits the grievance form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Success' } });
 
    const { getByLabelText, getByText, queryByText } = render(<GuestRegisterGrievance />);
    fireEvent.change(getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Test Description' } });
 
    fireEvent.click(getByText(/Submit/i));
 
    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      
    });
  });
 
  test('displays an error message when submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Submission failed'));
 
    const { getByLabelText, getByText, queryByText } = render(<GuestRegisterGrievance />);
    fireEvent.change(getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Test Description' } });
 
    fireEvent.click(getByText(/Submit/i));
 
    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      
    });
  });
});