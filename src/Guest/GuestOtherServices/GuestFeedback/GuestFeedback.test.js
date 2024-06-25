import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import GuestFeedback from './GuestFeedback';
 

jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: () => ({ email: 'test@example.com' }),
}));
 
jest.mock('axios');
 
describe('GuestFeedback Component', () => {
  test('renders the feedback form', () => {
    const { getByLabelText, getByText } = render(<GuestFeedback />);
    expect(getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(getByLabelText(/Description/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });
 
  test('displays an error message when fields are empty', async () => {
    const { getByText } = render(<GuestFeedback />);
 
    fireEvent.click(getByText(/Submit/i));
 
    await waitFor(() => {
      expect(getByText(/All fields are required/i)).toBeInTheDocument();
    });
  });
 
  test('submits the feedback form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { feedbackId: 123, message: 'Success' } });
 
    const { getByLabelText, getByText, queryByText } = render(<GuestFeedback />);
    fireEvent.change(getByLabelText(/Rating/i), { target: { value: '4' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Great service!' } });
 
    fireEvent.click(getByText(/Submit/i));
 
    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      expect(getByText(/Feedback submitted successfully!/i)).toBeInTheDocument();
    });
  });
 
  test('displays an error message when submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Submission failed'));
 
    const { getByLabelText, getByText, queryByText } = render(<GuestFeedback />);
    fireEvent.change(getByLabelText(/Rating/i), { target: { value: '4' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Great service!' } });
 
    fireEvent.click(getByText(/Submit/i));
 
    await waitFor(() => {
      expect(queryByText(/All fields are required/i)).not.toBeInTheDocument();
      expect(getByText(/Error submitting feedback. Please try again./i)).toBeInTheDocument();
    });
  });
});
 