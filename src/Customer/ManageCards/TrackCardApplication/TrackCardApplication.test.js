import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TrackCardApplication from './TrackCardApplication';
import { useUser } from '../../../Login/Context/UserContext';
 

jest.mock('axios');
 

jest.mock('../../../Login/Context/UserContext', () => ({
  useUser: jest.fn(),
}));
 
describe('TrackCardApplication', () => {
  const customerId = '12345';
  const applications = [
    {
      applicationId: '1',
      isUpgrade: true,
      creditCard: 'Platinum',
      status: 'Pending',
    },
    {
      applicationId: '2',
      isUpgrade: false,
      creditCard: 'Gold',
      status: 'Approved',
    },
  ];
 
  beforeEach(() => {
    useUser.mockReturnValue({ customerId });
  });
 
  test('renders loading state initially', async () => {
    axios.post.mockResolvedValueOnce({ data: applications });
 
    render(<TrackCardApplication />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
  });
 
  test('renders error state', async () => {
    const errorMessage = 'Error loading applications';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));
 
    render(<TrackCardApplication />);
    await waitFor(() => expect(screen.getByText(`Error loading applications: ${errorMessage}`)).toBeInTheDocument());
  });
 
  test('renders empty state when no applications are found', async () => {
    axios.post.mockResolvedValueOnce({ data: [] });
 
    render(<TrackCardApplication />);
    await waitFor(() => expect(screen.getByText('No applications found.')).toBeInTheDocument());
  });
 
  test('renders applications table when applications are found', async () => {
    axios.post.mockResolvedValueOnce({ data: applications });
 
    render(<TrackCardApplication />);
    await waitFor(() => expect(screen.getByText('My Applications')).toBeInTheDocument());
 
    expect(screen.getByText('Application ID')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Card Type')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
 
    applications.forEach((application) => {
      expect(screen.getByText(application.applicationId)).toBeInTheDocument();
      expect(screen.getByText(application.isUpgrade ? 'Upgrade' : 'Additional Card')).toBeInTheDocument();
      expect(screen.getByText(application.creditCard || 'N/A')).toBeInTheDocument();
      expect(screen.getByText(application.status)).toBeInTheDocument();
    });
  });
});
 
