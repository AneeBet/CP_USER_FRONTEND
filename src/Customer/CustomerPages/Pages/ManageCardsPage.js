import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChangePin from '../../ManageCards/ChangePin/ChangePin';
import CloseAccount from '../../ManageCards/CloseAccount/CloseAccount';
import DisablePayments from '../../ManageCards/DisablePayments/DisablePayments';
import DuePayments from '../../ManageCards/DuePayments/DuePayments';
import EditTransactionLimit from '../../ManageCards/EditTransactionLimit/EditTransactionLimit';
import AdditionalCard from '../../ManageCards/AdditionalCard/AdditionalCard';
import TrackCardApplication from '../../ManageCards/TrackCardApplication/TrackCardApplication';
import SideMenuManageCards from '../CustomerSideMenu/SideMenuManageCards';
import CustomerNavbar from '../../CustomerNavbar/CustomerNavbar';





function ManageCardsPage() {
  return (
    <div>
      <CustomerNavbar/>
    <div className='side_menu'>
      <SideMenuManageCards />
    </div>
    <div
      className='right_layout'>
      <Routes>
        <Route path="changepin" element={<ChangePin />} />
        <Route path="closeaccount" element={<CloseAccount />} />
        <Route path="disablepayments" element={<DisablePayments />} />
        <Route path="duepayments" element={<DuePayments />} />
        <Route path="edittransactionlimit" element={<EditTransactionLimit />} />
        <Route path="additionalcard" element={<AdditionalCard />} />
        <Route path="upgradecard" element={< AdditionalCard/>} />
        <Route path="trackapplication" element={<TrackCardApplication />} />
       
      </Routes>
      
    </div>
  </div>
  );
}

export default ManageCardsPage;


