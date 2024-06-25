import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ManageCardsPage from './ManageCardsPage';
 
jest.mock('../../ManageCards/ChangePin/ChangePin', () => () => <div>ChangePin Component</div>);
jest.mock('../../ManageCards/CloseAccount/CloseAccount', () => () => <div>CloseAccount Component</div>);
jest.mock('../../ManageCards/DisablePayments/DisablePayments', () => () => <div>DisablePayments Component</div>);
jest.mock('../../ManageCards/DuePayments/DuePayments', () => () => <div>DuePayments Component</div>);
jest.mock('../../ManageCards/EditTransactionLimit/EditTransactionLimit', () => () => <div>EditTransactionLimit Component</div>);
jest.mock('../../ManageCards/AdditionalCard/AdditionalCard', () => () => <div>AdditionalCard Component</div>);
jest.mock('../../ManageCards/TrackCardApplication/TrackCardApplication', () => () => <div>TrackCardApplication Component</div>);
jest.mock('../CustomerSideMenu/SideMenuManageCards', () => () => <div>SideMenuManageCards Component</div>);
jest.mock('../../CustomerNavbar/CustomerNavbar', () => () => <div>CustomerNavbar Component</div>);
 
describe('ManageCardsPage', () => {
  const renderWithRouter = (initialEntries) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <ManageCardsPage />
      </MemoryRouter>
    );
  };
 
  test('renders the CustomerNavbar and SideMenuManageCards components', () => {
    renderWithRouter(['/changepin']);
 
    expect(screen.getByText('CustomerNavbar Component')).toBeInTheDocument();
    expect(screen.getByText('SideMenuManageCards Component')).toBeInTheDocument();
  });
 
  test('renders ChangePin when navigating to /changepin', () => {
    renderWithRouter(['/changepin']);
 
    expect(screen.getByText('ChangePin Component')).toBeInTheDocument();
  });
 
  test('renders CloseAccount when navigating to /closeaccount', () => {
    renderWithRouter(['/closeaccount']);
 
    expect(screen.getByText('CloseAccount Component')).toBeInTheDocument();
  });
 
  test('renders DisablePayments when navigating to /disablepayments', () => {
    renderWithRouter(['/disablepayments']);
 
    expect(screen.getByText('DisablePayments Component')).toBeInTheDocument();
  });
 
  test('renders DuePayments when navigating to /duepayments', () => {
    renderWithRouter(['/duepayments']);
 
    expect(screen.getByText('DuePayments Component')).toBeInTheDocument();
  });
 
  test('renders EditTransactionLimit when navigating to /edittransactionlimit', () => {
    renderWithRouter(['/edittransactionlimit']);
 
    expect(screen.getByText('EditTransactionLimit Component')).toBeInTheDocument();
  });
 
  test('renders AdditionalCard when navigating to /additionalcard', () => {
    renderWithRouter(['/additionalcard']);
 
    expect(screen.getByText('AdditionalCard Component')).toBeInTheDocument();
  });
 
  test('renders AdditionalCard when navigating to /upgradecard', () => {
    renderWithRouter(['/upgradecard']);
 
    expect(screen.getByText('AdditionalCard Component')).toBeInTheDocument();
  });
 
  test('renders TrackCardApplication when navigating to /trackapplication', () => {
    renderWithRouter(['/trackapplication']);
 
    expect(screen.getByText('TrackCardApplication Component')).toBeInTheDocument();
  });
});