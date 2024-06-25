import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './ChangePin.css'
 
const ChangePin = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPinError, setCurrentPinError] = useState('');
  const [newPinError, setNewPinError] = useState('');
  const [ActiveAccounts, setActiveAccounts] = useState([]);
 const {customerId} =useUser();
 
 useEffect(() => {
 
  axios.get(`http://localhost:3552/customer/readallactive/${customerId}`)
      .then((response) => {
        
        console.log(response.data)
        setActiveAccounts(response.data)
     
       
      })
      .catch((error) => {
       
        const errorMessage = error.response?.data?.message || 'Error';
        
      })
     
 
},[])
 
  const handleConfirmClick = async () => {
    
    const pinRegex = /^\d{4}$/;
    if (!selectedAccount || !currentPin || !newPin) {
      let validationMessage = 'Please fill in the following fields:';
      if (!selectedAccount) validationMessage += ' Select Account';
      if (!currentPin) validationMessage += ' Current PIN';
      if (!newPin) validationMessage += ' New PIN';
      setMessage(validationMessage);
      setShowModal(true);
      return;
    }
 
    if (!pinRegex.test(currentPin) || !pinRegex.test(newPin)) {
      setMessage('PINs must be exactly 4 digits.');
      setShowModal(true);
      return;
    }
 
    try {
      await axios.put('http://localhost:3552/customer/update-pin', {
        accountNumber: selectedAccount,
        oldPin: parseInt(currentPin, 10),
        newPin: parseInt(newPin, 10),
      });
      setMessage('PIN changed successfully');
      setShowModal(true);
     
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setMessage(errorMessage);
      setShowModal(true);
    } finally {
      resetForm();
    }
  };
 
  const getErrorMessage = (error) => {
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.response.data;
      }
    } else if (error.request) {
      return 'No response received from the server';
    } else {
      return 'Error in setting up the request';
    }
  };
 
  const handleModalClose = () => {
    setShowModal(false);
    setMessage('');
  };
 
  const resetForm = () => {
    setSelectedAccount('');
    setCurrentPin('');
    setNewPin('');
    setCurrentPinError('');
    setNewPinError('');
  };
 
  const handlePinChange = (setter, setError) => (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setter(value);
      setError('');
    } else {
      setError('PIN can only be a four-digit number.');
    }
  };
 
  return (
    <div className="change_pin_container">
      <h4 className='change_pin_h4'>CHANGE PIN</h4>
      <select
        className="change_pin_select"
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        <option value="">Select Account</option>
        {ActiveAccounts.map((account) => (
          <option key={account} value={account}>{account}</option>
        ))}
      </select>
 
      <label className="change_pin_label" htmlFor="current-pin">Current PIN:<span style={{ color: 'red' }}>*</span></label>
      <input
        id="current-pin"
        type="password"
        className="change_pin_input"
        value={currentPin}
        onChange={handlePinChange(setCurrentPin, setCurrentPinError)}
      />
      {currentPinError && <div className="change_pin_error">{currentPinError}</div>}
 
      <label className="change_pin_label" htmlFor="new-pin">New PIN:<span style={{ color: 'red' }}>*</span></label>
      <input
        id="new-pin"
        type="password"
        className="change_pin_input"
        value={newPin}
        onChange={handlePinChange(setNewPin, setNewPinError)}
      />
      {newPinError && <div className="change_pin_error">{newPinError}</div>}
 
      <button
        className="change_pin_button"
        onClick={handleConfirmClick}
      >
        Confirm
      </button>
 
      {showModal && (
        <div className="change_pin_modalOverlay">
          <div className="change_pin_modalContent">
            <h2>{message}</h2>
            <button className="button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ChangePin;