import React from 'react';
import { Link, useLocation } from 'react-router-dom';

 
 
function GuestSideMenuOS() {
  const location = useLocation();
 
  return (
    <div className='side_menu'>
      <ul>
      <li>
          <Link className={location.pathname === "/guest-other-services/profile" ? "active" : ""} to="profile">Profile</Link>
        </li>
        <li>
          <Link className={location.pathname === "/guest-other-services/register-grievance" ? "active" : ""} to="register-grievance">Register Grievance</Link>
        </li>
        <li>
          <Link className={location.pathname === "/guest-other-services/schedule-call" ? "active" : ""} to="schedule-call">Schedule Call</Link>
        </li>
        <li>
          <Link className={location.pathname === "/guest-other-services/feedback" ? "active" : ""} to="feedback">Feedback</Link>
        </li>
        <li>
          <Link className={location.pathname === "/guest-other-services/track-grievances" ? "active" : ""} to="track-grievances">Track Grievances</Link>
        </li>
      </ul>
    </div>
  );
}
 
export default GuestSideMenuOS;