import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GuestSideMenuOS from './GuestSideMenuOS';
 
describe('GuestSideMenuOS Component', () => {
  const renderWithRouter = (initialEntries) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/guest-other-services/*" element={<GuestSideMenuOS />} />
        </Routes>
      </MemoryRouter>
    );
 
  test('renders the side menu and checks active link for Profile', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/profile']);
 
    const profileLink = getByText('Profile');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveClass('active');
  });
 
  test('checks active link for Register Grievance', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/register-grievance']);
 
    const registerGrievanceLink = getByText('Register Grievance');
    expect(registerGrievanceLink).toBeInTheDocument();
    expect(registerGrievanceLink).toHaveClass('active');
  });
 
  test('checks active link for Schedule Call', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/schedule-call']);
 
    const scheduleCallLink = getByText('Schedule Call');
    expect(scheduleCallLink).toBeInTheDocument();
    expect(scheduleCallLink).toHaveClass('active');
  });
 
  test('checks active link for Feedback', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/feedback']);
 
    const feedbackLink = getByText('Feedback');
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveClass('active');
  });
 
  test('checks active link for Track Grievances', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/track-grievances']);
 
    const trackGrievancesLink = getByText('Track Grievances');
    expect(trackGrievancesLink).toBeInTheDocument();
    expect(trackGrievancesLink).toHaveClass('active');
  });
});
 
