import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../Customer/SideMenuCSS/SideMenu.css'

const ApplySideMenu = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderMenuItems = () => {
    if (path.startsWith('/guest-track-application')) {
      return (
        <li><NavLink to="/guest-track-application" activeClassName="active">Track Your Application</NavLink></li>
      );
    }
    if (path.startsWith('/guest-other-services')) {
      return (
        <>
          <li><NavLink to="/guest-other-services/register-grievance" activeClassName="active">Register a grievance</NavLink></li>
          <li><NavLink to="/guest-other-services/schedule-call" activeClassName="active">Schedule a call</NavLink></li>
          <li><NavLink to="/guest-other-services/feedback" activeClassName="active">Feedback</NavLink></li>
        </>
      );
    }
    if (path.startsWith('/offers')) {
      return null; // No menu items for offers
    }
    return (
      <>
        <li><NavLink to="/apply" activeClassName="active">Apply</NavLink></li>
        <li><NavLink to="/apply/personal-details" activeClassName="active">Personal Details</NavLink></li>
        <li><NavLink to="/apply/employment-details" activeClassName="active">Employment Details</NavLink></li>
        <li><NavLink to="/apply/choose-your-card" activeClassName="active">Choose Your Card</NavLink></li>
        <li><NavLink to="/apply/upload-kyc" activeClassName="active">Upload KYC</NavLink></li>
      </>
    );
  };

  return (
    <aside className="side_menu">
      <ul>
        {renderMenuItems()}
      </ul>
    </aside>
  );
};

export default ApplySideMenu;



