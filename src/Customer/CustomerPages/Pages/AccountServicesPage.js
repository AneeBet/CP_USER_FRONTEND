import React from 'react';
import { Routes, Route } from 'react-router-dom';


import CustomerProfile from '../../AccountServices/CustomerProfile/CustomerProfile';
import AccountDetails from '../../AccountServices/AccountDetails/AccountDetails';
import AccountStatement from '../../AccountServices/AccountStatement/AccountStatement';
import SideMenuAS from '../CustomerSideMenu/SideMenuAS';
import CustomerNavbar from '../../CustomerNavbar/CustomerNavbar';

function AccountsnServicesPage() {
  return (
    <>
    <CustomerNavbar/>
    <div className='A&S_layout'>
      <div className='side_menu'>
        <SideMenuAS />
      </div>
      <div className='right_layout2'>
        <Routes>
          
        <Route path="profile" element={<CustomerProfile />} />
          <Route path="accountdetails" element={<AccountDetails/>} />
          <Route path="accountstatement" element={<AccountStatement />} />
          
        </Routes>
      </div>
    </div>
    </>
  );
}

export default AccountsnServicesPage;
