import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CustomerOtherServices from './CustomerOtherServicesPage';
import SideMenuOS from '../CustomerSideMenu/SideMenuOS';
import CustomerRegisterGrievance from '../../OtherServices/CustomerRegisterGrievance/CustomerRegisterGrievance';
import CustomerScheduleCall from '../../OtherServices/CustomerScheduleCall/CustomerScheduleCall';
import CustomerFeedback from '../../OtherServices/CustomerFeedback/CustomerFeedback';
import CustomerTrackGrievances from '../../OtherServices/CustomerTrackGrievance/CustomerTrackGrievance';
import CustomerNavbar from '../../CustomerNavbar/CustomerNavbar';
 
jest.mock('../CustomerSideMenu/SideMenuOS', () => () => <div>SideMenuOS Component</div>);
jest.mock('../../OtherServices/CustomerRegisterGrievance/CustomerRegisterGrievance', () => () => <div>CustomerRegisterGrievance Component</div>);
jest.mock('../../OtherServices/CustomerScheduleCall/CustomerScheduleCall', () => () => <div>CustomerScheduleCall Component</div>);
jest.mock('../../OtherServices/CustomerFeedback/CustomerFeedback', () => () => <div>CustomerFeedback Component</div>);
jest.mock('../../OtherServices/CustomerTrackGrievance/CustomerTrackGrievance', () => () => <div>CustomerTrackGrievances Component</div>);
jest.mock('../../CustomerNavbar/CustomerNavbar', () => () => <div>CustomerNavbar Component</div>);
 
describe('CustomerOtherServices', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <CustomerOtherServices />
      </MemoryRouter>
    );
  };
 
  test('renders the CustomerNavbar and SideMenuOS components', () => {
    renderWithRouter(['/customer-registergrievance']);
 
    expect(screen.getByText('CustomerNavbar Component')).toBeInTheDocument();
    expect(screen.getByText('SideMenuOS Component')).toBeInTheDocument();
  });
 
  test('renders CustomerRegisterGrievance when navigating to /customer-registergrievance', () => {
    renderWithRouter(['/customer-registergrievance']);
 
    expect(screen.getByText('CustomerRegisterGrievance Component')).toBeInTheDocument();
  });
 
  test('renders CustomerScheduleCall when navigating to /customer-schedulecall', () => {
    renderWithRouter(['/customer-schedulecall']);
 
    expect(screen.getByText('CustomerScheduleCall Component')).toBeInTheDocument();
  });
 
  test('renders CustomerFeedback when navigating to /customer-feedback', () => {
    renderWithRouter(['/customer-feedback']);
 
    expect(screen.getByText('CustomerFeedback Component')).toBeInTheDocument();
  });
 
  test('renders CustomerTrackGrievances when navigating to /customer-trackgrievance', () => {
    renderWithRouter(['/customer-trackgrievance']);
 
    expect(screen.getByText('CustomerTrackGrievances Component')).toBeInTheDocument();
  });
});