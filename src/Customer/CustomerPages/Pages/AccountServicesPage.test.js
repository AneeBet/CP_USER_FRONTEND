import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AccountsnServicesPage from './AccountServicesPage';
import CustomerProfile from '../../AccountServices/CustomerProfile/CustomerProfile';
import AccountDetails from '../../AccountServices/AccountDetails/AccountDetails';
import AccountStatement from '../../AccountServices/AccountStatement/AccountStatement';
import SideMenuAS from '../CustomerSideMenu/SideMenuAS';
import CustomerNavbar from '../../CustomerNavbar/CustomerNavbar';
 
jest.mock('../../AccountServices/CustomerProfile/CustomerProfile', () => () => <div>CustomerProfile Component</div>);
jest.mock('../../AccountServices/AccountDetails/AccountDetails', () => () => <div>AccountDetails Component</div>);
jest.mock('../../AccountServices/AccountStatement/AccountStatement', () => () => <div>AccountStatement Component</div>);
jest.mock('../CustomerSideMenu/SideMenuAS', () => () => <div>SideMenuAS Component</div>);
jest.mock('../../CustomerNavbar/CustomerNavbar', () => () => <div>CustomerNavbar Component</div>);
 
describe('AccountsnServicesPage', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <AccountsnServicesPage />
      </MemoryRouter>
    );
  };
 
  test('renders the CustomerNavbar and SideMenuAS components', () => {
    renderWithRouter(['/profile']);
 
    expect(screen.getByText('CustomerNavbar Component')).toBeInTheDocument();
    expect(screen.getByText('SideMenuAS Component')).toBeInTheDocument();
  });
 
  test('renders CustomerProfile when navigating to /profile', () => {
    renderWithRouter(['/profile']);
 
    expect(screen.getByText('CustomerProfile Component')).toBeInTheDocument();
  });
 
  test('renders AccountDetails when navigating to /accountdetails', () => {
    renderWithRouter(['/accountdetails']);
 
    expect(screen.getByText('AccountDetails Component')).toBeInTheDocument();
  });
 
  test('renders AccountStatement when navigating to /accountstatement', () => {
    renderWithRouter(['/accountstatement']);
 
    expect(screen.getByText('AccountStatement Component')).toBeInTheDocument();
  });
});