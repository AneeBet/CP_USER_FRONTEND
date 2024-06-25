import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SideMenuManageCards from './SideMenuManageCards';
import '@testing-library/jest-dom';

describe('SideMenuManageCards Component', () => {
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
        <SideMenuManageCards />
      </MemoryRouter>
    );

    expect(screen.getByText(/Additional Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Change PIN/i)).toBeInTheDocument();
    expect(screen.getByText(/Close Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Disable Payments/i)).toBeInTheDocument();
    expect(screen.getByText(/Due Payments/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Transaction Limit/i)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade Card/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Application/i)).toBeInTheDocument();
  });

  test('sets active class based on the current path', () => {
    mockPathname('/additionalcard');
    
    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <SideMenuManageCards />
      </MemoryRouter>
    );

    expect(screen.getByText(/Additional Card/i)).toHaveClass('active');
    expect(screen.getByText(/Change PIN/i)).not.toHaveClass('active');
    expect(screen.getByText(/Close Account/i)).not.toHaveClass('active');
  });

  test('navigates to Additional Card when the Additional Card link is clicked', () => {
    mockPathname('/changepin');

    render(
      <MemoryRouter initialEntries={['/changepin']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Additional Card/i));
    expect(window.location.pathname).toBe('/additionalcard');
  });

  test('navigates to Change PIN when the Change PIN link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Change PIN/i));
    expect(window.location.pathname).toBe('/changepin');
  });

  test('navigates to Close Account when the Close Account link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Close Account/i));
    expect(window.location.pathname).toBe('/closeaccount');
  });

  test('navigates to Disable Payments when the Disable Payments link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Disable Payments/i));
    expect(window.location.pathname).toBe('/disablepayments');
  });

  test('navigates to Due Payments when the Due Payments link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Due Payments/i));
    expect(window.location.pathname).toBe('/duepayments');
  });

  test('navigates to Edit Transaction Limit when the Edit Transaction Limit link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Edit Transaction Limit/i));
    expect(window.location.pathname).toBe('/edittransactionlimit');
  });

  test('navigates to Upgrade Card when the Upgrade Card link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Upgrade Card/i));
    expect(window.location.pathname).toBe('/upgradecard');
  });

  test('navigates to Track Application when the Track Application link is clicked', () => {
    mockPathname('/additionalcard');

    render(
      <MemoryRouter initialEntries={['/additionalcard']}>
        <Routes>
          <Route path="/*" element={<SideMenuManageCards />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Track Application/i));
    expect(window.location.pathname).toBe('/trackapplication');
  });
});
