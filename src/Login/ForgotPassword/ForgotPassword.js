import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import './ForgotPasswordCSS/ForgotPassword.css'
 
const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const { userType, setEmail } = useUser();
  const navigate = useNavigate();
 
  const sendOtp = async () => {
    const url = userType === 'guest'
      ? 'http://localhost:3551/guest/forgot-password'
      : 'http://localhost:3552/customer/forgot-password';
 
    try {
      const response=await axios.post(url, { "email": emailInput });
      if(response.data===true){
        setOtpSent(true);
        setEmail(emailInput);
        navigate('/verify-otp', { state: { email: emailInput, context: userType === 'guest' ? 'password-reset-guest' : 'password-reset-customer' } });
      }else{
        setError("Email does not exists")
      } } catch (error) {
      console.error('Error:', error);
      setError('Error sending OTP');
    }
  };
 
  return (
    <div className='forgot-body'>
    <div className="final-forgot-container">
      <h2>Forgot Password</h2>
      <input
        type="text"
        placeholder="Email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      {error && <div className="final-forgot-error">{error}</div>}
    </div>
    </div>
  );
};
 
export default ForgotPassword;