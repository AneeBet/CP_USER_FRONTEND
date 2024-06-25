import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './DisablePayments.css'

const DisablePayments = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [message, setMessage] = useState('');
  const [paymentOptions, setPaymentOptions] = useState({
    onlinePayment: null,
    internationalPayment: null,
    cardSwipe: null,
  });

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
  

  useEffect(() => {
    if (selectedAccount) {
      fetchPaymentStatuses(selectedAccount);
    }
  }, [selectedAccount]);

  const fetchPaymentStatuses = async (accountNumber) => {
    try {
      const response = await axios.post('http://localhost:3552/customer/get-payment-statuses', {
        accountNumber: accountNumber,
      });
      setPaymentOptions({
        onlinePayment: response.data.onlinePayment === 'ENABLE',
        internationalPayment: response.data.internationalPayment === 'ENABLE',
        cardSwipe: response.data.cardSwipe === 'ENABLE',
      });
    } catch (error) {
      console.error('Error fetching payment statuses:', error);
    }
  };

  const handleButtonClick = (option) => {
    setModalContent(option);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      const newStatus = !paymentOptions[modalContent] ? 'ENABLE' : 'DISABLE';
      await axios.put('http://localhost:3552/customer/update-payment-status', {
        accountNumber: selectedAccount,
        paymentType: modalContent,
        status: newStatus,
      });
      setPaymentOptions((prev) => ({
        ...prev,
        [modalContent]: !prev[modalContent],
      }));
      setMessage('Payment status changed successfully');
    } catch (error) {
      setMessage('Error changing payment status');
      console.error('Error changing payment status:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setMessage('');
  };

  return (
    <div className="disable-payments-container">
      <h4>DISABLE PAYMENT MODES</h4>
      <select 
        className="disable-payments-select" 
        value={selectedAccount} 
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        <option value="">Select Account</option>
        {ActiveAccounts.map((account) => (
          <option key={account} value={account}>{account}</option>
        ))}
      </select>

      {selectedAccount && (
        <div className="disable-payments-card-container">
          <div className="disable-payments-card">
            <h5>Online Payments</h5>
            <p>Current Status: {paymentOptions.onlinePayment ? 'Enable' : 'Disable'}</p>
            <div className="disable-payments-button-container">
              <button 
                className="disable-payments-button" 
                onClick={() => handleButtonClick('onlinePayment')}
                disabled={paymentOptions.onlinePayment === null}
              >
                {paymentOptions.onlinePayment ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="disable-payments-card">
            <h5>International Payments</h5>
            <p>Current Status: {paymentOptions.internationalPayment ? 'Enable' : 'Disable'}</p>
            <div className="disable-payments-button-container">
              <button 
                className="disable-payments-button" 
                onClick={() => handleButtonClick('internationalPayment')}
                disabled={paymentOptions.internationalPayment === null}
              >
                {paymentOptions.internationalPayment ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="disable-payments-card">
            <h5>Card Swipe</h5>
            <p>Current Status: {paymentOptions.cardSwipe ? 'Enable' : 'Disable'}</p>
            <div className="disable-payments-button-container">
              <button 
                className="disable-payments-button" 
                onClick={() => handleButtonClick('cardSwipe')}
                disabled={paymentOptions.cardSwipe === null}
              >
                {paymentOptions.cardSwipe ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Confirmation</h2>
            <p>Are you sure you want to {paymentOptions[modalContent] ? 'disable' : 'enable'} {modalContent.replace(/([A-Z])/g, ' $1')}?</p>
            <button className="button" onClick={handleConfirm}>
              OK
            </button>
            <button className="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{message}</h2>
            <button className="button" onClick={handleModalClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisablePayments;
