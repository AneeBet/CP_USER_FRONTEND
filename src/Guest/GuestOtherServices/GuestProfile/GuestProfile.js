
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './GuestProfile.css';

const GuestProfile = () => {
  const [userProfile, setUserProfile] = useState({
    customerName: "",
    customerEmail: "",
    mobileNumber: ""
  });
  const [error, setError] = useState(false); 

  const { email } = useUser(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3551/guest/readone/${email}`);
        if (response.data) {
          setUserProfile({
            customerName: response.data.name,
            customerEmail: response.data.guestEmail,
            mobileNumber: response.data.mobileNumber
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError(true); 
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  if (error) {
    return <div className="guest-profile-container">Error loading profile data.</div>;
  }

  return (
    <div className="guest-profile-container">
      <h1>User Profile</h1>
      <div className="guest-user2-details">
        <p data-testid="username"><strong>Customer Name:</strong> {userProfile.customerName}</p>
        <p data-testid="useremail"><strong>Email:</strong> {userProfile.customerEmail}</p>
        <p data-testid="usernumber"><strong>Mobile Number:</strong> {userProfile.mobileNumber}</p>
      </div>
    </div>
  );
};

export default GuestProfile;
