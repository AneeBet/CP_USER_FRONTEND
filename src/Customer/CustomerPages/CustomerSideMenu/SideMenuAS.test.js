import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SideMenuAS from './SideMenuAS';
import '@testing-library/jest-dom';

describe('SideMenuAS Component', () => {
  let locationMock;

  beforeAll(() => {
    locationMock = jest.spyOn(window, 'location', 'get');
  });

  afterAll(() => {
    locationMock.mockRestore();
  });

  const mockPathname = (pathname) => {
    locationMock.mockReturnValue({
      ...window.location,
      pathname,
    });
  };

  test('renders the side menu with links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideMenuAS />
      </MemoryRouter>
    );

    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Statement/i)).toBeInTheDocument();
  });

  test('sets active class based on the current path', () => {
    mockPathname('/accountsnservices/accountstatement');
    
    render(
      <MemoryRouter initialEntries={['/accountsnservices/profile']}>
        <SideMenuAS />
      </MemoryRouter>
    );

    expect(screen.getByText(/Profile/i)).toHaveClass('active');
    expect(screen.getByText(/Account Details/i)).not.toHaveClass('active');
    expect(screen.getByText(/Account Statement/i)).not.toHaveClass('active');
  });

  test('navigates to Profile when the Profile link is clicked', () => {
    mockPathname('/accountsnservices/profile');

    render(
      <MemoryRouter initialEntries={['/accountsnservices/profile']}>
        <Routes>
          <Route path="/accountsnservices/*" element={<SideMenuAS />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Profile/i));
    expect(window.location.pathname).toBe('/accountsnservices/profile');
  });

  test('navigates to Account Details when the Account Details link is clicked', () => {
    mockPathname('/accountsnservices/accountdetails');

    render(
      <MemoryRouter initialEntries={['/accountsnservices/accountdetails']}>
        <Routes>
          <Route path="/accountsnservices/*" element={<SideMenuAS />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Account Details/i));
    expect(window.location.pathname).toBe('/accountsnservices/accountdetails');
  });

  test('navigates to Account Statement when the Account Statement link is clicked', () => {
    mockPathname('/accountsnservices/accountstatement');

    render(
      <MemoryRouter initialEntries={['/accountsnservices/accountstatement']}>
        <Routes>
          <Route path="/accountsnservices/*" element={<SideMenuAS />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Account Statement/i));
    expect(window.location.pathname).toBe('/accountsnservices/accountstatement');
  });
});
