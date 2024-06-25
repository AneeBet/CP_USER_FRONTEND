
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext'; 
import './CustomerProfile.css';

const CustomerProfile = () => {
    const [userProfile, setUserProfile] = useState({
        customerName: "",
        customerId: "",
        email: "",
        aadharNumber: "",
        dateOfBirth: "",
        mobileNumber: "",
        address: ""
    });
    const [error, setError] = useState(''); 
    const { customerId } = useUser(); 

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3552/customer/readone/${customerId}`);
                
                setUserProfile({
                    customerName: response.data.name,
                    customerId: response.data.customerId.toString(),
                    email: response.data.email,
                    aadharNumber: response.data.aadhaarNumber.toString(),
                    dateOfBirth: new Date(response.data.dob).toLocaleDateString(),
                    mobileNumber: response.data.mobileNumber,
                    address: response.data.address
                });
                setError(''); 
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Error fetching user profile');
            }
        };

        if (customerId) {
            fetchUserProfile();
        }
    }, [customerId]);

    return (
        <>
        <div className="customer_profile-container">
            <h1>User Profile</h1>
            {error && <p className="error-message">{error}</p>} 
            <div className="user-details">
                <p><strong>Customer Name:</strong> {userProfile.customerName}</p>
                <p><strong>Customer ID:</strong> {userProfile.customerId}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Aadhar Number:</strong> {userProfile.aadharNumber}</p>
                <p><strong>Date-of-Birth:</strong> {userProfile.dateOfBirth}</p>
                <p><strong>Mobile Number:</strong> {userProfile.mobileNumber}</p>
                <p><strong>Address:</strong> {userProfile.address}</p>
            </div>
        </div>
        </>
    );
};

export default CustomerProfile;
