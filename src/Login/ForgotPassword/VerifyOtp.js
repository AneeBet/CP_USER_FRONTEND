import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import './ForgotPasswordCSS/VerifyOtp.css'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, context } = location.state;
  const { setUserType, setEmail } = useUser();

  const handleVerifyOtp = async () => {
    const url = context === 'signup' 
      ? 'http://localhost:3551/guest/verify-signup-otp'
      : context === 'password-reset-guest'
      ? 'http://localhost:3551/guest/verify-password-reset-otp'
      : 'http://localhost:3552/customer/verify-password-reset-otp';

    try {
      const response = await axios.post(url, { "email":email, "otp":otp });
      if (response.data==true) {
        if (context === 'signup') {
          setUserType('guest');
          setEmail(email);
          navigate('/apply');
        } else {
          setUserType(context === 'password-reset-guest' ? 'guest' : 'customer');
          setEmail(email);
          navigate('/reset-password', { state: { email, otp, userType: context === 'password-reset-guest' ? 'guest' : 'customer' } });
        }
      }
      setError('Invalid OTP');
    } catch (error) {
      setError('Invalid OTP or OTP expired');
    }
  };

  return (
    <div className='verify-body'>
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      {error && <div className="otp-error">{error}</div>}
    </div>
    </div>
  );
};

export default VerifyOtp;