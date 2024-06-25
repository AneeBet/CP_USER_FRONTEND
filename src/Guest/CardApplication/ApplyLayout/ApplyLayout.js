import React from 'react';
import GuestNavbar from '../../GuestNavbar/GuestNavbar';
import ApplySideMenu from '../../GuestSideMenu/GuestSideMenu';

const ApplyLayout = ({ children }) => {
  return (
    <div className="apply-layout">
    <GuestNavbar/>
      <div className="main-content">
    <ApplySideMenu/>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ApplyLayout;
