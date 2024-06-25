import React, { useState, useEffect } from 'react';
import './CustomerDashboard.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { useUser } from '../../Login/Context/UserContext';
import 'react-circular-progressbar/dist/styles.css';
import CreditCard2 from '../../Design/CreditCard2';
import CustomerNavbar from '../CustomerNavbar/CustomerNavbar';
import axios from 'axios';
 
const CustomerDashboard = () => {
  const [percentage, setPercentage] = useState(0); 
  const [customerName, setCustomerName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [maxLimit, setMaxLimit] = useState(0);
  const [cardBalance, setCardBalance] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const { customerId } = useUser();
  const [cardType, setCardType] = useState('Silver');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3552/customer/readallactive/${customerId}`);
        const accountNumber = response.data[0];
 
        const dashboardResponse = await axios.post('http://localhost:3552/customer/dashboard', {
          accountNumber: accountNumber
        });
 
        const data = dashboardResponse.data;
 
        setCustomerName(data.name);
        setExpiryDate(data.expiryDate);
        setCardNumber(data.cardNumber);
        setMaxLimit(data.maxlimit);
        setCardBalance(data.cardBalance);
        setDueAmount(data.dueAmount);
        setDueDate(data.dueDate);
        setTransactions(data.transactionList);
        setCardType(data.creditCard);
        setPercentage((data.cardBalance * 100) / data.maxlimit);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [customerId]);
 
  return (
<>
<CustomerNavbar />
<div className="dashboard-container">
<div className="dashboard-row">
<div className="tile credit-card-tile" id="1">
<CreditCard2
              cardType={cardType}
              cardName="CREDIT"
              customerName={customerName}
              expiryDate={expiryDate}
              cardNumber={cardNumber}
            />
</div>
 
          <div className="tile spending-limit-tile">
<div className="tile-header"></div>
<div className="spending-info">
<h2>Spending Limit:</h2>
<p className="limit-amount">Rs {maxLimit}</p>
<button className="edit-button">Edit Limits</button>
</div>
<div className="donut-chart-container">
<div className="circular-progressbar-wrapper">
<p className="available-text">Available Rs. {maxLimit - cardBalance}</p>
<CircularProgressbar
                  value={percentage}
                  styles={buildStyles({
                    pathColor: `#000000`,
                    textColor: '#000',
                    trailColor: '#a5a5a5',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    reverse: false, 
                  })}
                  strokeWidth={20}
                />
</div>
</div>
</div>
</div>
 
        <div className="dashboard-row">
<div className="tile due-date-tile">
<div className="tile-header">

</div>
<div className="tile-content">
<FaCalendarAlt className="icon" />
<div className="due-date">
<h2>Due Date</h2>
<p>{dueDate}</p>
</div>
<div className="due-amount">
<FaRupeeSign className="icon" style={{ marginRight: '8px' }} />
<div>
<h2>Due Amount</h2>
<p>Rs. {dueAmount}</p>
</div>
</div>
</div>
</div>
 
          <div className="tile transactions-tile">
<div className="tile-header"></div>
<div className="tile-content-transaction">
<div className="tile-header-transaction">Transactions</div>
<div className="transactions-table-wrapper">
<table className="transactions-table">
<thead>
<tr>
<th>Transaction Date</th>
<th>Amount</th>
<th>Description</th>
<th>Type</th>
<th>Balance</th>
</tr>
</thead>
<tbody>
                    {transactions.map((transaction) => (
<tr key={transaction.transactionId}>
<td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
<td>Rs {transaction.amount}</td>
<td>{transaction.description}</td>
<td>{transaction.transactionType}</td>
<td>{transaction.amount}</td>
</tr>
                    ))}
</tbody>
</table>

</div>
</div>
</div>
</div>
</div>
</>
  );
};
 
export default CustomerDashboard;

 
 
 
 