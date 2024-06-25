import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../../Login/Context/UserContext';
import './UploadKYC.css'

const UploadKYC = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [authorizationChecked, setAuthorizationChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const {email} =useUser();

  const generateUniqueId = () => {
    return Date.now();
  };

  const handleFileUpload = async (file, fileType) => {
   
    return data.employmentDetails.incomeProofFilePath;
  };

  const handleSubmit = async () => {
    let validationErrors = {};

    if (!aadhaarFile) validationErrors.aadhaarFile = 'Aadhaar Card is required';
    if (!panFile) validationErrors.panFile = 'Pan Card is required';
    if (!signatureFile) validationErrors.signatureFile = 'Signature is required';
    if (!photoFile) validationErrors.photoFile = 'Photo is required';
    if (!authorizationChecked) validationErrors.authorizationChecked = 'You must authorize the use of your KYC details';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await handleFileUpload(aadhaarFile, 'aadhaar');
      await handleFileUpload(panFile, 'pan');
      await handleFileUpload(signatureFile, 'signature');
      await handleFileUpload(photoFile, 'photo');

      const applicationId = generateUniqueId();
      const requestData = {
      
        applicationId: applicationId,
        mobileNumber: data.personalDetails.mobileNumber,
        name: data.personalDetails.name,
        panId: data.personalDetails.panId,
        aadhaarNumber: data.personalDetails.aadhaarNumber,
        address: data.personalDetails.address,
        dob: data.personalDetails.dob,
        employmentYears: data.employmentDetails.employmentYears,
        companyName: data.employmentDetails.companyName,
        annualIncome: data.employmentDetails.annualIncome,
        incomeProofFilePath: data.employmentDetails.incomeProofFilePath,
        cardType: data.selectedCard,
        applicationStatus: 'PENDING',
        aadhaarFilePath: `${data.personalDetails.aadhaarNumber}_${Date.now()}_aadhaar.${aadhaarFile.name.split('.').pop()}`,
        panFilePath: `${data.personalDetails.aadhaarNumber}_${Date.now()}_pan.${panFile.name.split('.').pop()}`,
        signatureFilePath: `${data.personalDetails.aadhaarNumber}_${Date.now()}_signature.${signatureFile.name.split('.').pop()}`,
        photoFilePath: `${data.personalDetails.aadhaarNumber}_${Date.now()}_photo.${photoFile.name.split('.').pop()}`
      };

      console.log('Making API call with data:', requestData);

      const guestId = data.personalDetails.email; 
      const response = await axios.put(`http://localhost:3551/guest/update/${email}`, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);
      setData({
        ...data,
        application: {
          applicationId: applicationId,
          applicationStatus: 'PENDING',
          name: data.personalDetails.name,
          cardType: data.selectedCard
        }
      });
      toast.info(`Thank you for the Application. Redirecting to track application.......`, {
        onClose: () => navigate('/guest-track-application', {
          state: {
            userName: data.personalDetails.name,
            cardType: data.selectedCard,
            applicationStatus: 'PENDING',
            applicationId: applicationId
          }
        }),
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Error uploading KYC documents:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      setErrors({ ...errors, apiError: 'Failed to upload KYC documents' });
    }
  };

  return (
    <div className="upload-kyc-container">
      <div className="upload-kyc-header">
        <h1 className="bold-text">Thanks For Applying!</h1>
        <p className="italic-text">Kindly upload your documents for KYC</p>
      </div>
      <div className="upload-kyc-section">
        <div className="upload-kyc-boxes">
          <h2>Upload KYC Documents</h2>
          <p className="italic-text">Please provide the necessary documents to complete your KYC verification.</p>
          <div className="upload-kyc-grid">
            <div className="upload-kyc-box">
              <label htmlFor="aadhaarCard">Upload Aadhaar Card<span style={{ color: 'red' }}>*</span></label>
              <input type="file" id="aadhaarCard" onChange={(e) => setAadhaarFile(e.target.files[0])} required />
              {errors.aadhaarFile && <p className="error-text">{errors.aadhaarFile}</p>}
            </div>
            <div className="upload-kyc-box">
              <label htmlFor="panCard">Upload Pan Card<span style={{ color: 'red' }}>*</span></label>
              <input type="file" id="panCard" onChange={(e) => setPanFile(e.target.files[0])} required />
              {errors.panFile && <p className="error-text">{errors.panFile}</p>}
            </div>
            <div className="upload-kyc-box">
              <label htmlFor="signature">Upload Signature<span style={{ color: 'red' }}>*</span></label>
              <input type="file" id="signature" onChange={(e) => setSignatureFile(e.target.files[0])} required />
              {errors.signatureFile && <p className="error-text">{errors.signatureFile}</p>}
            </div>
            <div className="upload-kyc-box">
              <label htmlFor="photo">Upload Photo<span style={{ color: 'red' }}>*</span></label>
              <input type="file" id="photo" onChange={(e) => setPhotoFile(e.target.files[0])} required />
              {errors.photoFile && <p className="error-text">{errors.photoFile}</p>}
            </div>
          </div>
        </div>
        <div className="authorization">
          <input type="checkbox" id="authorization" onChange={(e) => setAuthorizationChecked(e.target.checked)} required />
          <label htmlFor="authorization">I hereby authorize to utilize my KYC details for the creation of a new bank account</label>
          {errors.authorizationChecked && <p className="error-text">{errors.authorizationChecked}</p>}
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadKYC;

