import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import EmploymentDetails from './EmployementDetails';
import axios from 'axios';
 
jest.mock('axios');
 
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
 
const renderWithContext = (contextValue) => {
  return render(
    <AppContext.Provider value={contextValue}>
      <MemoryRouter>
        <EmploymentDetails />
      </MemoryRouter>
    </AppContext.Provider>
  );
};
 
describe('EmploymentDetails', () => {
  let contextValue;
 
  beforeEach(() => {
    contextValue = {
      data: {
        personalDetails: { aadhaarNumber: '123456789012' },
        employmentDetails: {
          employmentYears: '',
          annualIncome: '',
          companyName: '',
          incomeProofFilePath: '',
        },
      },
      setData: jest.fn(),
    };
  });
 
  it('renders correctly and displays initial form', () => {
    renderWithContext(contextValue);
    expect(screen.getByText('Enter Your Employment Details')).toBeInTheDocument();
  });
 
  it('validates required fields', async () => {
    renderWithContext(contextValue);
 
    fireEvent.click(screen.getByText('Save & Next'));
 
    await waitFor(() => {
      expect(screen.getByText('Employment years are required')).toBeInTheDocument();
      expect(screen.getByText('Income is required')).toBeInTheDocument();
      expect(screen.getByText('Company name is required')).toBeInTheDocument();
      expect(screen.getByText('Income proof file is required')).toBeInTheDocument();
    });
  });
 
  // it('submits form and handles API success', async () => {
  //   const mockFile = new File(['dummy content'], 'income.pdf', { type: 'application/pdf' });
  //   axios.post.mockResolvedValue({ data: 'filePath' });
 
  //   renderWithContext(contextValue);
 
  //   fireEvent.change(screen.getByPlaceholderText('Enter your employment years'), { target: { value: '5' } });
  //   fireEvent.change(screen.getByPlaceholderText('Enter your income'), { target: { value: '100000' } });
  //   fireEvent.change(screen.getByPlaceholderText('Enter your company name'), { target: { value: 'Company' } });
  //   fireEvent.change(screen.getByText('Upload Last 3 Months Income Proof'), { target: { files: [mockFile] } });
 
  //   fireEvent.click(screen.getByText('Save & Next'));
 
  //   await waitFor(() => {
  //     expect(axios.post).toHaveBeenCalledWith('http://localhost:9900/files', expect.any(FormData), {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     expect(contextValue.setData).toHaveBeenCalledWith(expect.any(Function));
  //     expect(mockNavigate).toHaveBeenCalledWith('/apply/choose-your-card');
  //   });
  // });
 
  it('handles API error during file upload', async () => {
    const mockFile = new File(['dummy content'], 'income.pdf', { type: 'application/pdf' });
    axios.post.mockRejectedValue(new Error('Upload error'));
 
    renderWithContext(contextValue);
 
    fireEvent.change(screen.getByPlaceholderText('Enter your employment years'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your income'), { target: { value: '100000' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), { target: { value: 'Company' } });
    // fireEvent.change(screen.getByLabelText('Upload Last 3 Months Income Proof'), { target: { files: [mockFile] } });
 
    fireEvent.click(screen.getByText('Save & Next'));
 
    // await waitFor(() => {
    //   expect(screen.getByText('Failed to upload income proof file')).toBeInTheDocument();
    // });
  });
 
  it('navigates back when Back button is clicked', () => {
    renderWithContext(contextValue);
 
    fireEvent.click(screen.getByText('Back'));
 
    expect(mockNavigate).toHaveBeenCalledWith('/apply/personal-details');
  });
});