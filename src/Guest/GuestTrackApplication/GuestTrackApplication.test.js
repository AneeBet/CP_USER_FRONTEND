import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import GuestTrackApplication from './GuestTrackApplication';
 

jest.mock('../../Login/Context/UserContext', () => ({
  useUser: () => ({ email: 'test@example.com' }),
}));
 
jest.mock('axios');
 
describe('GuestTrackApplication Component', () => {
  const applicationData = {
    name: 'John Doe',
    cardType: 'Gold',
    applicationStatus: 'Pending',
    applicationId: '12345',
  };
 
  test('renders the application data', async () => {
    axios.get.mockResolvedValueOnce({ data: applicationData });
 
    const { getByText } = render(
      <MemoryRouter>
        <GuestTrackApplication />
      </MemoryRouter>
    );
 
    await waitFor(() => {
      expect(getByText('12345')).toBeInTheDocument();
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Gold')).toBeInTheDocument();
      expect(getByText('Pending')).toBeInTheDocument();
    });
  });
 
  test('displays an error message when fetching application data fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching application data'));
 
    const { getByText } = render(
      <MemoryRouter>
        <GuestTrackApplication />
      </MemoryRouter>
    );
 
    await waitFor(() => {
      expect(getByText('Error fetching application data')).toBeInTheDocument();
    });
  });
});
 
