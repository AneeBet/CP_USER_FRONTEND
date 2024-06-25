import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenuOS from '../CustomerSideMenu/SideMenuOS';
import CustomerRegisterGrievance from '../../OtherServices/CustomerRegisterGrievance/CustomerRegisterGrievance';
import CustomerScheduleCall from '../../OtherServices/CustomerScheduleCall/CustomerScheduleCall';
import CustomerFeedback from '../../OtherServices/CustomerFeedback/CustomerFeedback';
import CustomerTrackGrievances from '../../OtherServices/CustomerTrackGrievance/CustomerTrackGrievance';
import CustomerNavbar from '../../CustomerNavbar/CustomerNavbar';






function CustomerOtherServices() {
  return (
    <div className='OS_layout'>
      <div>
        <CustomerNavbar/>
      </div>
      <div className='sidebar_menu3'>
        <SideMenuOS />
      </div>
      <div className='right_layout3'>
        <Routes>
          
        <Route path="customer-registergrievance" element={<CustomerRegisterGrievance />} />
          <Route path="customer-schedulecall" element={<CustomerScheduleCall />} />
          <Route path="customer-feedback" element={<CustomerFeedback />} />
          <Route path="customer-trackgrievance" element={<CustomerTrackGrievances />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default CustomerOtherServices;
