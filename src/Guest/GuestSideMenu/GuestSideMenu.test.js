import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ApplySideMenu from './GuestSideMenu';
 
describe('ApplySideMenu Component', () => {
  const renderWithRouter = (initialEntries) =>
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/*" element={<ApplySideMenu />} />
        </Routes>
      </MemoryRouter>
    );
 
  test('renders the menu and checks active link for Track Your Application', () => {
    const { getByText } = renderWithRouter(['/guest-track-application']);
 
    const trackApplicationLink = getByText('Track Your Application');
    expect(trackApplicationLink).toBeInTheDocument();
    expect(trackApplicationLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Register a grievance', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/register-grievance']);
 
    const registerGrievanceLink = getByText('Register a grievance');
    expect(registerGrievanceLink).toBeInTheDocument();
    expect(registerGrievanceLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Schedule a call', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/schedule-call']);
 
    const scheduleCallLink = getByText('Schedule a call');
    expect(scheduleCallLink).toBeInTheDocument();
    expect(scheduleCallLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Feedback', () => {
    const { getByText } = renderWithRouter(['/guest-other-services/feedback']);
 
    const feedbackLink = getByText('Feedback');
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Apply', () => {
    const { getByText } = renderWithRouter(['/apply']);
 
    const applyLink = getByText('Apply');
    expect(applyLink).toBeInTheDocument();
    expect(applyLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Personal Details', () => {
    const { getByText } = renderWithRouter(['/apply/personal-details']);
 
    const personalDetailsLink = getByText('Personal Details');
    expect(personalDetailsLink).toBeInTheDocument();
    expect(personalDetailsLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Employment Details', () => {
    const { getByText } = renderWithRouter(['/apply/employment-details']);
 
    const employmentDetailsLink = getByText('Employment Details');
    expect(employmentDetailsLink).toBeInTheDocument();
    expect(employmentDetailsLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Choose Your Card', () => {
    const { getByText } = renderWithRouter(['/apply/choose-your-card']);
 
    const chooseYourCardLink = getByText('Choose Your Card');
    expect(chooseYourCardLink).toBeInTheDocument();
    expect(chooseYourCardLink).toHaveClass('active');
  });
 
  test('renders the menu and checks active link for Upload KYC', () => {
    const { getByText } = renderWithRouter(['/apply/upload-kyc']);
 
    const uploadKYCLink = getByText('Upload KYC');
    expect(uploadKYCLink).toBeInTheDocument();
    expect(uploadKYCLink).toHaveClass('active');
  });
 
  test('renders no menu items for offers', () => {
    const { queryByText } = renderWithRouter(['/offers']);
 
    expect(queryByText('Track Your Application')).not.toBeInTheDocument();
    expect(queryByText('Register a grievance')).not.toBeInTheDocument();
    expect(queryByText('Schedule a call')).not.toBeInTheDocument();
    expect(queryByText('Feedback')).not.toBeInTheDocument();
    expect(queryByText('Apply')).not.toBeInTheDocument();
    expect(queryByText('Personal Details')).not.toBeInTheDocument();
    expect(queryByText('Employment Details')).not.toBeInTheDocument();
    expect(queryByText('Choose Your Card')).not.toBeInTheDocument();
    expect(queryByText('Upload KYC')).not.toBeInTheDocument();
  });
});
 
