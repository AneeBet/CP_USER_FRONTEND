import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuestProfile from '../GuestOtherServices/GuestProfile/GuestProfile';
import GuestRegisterGrievance from '../GuestOtherServices/GuestRegisterGrievance/GuestRegisterGrievance';
import GuestScheduleCall from '../GuestOtherServices/GuestScheduleCall/GuestScheduleCall';
import GuestFeedback from '../GuestOtherServices/GuestFeedback/GuestFeedback';
import GuestTrackGrievance from '../GuestOtherServices/GuestTrackGrievance/GuestTrackGrievance';
import GuestSideMenuOS from './GuestSideMenuOS';
import GuestNavbar from '../GuestNavbar/GuestNavbar';



 
 
function GuestOtherServices() {
  return (
    <div className='OS_layout'>
      <div>
        <GuestNavbar/>
      </div>
      <div className='sidebar_menu3'>
        <GuestSideMenuOS/>
      </div>
      <div className='right_layout3'>
        <Routes>
        <Route path="/profile" element= {<GuestProfile/>}/>
        <Route path="/register-grievance" element={<GuestRegisterGrievance/>} />
            <Route path="/schedule-call" element={<GuestScheduleCall/>} />
            <Route path="/feedback" element={<GuestFeedback/>} />
            <Route path="/track-grievances" element={<GuestTrackGrievance/>} />
        </Routes>
      </div>
    </div>
  );
}
 
export default GuestOtherServices;