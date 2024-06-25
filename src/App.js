import './App.css';
import { UserProvider } from './Login/Context/UserContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from './Login/ForgotPassword/ForgotPassword';
import ResetFirstPassword from './Login/CustomerLogin/ResetFirstPassword';
import CustomerLogin from './Login/CustomerLogin/CustomerLogin';
import GuestLogin from './Login/GuestLogin/GuestLogin';
import GuestSignup from './Login/GuestLogin/GuestSignup';
import LandingPage from './Login/LandingPage/LandingPage';
import VerifyOtp from './Login/ForgotPassword/VerifyOtp';
import ResetPassword from './Login/ForgotPassword/ResetPassword';
import Apply from './Guest/CardApplication/Apply/Apply';
import ApplyLayout from './Guest/CardApplication/ApplyLayout/ApplyLayout';
import ChooseYourCard from './Guest/CardApplication/ChooseCard/ChooseYourCard';
import EmploymentDetails from './Guest/CardApplication/EmployementDetails/EmployementDetails';
import PersonalDetails from './Guest/CardApplication/PersonalDetails/Personaldetails';
import UploadKYC from './Guest/CardApplication/UploadKYC/UploadKYC';
import GuestTrackApplication from './Guest/GuestTrackApplication/GuestTrackApplication';
import { AppProvider } from './Guest/Context/AppContext';
import ManageCardsPage from './Customer/CustomerPages/Pages/ManageCardsPage';
import AccountsnServicesPage from './Customer/CustomerPages/Pages/AccountServicesPage';
import Dashboard from './Customer/CustomerDashboard/CustomerDashboard';

import CustomerOtherServices from './Customer/CustomerPages/Pages/CustomerOtherServicesPage';
import GuestOtherServices from './Guest/GuestPages/GuestOtherServices';



function App() {
 

  
  
 
  return (
    <UserProvider>
      <AppProvider>
      
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} />


        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/reset-first-password" element={<ResetFirstPassword />} />
        <Route path="/customer-forgot-password" element={<ForgotPassword />} />

        <Route path="/guest-login" element={<GuestLogin />} />
        <Route path="/guest-signup" element={<GuestSignup />} />
        <Route path="/guest-forgot-password" element={<ForgotPassword />} />
        
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword/>} />
   
        <Route path="/apply" element={<ApplyLayout><Apply/></ApplyLayout>} />
        <Route path="/apply/choose-your-card" element={<ApplyLayout><ChooseYourCard/></ApplyLayout>} />
        <Route path="/apply/employment-details" element={<ApplyLayout><EmploymentDetails/></ApplyLayout>} />
        <Route path="/apply/personal-details" element={<ApplyLayout><PersonalDetails/></ApplyLayout>} />
        <Route path="/apply/upload-kyc" element={<ApplyLayout><UploadKYC/></ApplyLayout>} />
        <Route path="/guest-track-application" element={<ApplyLayout><GuestTrackApplication/></ApplyLayout>} />

        <Route path="/guest-other-services/*" element={<GuestOtherServices/>} />
    

   
        <Route path="/managecards/*" element={<ManageCardsPage />} />
        <Route path="/accountsnservices/*" element={<AccountsnServicesPage />} />
        <Route path="/otherservices/*" element={< CustomerOtherServices/>} />
        <Route path="/dashboard" element={<Dashboard />} />

    

    </Routes>
    </Router>
    </AppProvider>
    </UserProvider>
  );
}

export default App;
