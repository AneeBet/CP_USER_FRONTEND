import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppContext, AppProvider } from './AppContext';
 

const TestComponent = () => {
  const { data, setData } = useContext(AppContext);
 
  return (
    <div>
      <div data-testid="data">{JSON.stringify(data)}</div>
      <button onClick={() => setData({ ...data, personalDetails: { ...data.personalDetails, name: 'John Doe' } })}>
        Update Name
      </button>
    </div>
  );
};
 
describe('AppProvider', () => {
  test('renders the provider with initial data', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
 
    // Check the initial data
    const dataElement = screen.getByTestId('data');
    const initialData = {
      personalDetails: {
        mobileNumber: '',
        name: '',
        panId: '',
        aadhaarNumber: '',
        address: '',
        dob: '',
      },
      employmentDetails: {
        employmentYears: '',
        companyName: '',
        annualIncome: '',
        incomeProofFilePath: ''
      },
      selectedCard: '',
      application: {
        applicationId: '',
        status: '',
        userName: '',
        cardType: ''
      }
    };
 
    expect(JSON.parse(dataElement.textContent)).toEqual(initialData);
  });
 
  test('updates the context data correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
 
    
    const button = screen.getByText('Update Name');
    fireEvent.click(button);
 
   
    const dataElement = screen.getByTestId('data');
    const updatedData = {
      personalDetails: {
        mobileNumber: '',
        name: 'John Doe',
        panId: '',
        aadhaarNumber: '',
        address: '',
        dob: '',
      },
      employmentDetails: {
        employmentYears: '',
        companyName: '',
        annualIncome: '',
        incomeProofFilePath: ''
      },
      selectedCard: '',
      application: {
        applicationId: '',
        status: '',
        userName: '',
        cardType: ''
      }
    };
 
    expect(JSON.parse(dataElement.textContent)).toEqual(updatedData);
  });
});