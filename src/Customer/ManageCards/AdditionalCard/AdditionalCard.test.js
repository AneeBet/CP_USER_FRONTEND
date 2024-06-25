import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../../Login/Context/UserContext';
import AdditionalCard from './AdditionalCard';
 
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
 
jest.mock('../../../Login/Context/UserContext');
 
describe('AdditionalCard', () => {
  const mockNavigate = jest.fn();
  const mockCustomerId = '12345';
 
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useUser.mockReturnValue({
      customerId: mockCustomerId,
    });
  });
 
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AdditionalCard />
      </BrowserRouter>
    );
  };
 
  test('renders the additional card selection form', () => {
    const { getByText, getByLabelText, getByRole } = renderComponent();
    expect(getByText('Choose the Right Credit Card for Your Lifestyle')).toBeInTheDocument();
    expect(getByLabelText(/Platinum/i)).toBeInTheDocument();
    expect(getByLabelText(/Gold/i)).toBeInTheDocument();
    expect(getByLabelText(/Silver/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /Submit Application/i })).toBeInTheDocument();
  });
 
  test('selects a card option', () => {
    const { getByLabelText } = renderComponent();
    fireEvent.click(getByLabelText(/Platinum/i));
    expect(getByLabelText(/Platinum/i)).toBeChecked();
 
    fireEvent.click(getByLabelText(/Gold/i));
    expect(getByLabelText(/Gold/i)).toBeChecked();
    expect(getByLabelText(/Platinum/i)).not.toBeChecked();
 
    fireEvent.click(getByLabelText(/Silver/i));
    expect(getByLabelText(/Silver/i)).toBeChecked();
    expect(getByLabelText(/Gold/i)).not.toBeChecked();
  });
 
  test('handles successful form submission', async () => {
    axios.post.mockResolvedValue({ data: 'Application Sent Successfully' });
    const { getByRole, getByLabelText } = renderComponent();
 
    fireEvent.click(getByLabelText(/Platinum/i));
    fireEvent.click(getByRole('button', { name: /Submit Application/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/create-customer-card-application', {
        customerId: mockCustomerId,
        cardType: 'Platinum',
        isUpgrade: false,
        status: 'PENDING',
      });
    });
  });
 
  test('handles form submission error', async () => {
    axios.post.mockRejectedValue(new Error('Submission failed'));
    const { getByRole, getByLabelText, findByText } = renderComponent();
 
    fireEvent.click(getByLabelText(/Gold/i));
    fireEvent.click(getByRole('button', { name: /Submit Application/i }));
 
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3552/customer/create-customer-card-application', {
        customerId: mockCustomerId,
        cardType: 'Gold',
        isUpgrade: false,
        status: 'PENDING',
      });
    });
 
    expect(await findByText('Application Failed')).toBeInTheDocument();
  });
});
 
