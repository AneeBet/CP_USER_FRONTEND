import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SideMenuOS from './SideMenuOS';
import '@testing-library/jest-dom';

describe('SideMenuOS Component', () => {
  test('renders the side menu with links', () => {
    render(
      <Router>
        <SideMenuOS />
      </Router>
    );

    expect(screen.getByText(/Register a grievance/i)).toBeInTheDocument();
    expect(screen.getByText(/Schedule Call/i)).toBeInTheDocument();
    expect(screen.getByText(/Feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Grievance/i)).toBeInTheDocument();
  });

  test('sets active class based on the current path', () => {
    render(
      <MemoryRouter initialEntries={['/otherservices/customer-registergrievance']}>
        <SideMenuOS />
      </MemoryRouter>
    );

    expect(screen.getByText(/Register a grievance/i)).toHaveClass('active');
    expect(screen.getByText(/Schedule Call/i)).not.toHaveClass('active');
    expect(screen.getByText(/Feedback/i)).not.toHaveClass('active');
  });

  test('navigates to Register a grievance when the Register a grievance link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/otherservices/customer-schedulecall']}>
        <SideMenuOS />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Register a grievance/i));
    expect(window.location.pathname).toBe('/otherservices/customer-registergrievance');
  });

  test('navigates to Schedule Call when the Schedule Call link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/otherservices/customer-registergrievance']}>
        <SideMenuOS />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Schedule Call/i));
    expect(window.location.pathname).toBe('/otherservices/customer-schedulecall');
  });

  test('navigates to Feedback when the Feedback link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/otherservices/customer-registergrievance']}>
        <SideMenuOS />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Feedback/i));
    expect(window.location.pathname).toBe('/otherservices/customer-feedback');
  });

  test('navigates to Track Grievance when the Track Grievance link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/otherservices/customer-registergrievance']}>
        <SideMenuOS />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Track Grievance/i));
    expect(window.location.pathname).toBe('/otherservices/customer-trackgrievance');
  });
});
