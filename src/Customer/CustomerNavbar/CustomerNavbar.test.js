import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import '@testing-library/jest-dom';

describe('CustomerNavbar Component', () => {
  test('renders the navbar with links', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Accounts & Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Cards/i)).toBeInTheDocument();
    expect(screen.getByText(/Other Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Offers/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggle Theme/i)).toBeInTheDocument();
  });

  test('toggles the dropdown menu on profile button click', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /profile/i }));
    expect(screen.getByText(/View Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(document);
    expect(screen.queryByText(/View Profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  test('toggles the theme on button click', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    expect(document.body.className).toBe('dark-theme');
    fireEvent.click(screen.getByText(/Toggle Theme/i));
    expect(document.body.className).toBe('light-theme');
    fireEvent.click(screen.getByText(/Toggle Theme/i));
    expect(document.body.className).toBe('dark-theme');
  });

  test('opens and closes the burger menu', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    const burgerMenu = screen.getByRole('button', { name: /burger menu/i });
    fireEvent.click(burgerMenu);
    
  });

  test('navigates to Home when the Home link is clicked', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Home/i));
    expect(window.location.pathname).toBe('/dashboard');
  });

  test('navigates to Accounts & Services when the Accounts & Services link is clicked', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Accounts & Services/i));
    expect(window.location.pathname).toBe('/accountsnservices/profile');
  });

  test('navigates to Manage Cards when the Manage Cards link is clicked', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Manage Cards/i));
    expect(window.location.pathname).toBe('/managecards/additionalcard');
  });

  test('navigates to Other Services when the Other Services link is clicked', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Other Services/i));
    expect(window.location.pathname).toBe('/otherservices/customer-registergrievance');
  });

  test('navigates to Offers when the Offers link is clicked', () => {
    render(
      <Router>
        <CustomerNavbar />
      </Router>
    );

    fireEvent.click(screen.getByText(/Offers/i));
    expect(window.location.pathname).toBe('/offers');
  });
});
