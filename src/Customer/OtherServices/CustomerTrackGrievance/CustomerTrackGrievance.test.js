import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CustomerTrackGrievances from './CustomerTrackGrievance';
import { useUser } from '../../../Login/Context/UserContext';
 
// Mock dependencies
jest.mock('axios');
jest.mock('../../../Login/Context/UserContext');
 
const mockUser = { customerId: '123' };
const mockAccounts = [
  { accountNumber: 'acc1' },
  { accountNumber: 'acc2' },
];
const mockGrievances = [
  { grievanceId: '1', subject: 'Subject 1', description: 'Description 1', timestamp: '2021-09-15T00:00:00.000Z', status: 'PENDING' },
  { grievanceId: '2', subject: 'Subject 2', description: 'Description 2', timestamp: '2021-09-16T00:00:00.000Z', status: 'RESOLVED' },
];
 
describe('CustomerTrackGrievances', () => {
  beforeEach(() => {
    useUser.mockReturnValue(mockUser);
    axios.get.mockResolvedValue({ data: mockAccounts });
    axios.post.mockResolvedValue({ data: mockGrievances });
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders without crashing', async () => {
    const { getByLabelText } = render(<CustomerTrackGrievances />);
   
    await waitFor(() => {
      expect(getByLabelText(/select account number/i)).toBeInTheDocument();
    });
  });
 
  test('loads and displays active accounts', async () => {
    const { getByLabelText, getAllByRole } = render(<CustomerTrackGrievances />);
   
    await waitFor(() => {
      expect(getByLabelText(/select account number/i)).toBeInTheDocument();
    });
 
    const options = getAllByRole('option');
    expect(options).toHaveLength(mockAccounts.length + 1); // +1 for the "None" option
    expect(options[1].textContent).toBe('acc1');
    expect(options[2].textContent).toBe('acc2');
  });
 
  test('fetches and displays grievances when an account is selected', async () => {
    const { getByLabelText, getByText } = render(<CustomerTrackGrievances />);
   
    fireEvent.change(getByLabelText(/select account number/i), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/grievance/readall', {
        accountNumber: 'acc1',
      });
    });
 
    await waitFor(() => {
      expect(getByText(/subject 1/i)).toBeInTheDocument();
      expect(getByText(/description 1/i)).toBeInTheDocument();
      expect(getByText(/pending/i)).toBeInTheDocument();
      expect(getByText(/subject 2/i)).toBeInTheDocument();
      expect(getByText(/description 2/i)).toBeInTheDocument();
      expect(getByText(/resolved/i)).toBeInTheDocument();
    });
  });
 
  test('filters grievances by status', async () => {
    const { getByLabelText, getByText, queryByText } = render(<CustomerTrackGrievances />);
   
    fireEvent.change(getByLabelText(/select account number/i), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByText(/subject 1/i)).toBeInTheDocument();
      expect(getByText(/subject 2/i)).toBeInTheDocument();
    });
 
    fireEvent.change(getByLabelText(/select status/i), { target: { value: 'PENDING' } });
 
    await waitFor(() => {
      expect(getByText(/subject 1/i)).toBeInTheDocument();
      expect(queryByText(/subject 2/i)).toBeNull();
    });
 
    fireEvent.change(getByLabelText(/select status/i), { target: { value: 'RESOLVED' } });
 
    await waitFor(() => {
      expect(queryByText(/subject 1/i)).toBeNull();
      expect(getByText(/subject 2/i)).toBeInTheDocument();
    });
  });
 
  test('handles error when fetching accounts', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch account details'));
   
    const { getByText } = render(<CustomerTrackGrievances />);
   
    await waitFor(() => {
      expect(getByText(/failed to fetch account details/i)).toBeInTheDocument();
    });
  });
 
  test('handles error when fetching grievances', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to fetch grievances'));
   
    const { getByLabelText, getByText } = render(<CustomerTrackGrievances />);
   
    fireEvent.change(getByLabelText(/select account number/i), { target: { value: 'acc1' } });
 
    await waitFor(() => {
      expect(getByText(/failed to fetch grievances/i)).toBeInTheDocument();
    });
  });
});