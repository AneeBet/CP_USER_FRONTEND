import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import './CustomerLogin.css'
 
const CustomerLogin = () => {
  const { setUserLogged, setUserType, setCustomerId } = useUser();
  const [customerIdInput, setCustomerIdInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!customerIdInput || !password) {
      setError('Customer ID and password are required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3552/customer/login', {
        customerId: parseInt
        (customerIdInput, 10),
        password
      });
      setUserType('customer');
      setCustomerId(parseInt
        (customerIdInput, 10));
      if (response.data === "First login, change password required") {
        navigate('/reset-first-password');
      } else {
        setUserLogged(true);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid customer ID or password');
    }
  };
 


  const handleCustomerIdChange = (e) => {
    const value = e.target.value;
    if (!/^\d{0,10}$/.test(value)) {
      setError('Customer ID must be a 10-digit number');
    } else {
      setCustomerIdInput(value);
      if (error) {
        setError('');
      }
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };
 
  return (
    <div className='login_body'>
    <div className="customer-login-container">
      <h2>Customer Login</h2><span style={{ fontSize: '12px', color: '#999' }}>Format of ID:"1000000000"</span>
      <form onSubmit={handleLogin} className="form">
        <div className="customer-form-group">
          <input
            id="customer-id"
            type="text"
            placeholder='Customer ID'
            value={customerIdInput}
            onChange={handleCustomerIdChange}
            required
          />
        </div>
        <div className="customer-form-group">
          <input
            id="password"
            type="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}  
            required
          />
        </div>
        {error && <p className="customer-error">{error}</p>}
        <button className='login-button' type="submit" data-testid="login-button">Login</button>
        <button className='login-button' onClick={() => navigate('/customer-forgot-password')} data-testid="forgot-password-button">Forgot Password</button>
      </form>
     
     
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
 
export default CustomerLogin;