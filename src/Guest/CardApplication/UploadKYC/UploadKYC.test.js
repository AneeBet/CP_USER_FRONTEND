import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { AppProvider, AppContext } from '../../Context/AppContext';
import { UserProvider } from '../../../Login/Context/UserContext';
import UploadKYC from './UploadKYC';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
jest.mock('axios');
 
const mockNavigate = jest.fn();
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
const mockData = {
  personalDetails: {
    name: 'John Doe',
    address: '123 Street',
    mobileNumber: '1234567890',
    aadhaarNumber: '123412341234',
    panId: 'ABCDE1234F',
    dob: '1990-01-01',
    email: 'john.doe@example.com'
  },
  employmentDetails: {
    employmentYears: '5',
    companyName: 'ABC Corp',
    annualIncome: '500000',
    incomeProofFilePath: 'path/to/income/proof.pdf'
  },
  selectedCard: 'Gold',
  application: {}
};
 
const renderComponent = (contextValue = mockData, userContextValue = { email: 'john.doe@example.com' }) => {
  return render(
    <UserProvider value={userContextValue}>
      <AppProvider>
        <AppContext.Provider value={{ data: contextValue, setData: jest.fn() }}>
          <MemoryRouter>
            <UploadKYC />
            <ToastContainer />
          </MemoryRouter>
        </AppContext.Provider>
      </AppProvider>
    </UserProvider>
  );
};
 
describe('UploadKYC Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders the component with initial data', () => {
    renderComponent();
    expect(screen.getByText('Thanks For Applying!')).toBeInTheDocument();
    expect(screen.getByText('Kindly upload your documents for KYC')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Aadhaar Card')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Pan Card')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Signature')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Photo')).toBeInTheDocument();
    expect(screen.getByLabelText('I hereby authorize to utilize my KYC details for the creation of a new bank account')).toBeInTheDocument();
  });
 
  test('shows validation errors when fields are empty', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Aadhaar Card is required')).toBeInTheDocument();
      expect(screen.getByText('Pan Card is required')).toBeInTheDocument();
      expect(screen.getByText('Signature is required')).toBeInTheDocument();
      expect(screen.getByText('Photo is required')).toBeInTheDocument();
      expect(screen.getByText('You must authorize the use of your KYC details')).toBeInTheDocument();
    });
  });
 
  test('handles file upload and checkbox', async () => {
    renderComponent();
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
   
    fireEvent.change(screen.getByLabelText('Upload Aadhaar Card'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Pan Card'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Signature'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Photo'), { target: { files: [mockFile] } });
    fireEvent.click(screen.getByLabelText('I hereby authorize to utilize my KYC details for the creation of a new bank account'));
   
    expect(screen.getByLabelText('Upload Aadhaar Card').files[0]).toBe(mockFile);
    expect(screen.getByLabelText('Upload Pan Card').files[0]).toBe(mockFile);
    expect(screen.getByLabelText('Upload Signature').files[0]).toBe(mockFile);
    expect(screen.getByLabelText('Upload Photo').files[0]).toBe(mockFile);
    expect(screen.getByLabelText('I hereby authorize to utilize my KYC details for the creation of a new bank account').checked).toBe(true);
  });
 
  test('handles form submission and navigation', async () => {
    axios.put.mockResolvedValue({ data: 'success' });
 
    renderComponent();
 
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
 
    fireEvent.change(screen.getByLabelText('Upload Aadhaar Card'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Pan Card'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Signature'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Photo'), { target: { files: [mockFile] } });
    fireEvent.click(screen.getByLabelText('I hereby authorize to utilize my KYC details for the creation of a new bank account'));
    fireEvent.click(screen.getByText('Submit'));
 
    await waitFor(() => {
      console.log('mockNavigate calls:', mockNavigate.mock.calls);  // Log the calls to mockNavigate
      expect(mockNavigate).toHaveBeenCalledWith('/guest-track-application', {
        state: expect.objectContaining({
          userName: mockData.personalDetails.name,
          cardType: mockData.selectedCard,
          applicationStatus: 'PENDING',
          applicationId: expect.any(Number),
        }),
      });
    });
  });
 
  test('handles API error during form submission', async () => {
    axios.put.mockRejectedValue(new Error('Failed to upload'));
 
    renderComponent();
 
    const mockFile = new File(['dummy content'], 'example.png', { type: 'image/png' });
 
    fireEvent.change(screen.getByLabelText('Upload Aadhaar Card'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Pan Card'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Signature'), { target: { files: [mockFile] } });
    fireEvent.change(screen.getByLabelText('Upload Photo'), { target: { files: [mockFile] } });
    fireEvent.click(screen.getByLabelText('I hereby authorize to utilize my KYC details for the creation of a new bank account'));
    fireEvent.click(screen.getByText('Submit'));
 
    await waitFor(() => {
      console.log('mockNavigate calls on error:', mockNavigate.mock.calls);  // Log the calls to mockNavigate
      expect(screen.getByText('Failed to upload KYC documents')).toBeInTheDocument();
    });
  });
});