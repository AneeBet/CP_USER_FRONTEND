import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import GuestTrackGrievance from './GuestTrackGrievance';
 

jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: () => ({ email: 'test@example.com' }),
}));
 
jest.mock('axios');
 
describe('GuestTrackGrievance Component', () => {
  test('renders the grievance tracking form and displays data', async () => {
    const grievances = [
      { grievanceId: 1, subject: 'Test Subject 1', description: 'Test Description 1', timestamp: '2023-01-01T12:00:00Z', status: 'PENDING' },
      { grievanceId: 2, subject: 'Test Subject 2', description: 'Test Description 2', timestamp: '2023-01-02T12:00:00Z', status: 'RESOLVED' },
    ];
 
    axios.get.mockResolvedValueOnce({ data: grievances });
 
    const { getByLabelText, getByText, queryByText } = render(<GuestTrackGrievance />);
 
    await waitFor(() => {
      expect(getByText('Test Subject 1')).toBeInTheDocument();
      expect(getByText('Test Description 1')).toBeInTheDocument();
      expect(getByText('Test Subject 2')).toBeInTheDocument();
      expect(getByText('Test Description 2')).toBeInTheDocument();
    });
 
    
    fireEvent.change(getByLabelText(/Select Status/i), { target: { value: 'PENDING' } });
    await waitFor(() => {
      expect(getByText('Test Subject 1')).toBeInTheDocument();
      expect(queryByText('Test Subject 2')).not.toBeInTheDocument();
    });
 
    fireEvent.change(getByLabelText(/Select Status/i), { target: { value: 'RESOLVED' } });
    await waitFor(() => {
      expect(queryByText('Test Subject 1')).not.toBeInTheDocument();
      expect(getByText('Test Subject 2')).toBeInTheDocument();
    });
 
    fireEvent.change(getByLabelText(/Select Status/i), { target: { value: 'All' } });
    await waitFor(() => {
      expect(getByText('Test Subject 1')).toBeInTheDocument();
      expect(getByText('Test Subject 2')).toBeInTheDocument();
    });
  });
 
  test('displays an error message when fetching grievances fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch grievances'));
 
    const { getByText } = render(<GuestTrackGrievance />);
 
    await waitFor(() => {
      expect(getByText('Failed to fetch grievances')).toBeInTheDocument();
    });
  });
});
 