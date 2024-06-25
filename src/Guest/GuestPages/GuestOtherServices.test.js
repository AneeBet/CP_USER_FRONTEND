import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GuestOtherServices from './GuestOtherServices';

 

jest.mock('../GuestOtherServices/GuestProfile/GuestProfile', () => () => <div>Guest Profile</div>);
jest.mock('../GuestOtherServices/GuestRegisterGrievance/GuestRegisterGrievance', () => () => <div>Guest Register Grievance</div>);
jest.mock('../GuestOtherServices/GuestScheduleCall/GuestScheduleCall', () => () => <div>Guest Schedule Call</div>);
jest.mock('../GuestOtherServices/GuestFeedback/GuestFeedback', () => () => <div>Guest Feedback</div>);
jest.mock('../GuestOtherServices/GuestTrackGrievance/GuestTrackGrievance', () => () => <div>Guest Track Grievance</div>);
jest.mock('./GuestSideMenuOS', () => () => <div>Guest Side Menu OS</div>);
jest.mock('../GuestNavbar/GuestNavbar', () => () => <div>Guest Navbar</div>);
 
describe('GuestOtherServices Component', () => {
  test('renders GuestOtherServices and navigates through routes', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <GuestOtherServices />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Guest Navbar')).toBeInTheDocument();
    expect(screen.getByText('Guest Side Menu OS')).toBeInTheDocument();
    expect(screen.getByText('Guest Profile')).toBeInTheDocument();
 
    render(
      <MemoryRouter initialEntries={['/register-grievance']}>
        <GuestOtherServices />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Guest Register Grievance')).toBeInTheDocument();
 
    render(
      <MemoryRouter initialEntries={['/schedule-call']}>
        <GuestOtherServices />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Guest Schedule Call')).toBeInTheDocument();
 
    render(
      <MemoryRouter initialEntries={['/feedback']}>
        <GuestOtherServices />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Guest Feedback')).toBeInTheDocument();
 
    render(
      <MemoryRouter initialEntries={['/track-grievances']}>
        <GuestOtherServices />
      </MemoryRouter>
    );
 
    expect(screen.getByText('Guest Track Grievance')).toBeInTheDocument();
  });
});