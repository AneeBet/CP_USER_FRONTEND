import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import './GuestLogin.css'
 
const GuestLogin = () => {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserType, setEmail } = useUser();
  const navigate = useNavigate();
 
  const handleGuestLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3551/guest/login', { "email": email, "password": password });
      setUserType('guest');
      setEmail(email);
      console.log(response.data);
      navigate('/guest-track-application');
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password');
    }
  };
 
  const handleEmailChange = (e) => {
    setEmailState(e.target.value);
    if (error) {
      setError('');
    }
  };
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };
 
  return (
    <div className='guest-login-body'>
    <div className="guest-login-container">
      <h2>Guest Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
        className="form-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
        className="form-input"
      />
      <button onClick={handleGuestLogin} className="btn">Login as Guest</button>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => {navigate('/guest-forgot-password'); setUserType('guest')}} className="btn-link">Forgot Password</button>
      <div>
        <p>Don't have an account? <Link to="/guest-signup" className="btn-link">Sign up</Link></p>
        <p>Want to login as a customer? <button className="btn-link" onClick={() => {
          setUserType('customer');
          navigate('/customer-login');
        }}>Login as Customer</button></p>
      </div>
    </div>
    </div>
  );
};
 
export default GuestLogin;