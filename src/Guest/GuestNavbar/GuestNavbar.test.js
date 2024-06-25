import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GuestNavbar from './GuestNavbar';
import { FaUserCircle } from 'react-icons/fa';
 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children, ...props }) => <a {...props}>{children}</a>
}));
 
describe('GuestNavbar', () => {
  beforeEach(() => {
    document.body.className = ''; 
  });
 
  test('renders the navbar with all elements', () => {
    render(
      <MemoryRouter>
        <GuestNavbar />
      </MemoryRouter>
    );
 
    console.log(screen.getByRole('navigation').innerHTML);
 
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
    expect(screen.getByText('Track Application')).toBeInTheDocument();
    expect(screen.getByText('Other Services')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
  });
 
  test('toggles the mobile menu', () => {
    render(
      <MemoryRouter>
        <GuestNavbar />
      </MemoryRouter>
    );
 
    const burgerMenu = screen.getByRole('button', { name: '' });
 
    fireEvent.click(burgerMenu);
    expect(document.body.classList.contains('menu-open')).toBe(true);
 
    fireEvent.click(burgerMenu);
    expect(document.body.classList.contains('menu-open')).toBe(false);
  });
 
  test('toggles the theme', () => {
    render(
      <MemoryRouter>
        <GuestNavbar />
      </MemoryRouter>
    );
 
    const themeToggleButton = screen.getByRole('button', { name: '' });
 
    // Initially, the theme should be dark
    expect(document.body.classList.contains('dark-theme')).toBe(true);
 
    // Toggle to light theme
    fireEvent.click(themeToggleButton);
    expect(document.body.classList.contains('light-theme')).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
 
    // Toggle back to dark theme
    fireEvent.click(themeToggleButton);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    expect(document.body.classList.contains('light-theme')).toBe(false);
  });
 
  test('closes dropdown when clicking outside', () => {
    render(
      <MemoryRouter>
        <GuestNavbar />
      </MemoryRouter>
    );
 
    const profileLink = screen.getByRole('link', { name: /profile/i });
 
    
    fireEvent.click(profileLink);
    expect(screen.queryByRole('menu')).toBeInTheDocument();
 
   
    fireEvent.mouseDown(document);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});