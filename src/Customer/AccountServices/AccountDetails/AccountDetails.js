


import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext'; 
import './AccountDetails.css'

function AccountDetails() {
    const [accounts, setAccounts] = useState([]);  
    const [selectedAccountNumber, setSelectedAccountNumber] = useState('');
    const [error, setError] = useState(''); 
    const { customerId } = useUser(); 

    const navigate=useNavigate();

   
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`http://localhost:3552/customer/readall/${customerId}`);
                setAccounts(response.data);
                if (response.data.length > 0) {
                    setSelectedAccountNumber(response.data[0].accountNumber.toString());  
                }
                setError('');   
            } catch (error) {
                console.error('Failed to fetch account details:', error);
                setError('Failed to fetch account details');
            }
        };
        fetchAccounts();
    }, [customerId]);

    const handleAccountChange = (event) => {
        setSelectedAccountNumber(event.target.value);
    };

    const goToManage=()=>{
        navigate('/managecards/changepin')
    }

    
    const selectedAccount = accounts.find(acc => acc.accountNumber.toString() === selectedAccountNumber) || {};

    return (
        <div className="customer-account-details-container">
            <div className="account-selector">
                <label htmlFor="account-select">Select Account</label>
                <select id="account-select" value={selectedAccountNumber} onChange={handleAccountChange}>
                    {accounts.map((account) => (
                        <option key={account.accountNumber} value={account.accountNumber}>
                            {account.accountNumber}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="error-message">{error}</p>} 
            <div className="customeraccount-card-details">
                <h2>Card Details</h2>
                {selectedAccount.cardNumber ? (
                    <>
                        <div className="detail"><strong>Card No.:</strong> {selectedAccount.cardNumber}</div>
                        <div className="detail"><strong>Status:</strong> {selectedAccount.cardStatus}</div>
                        <div className="detail"><strong>Card Type:</strong> {selectedAccount.creditCard}</div>
                        <div className="detail"><strong>Maximum Limit:</strong> {selectedAccount.cardSwipeLimit}</div>
                        <div className="detail"><strong>Opening Date:</strong> {selectedAccount.openingDate}</div>
                        <div className="detail"><strong>Expiry Date:</strong> {selectedAccount.expiryDate}</div>
                        <div className="detail"><strong>Due Amount:</strong> {selectedAccount.dueAmount}</div>
                        <div className="detail"><strong>Due Date:</strong> {selectedAccount.dueDate}</div>
                        <div className="detail"><strong>Account Currency:</strong> {selectedAccount.baseCurrency}</div>
                    </>
                ) : (
                    <p>No account details available.</p>
                )}
                <button onClick={goToManage}className="manage-account-btn"> Manage Account</button>
            </div>
        </div>
    );
}

export default AccountDetails;

 