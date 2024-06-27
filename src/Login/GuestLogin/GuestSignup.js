

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext'; 
import './GuestSignup.css'

const GuestSignup = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setName, setEmail, setUserType } = useUser(); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =  /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
 

  const handleSignup = async () => {
    if (!user.name || !user.email || !user.password) {
      setError('All fields are required');
      return;
    }

    if (!emailRegex.test(user.email)) {
      setError('Invalid email format');
      return;
    }

    if (!passwordRegex.test(user.password)) {
      setError('Password must be at least 8 characters long and contain at least one letter and one number');
      return;
    }
    
    try {
      await axios.post('http://localhost:3551/guest/signup', {
        name: user.name,
        email: user.email,
        password: user.password
      });
      setName(user.name);
      setEmail(user.email);
      setUserType('guest');
      navigate('/verify-otp', { state: { email: user.email, context: 'signup' } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError('An error occurred during signup.');
      }
    }
  };

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
    if (error) {
      setError('');
    }
  };

  return (
    <div className='signup-body'>
      <div className="guest-sign-container">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="guest-sign-form-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="guest-sign-form-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="guest-sign-form-input"
          required
        />
        <button onClick={handleSignup} className="guest-sign-btn">Signup as Guest</button>
        {error && <div className="guest-sign-error">{error}</div>}
        <div>
          <p>Want to login as a guest? <button onClick={() => {
            setUserType('guest');
            navigate('/guest-login');
          }} data-testid="guest-login-button">Switch to Guest Login</button></p>
        </div>
      </div>
    </div>
  );
};

export default GuestSignup;
