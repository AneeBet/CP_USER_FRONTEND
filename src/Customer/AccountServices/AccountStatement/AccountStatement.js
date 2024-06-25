

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useUser } from '../../../Login/Context/UserContext'; 
import './AccountStatement.css'

function AccountStatement() {
    const [transactions, setTransactions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transactionType, setTransactionType] = useState("All");
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountNumber, setSelectedAccountNumber] = useState('None');
    const [error, setError] = useState(''); 
    const { customerId } = useUser(); 

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const response = await axios.get(`http://localhost:3552/customer/readall/${customerId}`);
                setAccounts(response.data);
                
                setError(''); 
            } catch (error) {
                console.error('Failed to fetch account details:', error);
                setError('Failed to fetch account details');
            }
        }
        fetchAccounts();
    }, [customerId]);

    useEffect(() => {
        if (selectedAccountNumber !== 'None') {
            fetchTransactions();
        } else {
            setTransactions([]);
        }
    }, [selectedAccountNumber, transactionType, startDate, endDate]);

    async function fetchTransactions() {
        const data = {
            startDate,
            endDate,
            transactionType,
            accountNumber: selectedAccountNumber
        };
        try {
            const response = await axios.post('http://localhost:3552/customer/transaction/readall', data);
            
            setTransactions(response.data);
            setError(''); 
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            setError('Failed to fetch transactions');
        }
    }

    function handleDateChange(e, type) {
        type === 'start' ? setStartDate(e.target.value) : setEndDate(e.target.value);
    }

    const downloadPDF = () => {
        const doc = new jsPDF();

        
        doc.setFont('helvetica');
        doc.setFontSize(10); 

        
        const selectedAccount = accounts.find(account => account.accountNumber.toString() === selectedAccountNumber);

        if (selectedAccount) {
            
            doc.setFontSize(14); 
            doc.setFont("helvetica", "bold");
            doc.text('Account Details:', 14, 20);
            doc.setFontSize(10); 
            doc.setFont("helvetica", "normal");

          
            const details = [
                { label: 'Account Number', value: selectedAccount.accountNumber },
                { label: 'Card Number', value: selectedAccount.cardNumber },
                { label: 'Status', value: selectedAccount.activationStatus },
                { label: 'Card Status', value: selectedAccount.cardStatus },
                { label: 'Base Currency', value: selectedAccount.baseCurrency },
                { label: 'Opening Date', value: selectedAccount.openingDate ? new Date(selectedAccount.openingDate).toLocaleDateString() : 'N/A' },
                { label: 'Expiry Date', value: selectedAccount.expiryDate ? new Date(selectedAccount.expiryDate).toLocaleDateString() : 'N/A' },
                { label: 'Card Balance', value: `Rs.${selectedAccount.cardBalance?.toFixed(2)}` },
                { label: 'Due Amount', value: `Rs.${selectedAccount.dueAmount?.toFixed(2)}` },
                { label: 'Due Date', value: selectedAccount.dueDate ? new Date(selectedAccount.dueDate).toLocaleDateString() : 'N/A' }
            ];

          
            details.forEach((item, index) => {
                doc.text(`${item.label}:`, 14, 30 + index * 5);
                doc.text(item.value.toString(), 70, 30 + index * 5, { align: 'left' });
            });

           
            const startY = 85 + details.length * 5;

            
            doc.setFontSize(14); 
            doc.setFont("helvetica", "bold");
            doc.text('Account Transactions', 14, startY);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            
            doc.autoTable({
                theme: 'grid',
                head: [['Transaction Date', 'Amount', 'Description', 'Type']],
                body: transactions.map(tx => [
                    new Date(tx.timestamp).toLocaleDateString(),
                    `Rs.${parseFloat(tx.amount).toFixed(2)}`,
                    tx.description,
                    tx.transactionType
                ]),
                startY: startY + 10,
            });
        } else {
            doc.text('No account details available', 14, 20);
        }

        doc.save('account_statement.pdf');
    };

    return (
        <div className="account-statement">
            <div className="statement_filters">
                <div className="statement_filter">
                    <label htmlFor="start-date">Start Date<span style={{ color: 'red' }}>*</span></label>
                    <input id="start-date" type="date" value={startDate} onChange={(e) => handleDateChange(e, 'start')} required />
                </div>
                <div className="statement_filter">
                    <label htmlFor="end-date">End Date<span style={{ color: 'red' }}>*</span></label>
                    <input id="end-date" type="date" value={endDate} onChange={(e) => handleDateChange(e, 'end')} required />
                </div>
                <div className="statement_filter">
                    <label htmlFor="account-number">Account Number<span style={{ color: 'red' }}>*</span></label>
                    <select id="account-number" value={selectedAccountNumber} onChange={(e) => setSelectedAccountNumber(e.target.value)} required>
                        <option value="None">None</option>
                        {accounts.map(account => (
                            <option key={account.accountNumber} value={account.accountNumber}>
                                {account.accountNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="statement_filter">
                    <label htmlFor="transaction-type">Transaction Type</label>
                    <select id="transaction-type" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                    </select>
                </div>
            </div>
            {error && <p className="error-message">{error}</p>} 
            <table className="statement_transactions-table22">
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                            <td>Rs. {transaction.amount}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.transactionType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="statement_download-statement">
                <button onClick={downloadPDF}>Download Statement</button>
            </div>
        </div>
    );
}

export default AccountStatement;
