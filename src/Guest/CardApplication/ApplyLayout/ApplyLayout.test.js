import React from 'react';
import { render, screen } from '@testing-library/react';
import ApplyLayout from './ApplyLayout';

 

jest.mock('../../GuestNavbar/GuestNavbar', () => () => <div data-testid="guest-navbar">Guest Navbar Mock</div>);
jest.mock('../../GuestSideMenu/GuestSideMenu', () => () => <div data-testid="apply-side-menu">Apply Side Menu Mock</div>);
 
describe('ApplyLayout Component', () => {
  test('renders ApplyLayout component correctly with children', () => {
    const testChild = <div data-testid="test-child">Test Child</div>;
 
    render(
      <ApplyLayout>
        {testChild}
      </ApplyLayout>
    );
 
    expect(screen.getByTestId('guest-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('apply-side-menu')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
 
  test('renders ApplyLayout component without children', () => {
    render(<ApplyLayout />);
 
    expect(screen.getByTestId('guest-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('apply-side-menu')).toBeInTheDocument();
    expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
  });
});
 