import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider, AppContext } from '../../Context/AppContext';
import PersonalDetails from './PersonalDetails';
import { UserProvider, UserContext } from '../../../Login/Context/UserContext';
 
const mockNavigate = jest.fn();
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
const mockData = {
  personalDetails: {
    name: '',
    address: '',
    mobileNumber: '',
    aadhaarNumber: '',
    panId: '',
    dob: ''
  },
};
 
const renderComponent = (contextValue = mockData, userContextValue = { guestName: 'Guest' }) => {
  return render(
    <UserProvider value={userContextValue}>
      <AppProvider>
        <AppContext.Provider value={{ data: contextValue, setData: jest.fn() }}>
          <MemoryRouter>
            <PersonalDetails />
          </MemoryRouter>
        </AppContext.Provider>
      </AppProvider>
    </UserProvider>
  );
};
 
describe('PersonalDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  test('renders the component with initial data', () => {
    renderComponent();
    expect(screen.getByText('Enter Your Personal Details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mobile Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Aadhaar Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Pan Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('DOB')).toBeInTheDocument();
  });
 
  test('shows validation errors when fields are empty or invalid', async () => {
    renderComponent();
    fireEvent.click(screen.getByText('Save & Next'));
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('Mobile number must be 10 digits')).toBeInTheDocument();
      expect(screen.getByText('Aadhaar number must be 12 digits')).toBeInTheDocument();
      expect(screen.getByText('Invalid PAN number format')).toBeInTheDocument();
      expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
    });
  });
 
  test('handles form submission and navigation', async () => {
    renderComponent();
 
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByPlaceholderText('Mobile Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByPlaceholderText('Aadhaar Number'), { target: { value: '123412341234' } });
    fireEvent.change(screen.getByPlaceholderText('Pan Number'), { target: { value: 'ABCDE1234F' } });
    fireEvent.change(screen.getByPlaceholderText('DOB'), { target: { value: '1990-01-01' } });
 
    fireEvent.click(screen.getByText('Save & Next'));
 
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/apply/employment-details');
    });
  });
 
  test('navigates to the previous page on Back button click', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith('/apply');
  });
});
 
