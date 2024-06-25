import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import GuestScheduleCall from './GuestScheduleCall';
 
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
describe('GuestScheduleCall', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ email: 'guest@example.com' });
    jest.clearAllMocks();
  });
 
  test('renders without crashing', () => {
    render(<GuestScheduleCall />);
    expect(screen.getByText(/Select Time Slot:/i)).toBeInTheDocument();
  });
 
  test('validates form inputs', async () => {
    render(<GuestScheduleCall />);
 
    fireEvent.click(screen.getByText(/Submit/i));
 
    expect(await screen.findByText(/All fields are required/i)).toBeInTheDocument();
  });
 
  test('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ data: {} });
 
    render(<GuestScheduleCall />);
 
    fireEvent.change(screen.getByLabelText(/Select Time Slot:/i), { target: { value: 'Morning(9am-12pm)' } });
    fireEvent.change(screen.getByLabelText(/Subject:/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Test Description' } });
 
    fireEvent.click(screen.getByText(/Submit/i));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3551/guest/schedulecall/add', {
        guestProfile: { guestEmail: 'guest@example.com' },
        subject: 'Test Subject',
        description: 'Test Description',
        timeSlot: 'Morning(9am-12pm)',
        status: 'PENDING'
      });
    });
 
    expect(screen.getByText(/Schedule call request submitted successfully!/i)).toBeInTheDocument();
  });
 
  test('handles API error during form submission', async () => {
    axios.post.mockRejectedValue(new Error('Failed to submit schedule call'));
 
    render(<GuestScheduleCall />);
 
    fireEvent.change(screen.getByLabelText(/Select Time Slot:/i), { target: { value: 'Morning(9am-12pm)' } });
    fireEvent.change(screen.getByLabelText(/Subject:/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Test Description' } });
 
    fireEvent.click(screen.getByText(/Submit/i));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
 
    expect(screen.getByText(/Error submitting schedule call/i)).toBeInTheDocument();
  });
});