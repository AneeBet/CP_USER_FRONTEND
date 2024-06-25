

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './EditTransactionLimit.css';

const EditTransactionLimit = () => {
    const [account, setAccount] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [currentLimit, setCurrentLimit] = useState(null);
    const [newLimit, setNewLimit] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [maxLimit, setMaxLimit] = useState(0);

    const [ActiveAccounts, setActiveAccounts] = useState([]);
    const { customerId } = useUser();

    useEffect(() => {
        axios.get(`http://localhost:3552/customer/readallactive/${customerId}`)
            .then((response) => {
                console.log(response.data);
                setActiveAccounts(response.data);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || 'Error';
                console.error(errorMessage);
            });
    }, [customerId]);

    useEffect(() => {
        if (account && paymentMode) {
            fetchCurrentLimit(account, paymentMode);
        }
    }, [account, paymentMode]);

    useEffect(() => {
        if (account) {
            fetchMaxLimit(account);
        }
    }, [account, paymentMode]);

    const fetchCurrentLimit = async (accountNumber, paymentType) => {
        try {
            const response = await axios.post('http://localhost:3552/customer/get-transaction-limit', {
                accountNumber: accountNumber,
                paymentType: paymentType.toLowerCase().replace(/ /g, '')
            });
            const limit = response.data[Object.keys(response.data)[0]];
            setCurrentLimit(limit);
        } catch (error) {
            console.error('Error fetching current limit:', error);
        }
    };

    const fetchMaxLimit = async (accountNumber) => {
        try {
            const response = await axios.post('http://localhost:3552/customer/get-credit-limit', {
                accountNumber: accountNumber
            });
            setMaxLimit(parseFloat(response.data));
            console.log(maxLimit + "  " + response.data.type);
        } catch (error) {
            console.error('Error fetching max limit:', error);
        }
    };

    const handleAccountChange = (event) => {
        setAccount(event.target.value);
        setCurrentLimit(null);
        setNewLimit('');
    };

    const handlePaymentModeChange = (event) => {
        setPaymentMode(event.target.value);
    };

    const handleNewLimitChange = (event) => {
        setNewLimit(event.target.value);
    };

    const handleConfirm = () => {
        if (!account || !paymentMode || !newLimit) {
            setDialogMessage('Please fill in all fields.');
            setShowDialog(true);
            return;
        }

        if (parseFloat(newLimit) === currentLimit) {
            setDialogMessage('New limit cannot be equal to current limit.');
            setShowDialog(true);
            return;
        }

        if (maxLimit && parseFloat(newLimit) > maxLimit) {
            setDialogMessage(`New limit cannot exceed the maximum limit of Rs.${maxLimit}`);
            setShowDialog(true);
            return;
        }

        setDialogMessage('Are you sure you want to change the transaction limit?');
        setShowDialog(true);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleDialogConfirm = async () => {
        const requestBody = {
            accountNumber: account,
            paymentType: paymentMode.toLowerCase().replace(/ /g, ''),
            newLimit: parseFloat(newLimit)
        };

        console.log('Request Body:', requestBody);

        try {
            await axios.put('http://localhost:3552/customer/update-transaction-limit', requestBody);
            setDialogMessage('Transaction limit changed successfully!');
            resetForm();
        } catch (error) {
            setDialogMessage('Error updating transaction limit.');
            console.error('Error updating transaction limit:', error);
        } finally {
            setShowDialog(true);
        }
    };

    const resetForm = () => {
        setAccount('');
        setPaymentMode('');
        setCurrentLimit(null);
        setNewLimit('');
        setMaxLimit(0);
    };

    return (
        <div className="edit-limit-container">
            <label htmlFor="edit-limit-account-select" className="edit-limit-label">Select Account:</label>
            <select
                id="account-select"
                value={account}
                onChange={handleAccountChange}
                className="edit-limit-select"
            >
                <option value="">None</option>
                {ActiveAccounts.map((acc) => (
                    <option key={acc} value={acc}>{acc}</option>
                ))}
            </select>
            <label htmlFor="payment-mode-select" className="edit-limit-label">Select Payment Mode:</label>
            <select
                id="payment-mode-select"
                value={paymentMode}
                onChange={handlePaymentModeChange}
                className="edit-limit-select"
            >
                <option value="">None</option>
                <option value="Online Payment">Online Payment</option>
                <option value="International Payment">International Payment</option>
                <option value="Card Swipe Payment">Card Swipe Payment</option>
            </select>
            {currentLimit !== null && (
                <>
                    <p className="edit-limit-label">Current Limit</p>
                    <p className="edit-limit-info">Rs. {currentLimit}</p>
                </>
            )}
            <p className="edit-limit-label">New Limit <span style={{ color: 'red' }}>*</span>
                <span style={{ fontSize: '12px', color: '#999' }}>Should be less than the max limit Rs. {maxLimit}</span></p>
            <input
                type="text"
                value={newLimit}
                onChange={handleNewLimitChange}
                className="edit-limit-input"
            />
            <button className="edit-limit-button" onClick={handleConfirm}>Confirm</button>

            {showDialog && (
                <div className="dialogOverlay">
                    <div className="dialog">
                        <h2>{dialogMessage.includes('successfully') ? 'Transaction Limit Changed' : 'Error'}</h2>
                        <p>{dialogMessage}</p>
                        {dialogMessage === 'Are you sure you want to change the transaction limit?' ? (
                            <>
                                <button onClick={handleDialogConfirm} className="dialogButton">OK</button>
                                <button onClick={handleDialogClose} className="dialogButton">Cancel</button>
                            </>
                        ) : (
                            <button onClick={handleDialogClose} className="dialogButton">OK</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTransactionLimit;

