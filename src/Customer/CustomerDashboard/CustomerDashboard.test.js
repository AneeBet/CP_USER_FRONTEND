import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import CustomerDashboard from './CustomerDashboard';
import { useUser } from '../../Login/Context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
 
// Mock dependencies
jest.mock('axios');
jest.mock('../../Login/Context/UserContext');
 
// Mock data
const mockUser = { customerId: '123' };
const mockActiveResponse = { data: ['acc123'] };
const mockDashboardResponse = {
  data: {
    name: 'John Doe',
    expiryDate: '12/24',
    cardNumber: '1234 5678 9101 1121',
    creditCard: "silver",
    cardBalance: 3000,
    dueAmount: 1500,
    dueDate: '2021-09-15',
    maxLimit:5000,
    transactionList: [
      {
        transactionId: 't1',
        timestamp: '2021-09-01',
        amount: 100,
        description: 'Grocery',
        transactionType: 'Debit',
        balance: 2900,
      },
    ],
  },
};
 
describe('CustomerDashboard', () => {
  beforeEach(() => {
    // Mock useUser implementation
    useUser.mockReturnValue(mockUser);
 
    // Mock axios get and post responses
    axios.get.mockResolvedValue(mockActiveResponse);
    axios.post.mockResolvedValue(mockDashboardResponse);
  });
 
  afterEach(() => {
    jest.clearAllMocks();
  });
 
  const setup = () => {
    return render(
      <Router>
        <CustomerDashboard />
      </Router>
    );
  };
 
  test('renders without crashing', async () => {
    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText(/Spending Limit:/i)).toBeInTheDocument();
      expect(getByText(/Due Date/i)).toBeInTheDocument();
      expect(getByText(/Transactions/i)).toBeInTheDocument();
    });
  });
 
  test('loads and displays customer data', async () => {
    const { getByText } = setup();
    await waitFor(() => {
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText(/Rs\s*5000/i)).toBeInTheDocument();
      expect(getByText(/Available Rs.\s*2000/i)).toBeInTheDocument();
    });
  });
 
  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    const { getByText } = render(
      <Router>
        <CustomerDashboard />
      </Router>
    );
    await waitFor(() => {
      expect(getByText(/Error fetching data/i)).toBeInTheDocument();
    });
  });
});