import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import './EmployementDetails.css'

const EmploymentDetails = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);
  const [incomeProofFile, setIncomeProofFile] = useState(null);

  useEffect(() => {
    console.log("Data from PersonalDetails:", data.personalDetails);
  }, []);

  const [employmentDetails, setEmploymentDetails] = useState(data.employmentDetails || {
    employmentYears: '',
    annualIncome: '',
    companyName: '',
    incomeProofFilePath: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploymentDetails({ ...employmentDetails, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!employmentDetails.employmentYears) {
      newErrors.employmentYears = 'Employment years are required';
    }
    if (!employmentDetails.annualIncome) {
      newErrors.annualIncome = 'Income is required';
    }
    if (!employmentDetails.companyName) {
      newErrors.companyName = 'Company name is required';
    }
    if (!incomeProofFile) {
      newErrors.incomeProofFile = 'Income proof file is required';
    }

    return newErrors;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const fileName = await submitDoc();
      setEmploymentDetails((prevDetails) => ({
        ...prevDetails,
        incomeProofFilePath: fileName,
      }));
      setData((prevData) => ({
        ...prevData,
        employmentDetails: {
          ...employmentDetails,
          incomeProofFilePath: fileName,
        },
      }));
      console.log("Employment Details:", {
        ...employmentDetails,
        incomeProofFilePath: fileName,
      });
      navigate('/apply/choose-your-card');
    } catch (error) {
      console.error('Error during file upload:', error);
      setErrors({ ...errors, apiError: 'Failed to upload income proof file' });
    }
  };

  const handleBack = () => {
    navigate('/apply/personal-details');
  };

  const submitDoc = async () => {
    if (incomeProofFile) {
      const formData = new FormData();
      const extension = incomeProofFile.name.split('.').pop();
      const timestamp = Date.now();
      const fileName = `${data.personalDetails.aadhaarNumber}_${timestamp}_incomeProofFile.${extension}`;
    
      formData.append('file', incomeProofFile, fileName);

      try {
        const response = await axios.post('http://localhost:9900/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('IncomeProof uploaded!', response);
        alert('File uploaded successfully!');
        return fileName;
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
        throw error;
      }
    } else {
      console.error('No file selected.');
      alert('Please select a file to upload.');
      throw new Error('No file selected.');
    }
  };

  return (
    <div className="employment-details-container">
      <h2>Enter Your Employment Details</h2>
      <form className="employment-details-form" onSubmit={handleNext}>
        <div className="form-group">
          <label>Enter Your Annual Income<span style={{ color: 'red' }}>*</span></label>
          <input 
            type="text" 
            name="annualIncome" 
            value={employmentDetails.annualIncome} 
            onChange={handleChange} 
            placeholder="Enter your income" 
            required 
          />
          {errors.annualIncome && <p className="error-text">{errors.annualIncome}</p>}
        </div>
        <div className="form-group">
          <label>Enter Your Company Name<span style={{ color: 'red' }}>*</span></label>
          <input 
            type="text" 
            name="companyName" 
            value={employmentDetails.companyName} 
            onChange={handleChange} 
            placeholder="Enter your company name" 
            required 
          />
          {errors.companyName && <p className="error-text">{errors.companyName}</p>}
        </div>
        <div className="form-group">
          <label>Enter Your Employment Years<span style={{ color: 'red' }}>*</span></label>
          <input 
            type="number" 
            name="employmentYears" 
            value={employmentDetails.employmentYears} 
            onChange={handleChange} 
            placeholder="Enter your employment years" 
            required 
          />
          {errors.employmentYears && <p className="error-text">{errors.employmentYears}</p>}
        </div>
        <div className="form-group">
          <label>Upload Last 3 Months Income Proof<span style={{ color: 'red' }}>*</span></label>
          <input 
            type="file" 
            name="incomeProofFile" 
            onChange={(e) => setIncomeProofFile(e.target.files[0])}
            required 
          />
          {errors.incomeProofFile && <p className="error-text">{errors.incomeProofFile}</p>}
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleBack}>Back</button>
          <button type="submit">Save & Next</button>
        </div>
      </form>
    </div>
  );
};

export default EmploymentDetails;



