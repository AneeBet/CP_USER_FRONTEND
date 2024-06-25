

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import './ForgotPasswordCSS/ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp, userType } = location.state;

  const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and contain at least one letter, one number, and one special character');
      return;
    }

    const url = userType === 'guest'
      ? 'http://localhost:3551/guest/reset-password'
      : 'http://localhost:3552/customer/reset-password';

    const payload = {
      email,
      otp,
      password: newPassword
    };

    try {
      await axios.post(url, payload);
      alert("Password change successful! Login again");
      navigate(userType === 'guest' ? '/guest-login' : '/customer-login');
    } catch (error) {
      console.error('Error:', error);
      setError('Error resetting password');
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className='reset-pass-body'>
    <div className="reset-it-container">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={handleInputChange(setNewPassword)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={handleInputChange(setConfirmPassword)}
      />
      <button onClick={resetPassword}>Reset Password</button>
      {error && <p className="reset-it-error-message">{error}</p>}
    </div>
    </div>
  );
};

export default ResetPassword;
