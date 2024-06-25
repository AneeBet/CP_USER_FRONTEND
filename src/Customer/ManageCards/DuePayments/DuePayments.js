import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInDays, isFuture, isPast } from 'date-fns';
import { useUser } from '../../../Login/Context/UserContext';
import './DuePayments.css';

const DuePayments = () => {
    const [activeAccounts, setActiveAccounts] = useState([]);
    const [account, setAccount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueAmount, setDueAmount] = useState('');
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [limitExceeded, setLimitExceeded] = useState(false);
    const [daysLeft, setDaysLeft] = useState(0);
    const [showError, setShowError] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const { customerId } = useUser();

    useEffect(() => {
        axios.get(`http://localhost:3552/customer/readallactive/${customerId}`)
            .then((response) => {
                setActiveAccounts(response.data);
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || 'Error fetching active accounts';
                console.error(errorMessage);
            });
    }, [customerId]);

    useEffect(() => {
        if (account) {
            fetchDueInfo(account);
        }
    }, [account]);

    const fetchDueInfo = async (accountNumber) => {
        try {
            const response = await axios.post('http://localhost:3552/customer/get-due-info', {
                accountNumber: accountNumber,
            });
            const formattedDate = format(new Date(response.data.dueDate), 'MMMM dd, yyyy');
            setDueDate(formattedDate);
            setDueAmount(response.data.dueAmount);
            const daysDifference = differenceInDays(new Date(response.data.dueDate), new Date());
            setDaysLeft(daysDifference);

            setLimitExceeded(daysDifference < 0);
        } catch (error) {
            console.error('Error fetching due info:', error);
        }
    };

    const handleAccountChange = (event) => {
        setAccount(event.target.value);
        setShowError(false); 
    };

    const handlePayNow = () => {
        if (!account) {
            setShowError(true); 
            return;
        }
        setShowPaymentDialog(true);
    };

    const handlePaymentDialogClose = () => {
        setShowPaymentDialog(false);
        processPayment();
    };

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
    };

    const processPayment = async () => {
        try {
            await axios.post('http://localhost:3552/customer/pay-due', {
                accountNumber: account,
            });
            setDialogMessage('Payment successful!');
            resetStates();
        } catch (error) {
            setDialogMessage('Payment failed. Please try again.');
            console.error('Error processing payment:', error);
        } finally {
            setShowConfirmDialog(true);
        }
    };

    const resetStates = () => {
        setAccount('');
        setDueDate('');
        setDueAmount('');
        setLimitExceeded(false);
        setDaysLeft(0);
        setShowError(false);
    };

    const renderDueStatus = () => {
        if (isFuture(new Date(dueDate))) {
            return <span className="no-dues">NO DUES</span>;
        } else if (isPast(new Date(dueDate))) {
            return 'OVERDUE';
        } else {
            return `DUE IN ${daysLeft} DAYS`;
        }
    };

    return (
        <div className="due-payments-container">
            <div className='for-issues'>
                <h4 htmlFor="account-select" className="due-payment-h4">DUE PAYMENT</h4>
                <select
                    id="account-select"
                    value={account}
                    onChange={handleAccountChange}
                    className="due-payments-select"
                >
                    <option value="">Select Account</option>
                    {activeAccounts.map((acc) => (
                        <option key={acc} value={acc}>{acc}</option>
                    ))}
                </select>
                {showError && <p className="error-message">Please select an account.</p>}
                <p className="due-payments-label">Due Date</p>
                <p className="due-payments-info">{dueDate}</p>
                <p className="due-payments-label">Due Amount</p>
                <p className="due-payments-info">Rs. {dueAmount}</p>
                <p className={`due-status ${limitExceeded ? 'limit-exceeded' : 'due-in-time'}`}>
                    {renderDueStatus()}
                </p>
                <button className="due-payments-button" onClick={handlePayNow}>Pay Now</button>

                {showPaymentDialog && (
                    <div className="dialogOverlay">
                        <div className="dialog">
                            <h2>Payment Gateway</h2>
                            <p>You are being redirected to the payment gateway.</p>
                            <button onClick={handlePaymentDialogClose} className="dialogButton">OK</button>
                        </div>
                    </div>
                )}

                {showConfirmDialog && (
                    <div className="dialogOverlay">
                        <div className="dialog">
                            <h2>Confirm Payment</h2>
                            <p>{dialogMessage}</p>
                            <button onClick={handleConfirmDialogClose} className="dialogButton">Confirm</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DuePayments;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format, differenceInDays } from 'date-fns';
// import { useUser } from '../../../Login/Context/UserContext';
// import './DuePayments.css';

// const DuePayments = () => {
//     const [activeAccounts, setActiveAccounts] = useState([]);
//     const [account, setAccount] = useState('');
//     const [dueDate, setDueDate] = useState('');
//     const [dueAmount, setDueAmount] = useState('');
//     const [showPaymentDialog, setShowPaymentDialog] = useState(false);
//     const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//     const [limitExceeded, setLimitExceeded] = useState(false);
//     const [daysLeft, setDaysLeft] = useState(0);
//     const [showError, setShowError] = useState(false);
//     const [dialogMessage, setDialogMessage] = useState('');

//     const { customerId } = useUser();

//     useEffect(() => {
//         axios.get(`http://localhost:3552/customer/readallactive/${customerId}`)
//             .then((response) => {
//                 setActiveAccounts(response.data);
//             })
//             .catch((error) => {
//                 const errorMessage = error.response?.data?.message || 'Error fetching active accounts';
//                 console.error(errorMessage);
//             });
//     }, [customerId]);

//     useEffect(() => {
//         if (account) {
//             fetchDueInfo(account);
//         }
//     }, [account]);

//     const fetchDueInfo = async (accountNumber) => {
//         try {
//             const response = await axios.post('http://localhost:3552/customer/get-due-info', {
//                 accountNumber: accountNumber,
//             });
//             const formattedDate = format(new Date(response.data.dueDate), 'MMMM dd, yyyy');
//             setDueDate(formattedDate);
//             setDueAmount(response.data.dueAmount);
//             const daysDifference = differenceInDays(new Date(response.data.dueDate), new Date());
//             setDaysLeft(daysDifference);

//             setLimitExceeded(daysDifference < 0);
//         } catch (error) {
//             console.error('Error fetching due info:', error);
//         }
//     };

//     const handleAccountChange = (event) => {
//         setAccount(event.target.value);
//         setShowError(false); 
//     };

//     const handlePayNow = () => {
//         if (!account) {
//             setShowError(true); 
//             return;
//         }
//         setShowPaymentDialog(true);
//     };

//     const handlePaymentDialogClose = () => {
//         setShowPaymentDialog(false);
//         processPayment();
//     };

//     const handleConfirmDialogClose = () => {
//         setShowConfirmDialog(false);
//     };

//     const processPayment = async () => {
//         try {
//             await axios.post('http://localhost:3552/customer/pay-due', {
//                 accountNumber: account,
//             });
//             setDialogMessage('Payment successful!');
//             resetStates();
//         } catch (error) {
//             setDialogMessage('Payment failed. Please try again.');
//             console.error('Error processing payment:', error);
//         } finally {
//             setShowConfirmDialog(true);
//         }
//     };

//     const resetStates = () => {
//         setAccount('');
//         setDueDate('');
//         setDueAmount('');
//         setLimitExceeded(false);
//         setDaysLeft(0);
//         setShowError(false);
//     };

//     const renderDueStatus = () => {
//         if (dueAmount === 0) {
//             return <span className="no-dues">NO DUES</span>;
//         } else if (limitExceeded) {
//             return 'LIMIT EXCEEDED!!';
//         } else {
//             return `DUE IN ${daysLeft} DAYS`;
//         }
//     };

//     return (
//         <div className="due-payments-container">
//             <div className='for-issues'>
//                 <h4 htmlFor="account-select" className="due-payment-h4">DUE PAYMENT</h4>
//                 <select
//                     id="account-select"
//                     value={account}
//                     onChange={handleAccountChange}
//                     className="due-payments-select"
//                 >
//                     <option value="">Select Account</option>
//                     {activeAccounts.map((acc) => (
//                         <option key={acc} value={acc}>{acc}</option>
//                     ))}
//                 </select>
//                 {showError && <p className="error-message">Please select an account.</p>}
//                 <p className="due-payments-label">Due Date</p>
//                 <p className="due-payments-info">{dueDate}</p>
//                 <p className="due-payments-label">Due Amount</p>
//                 <p className="due-payments-info">Rs. {dueAmount}</p>
//                 <p className={`due-status ${limitExceeded ? 'limit-exceeded' : 'due-in-time'}`}>
//                     {renderDueStatus()}
//                 </p>
                

                
//             </div>
//         </div>
//     );
// };

// export default DuePayments;



