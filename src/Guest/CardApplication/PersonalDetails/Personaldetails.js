
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { useUser } from '../../../Login/Context/UserContext';
import './PersonalDetails.css'

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);
  const {guestName}=useUser();

  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    address: '',
    mobileNumber: '',
    aadhaarNumber: '',
    panId: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data.personalDetails) {
      setPersonalDetails(data.personalDetails);
    }
  }, [data.personalDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!personalDetails.name) newErrors.name = 'Name is required';
    if (!personalDetails.address) newErrors.address = 'Address is required';
    if (!personalDetails.mobileNumber.match(/^\d{10}$/)) newErrors.mobileNumber = 'Mobile number must be 10 digits';
    if (!personalDetails.aadhaarNumber.match(/^\d{12}$/)) newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
    if (!personalDetails.panId.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.panId = 'Invalid PAN number format';
    if (!personalDetails.dob) newErrors.dob = 'Date of Birth is required';

    return newErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setData({ ...data, personalDetails });
    navigate('/apply/employment-details');
  };

  return (
    <div className="personal-details">
      <h2>Enter Your Personal Details</h2>
      <form onSubmit={handleNext}>
        <div className="form-row">
          <div className="form-group">
            <label>Enter Your Full Name<span style={{ color: 'red' }}>*</span></label>
            <input 
              type="text" 
              name="name" 
              value={personalDetails.name} 
              onChange={handleChange} 
              placeholder="Full Name" 
              required 
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Enter Your Address<span style={{ color: 'red' }}>*</span></label>
            <input 
              type="text" 
              name="address" 
              value={personalDetails.address} 
              onChange={handleChange} 
              placeholder="Address" 
              required 
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Enter Your Mobile Number<span style={{ color: 'red' }}>*</span></label>
            <input 
              type="text" 
              name="mobileNumber" 
              value={personalDetails.mobileNumber} 
              onChange={handleChange} 
              placeholder="Mobile Number" 
              required 
            />
            {errors.mobileNumber && <p className="error-text">{errors.mobileNumber}</p>}
          </div>
          <div className="form-group">
            <label>Enter Your Aadhaar Number<span style={{ color: 'red' }}>*</span></label>
            <input 
              type="text" 
              name="aadhaarNumber" 
              value={personalDetails.aadhaarNumber} 
              onChange={handleChange} 
              placeholder="Aadhaar Number" 
              required 
            />
            {errors.aadhaarNumber && <p className="error-text">{errors.aadhaarNumber}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Enter Your Pan Number<span style={{ color: 'red' }}>*</span></label>
            <input 
              type="text" 
              name="panId" 
              value={personalDetails.panId} 
              onChange={handleChange} 
              placeholder="Pan Number" 
              required 
            />
            {errors.panId && <p className="error-text">{errors.panId}</p>}
          </div>
          <div className="form-group">
            <label>Enter Your DOB<span style={{ color: 'red' }}>*</span></label>
            <input 
              type="date" 
              name="dob" 
              value={personalDetails.dob} 
              onChange={handleChange} 
              placeholder="DOB" 
              required 
            />
            {errors.dob && <p className="error-text">{errors.dob}</p>}
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/apply')}>Back</button>
          <button type="submit">Save & Next</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
