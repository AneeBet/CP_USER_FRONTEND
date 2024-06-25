// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from '../../../Login/Context/UserContext';
// import './CloseAccount.css'

// const CloseAccount = () => {
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [message, setMessage] = useState('');

//   const [ActiveAccounts, setActiveAccounts] = useState([]);
//   const {customerId} =useUser();
 
//   useEffect(() => {
  
//    axios.get(`http://localhost:3552/customer/readallactive/${customerId}`)
//        .then((response) => {
         
//          console.log(response.data)
//          setActiveAccounts(response.data)
      
        
//        })
//        .catch((error) => {
    
//          const errorMessage = error.response?.data?.message || 'Error';
        
//        })
      
 
//  },[])

//   const handleCloseClick = () => {
//     if (!selectedAccount) {
//       setMessage('Please select an account.');
//       setShowModal(true);
//       return;
//     }
//     setShowConfirmationModal(true);
//   };

//   const handleConfirmDeactivate = async () => {
//     setShowConfirmationModal(false);
//     try {
//       await axios.put('http://localhost:3552/customer/update-status', {
//         accountNumber: selectedAccount,
//       });
//       setMessage('Account deactivated successfully.');
      
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Error deactivating account';
//       setMessage(errorMessage);
//     } finally {
//       setShowModal(true);
//     }
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setMessage('');
//   };

//   const handleConfirmationModalClose = () => {
//     setShowConfirmationModal(false);
//   };

//   return (
//     <div className="close_account_container">
//       <h4>CLOSE ACCOUNT</h4>
//       <select 
//         className="close_account_select" 
//         value={selectedAccount} 
//         onChange={(e) => setSelectedAccount(e.target.value)}
//       >
//         <option value="">Select Account</option>
//         {ActiveAccounts.map((account) => (
//           <option key={account} value={account}>{account}</option>
//         ))}
//       </select>

//       <div className="close_account_button-container">
//         <button 
//           className="close_account_button" 
//           onClick={handleCloseClick}
//         >
//           Confirm
//         </button>
//       </div>

//       {showConfirmationModal && (
//         <div className="modalOverlay">
//           <div className="modalContent">
//             <h2>Confirm Deactivation</h2>
//             <p>Are you sure you want to deactivate this account?</p>
//             <button className="close_account_button" onClick={handleConfirmDeactivate}>
//               OK
//             </button>
//             <button className="close_account_button" onClick={handleConfirmationModalClose}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showModal && (
//         <div className="modalOverlay">
//           <div className="modalContent">
//             <h2>{message}</h2>
//             <button className="close_account_button" onClick={handleModalClose}>
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CloseAccount;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './CloseAccount.css'

const CloseAccount = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [message, setMessage] = useState('');

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
  }, [selectedAccount]);

  const handleCloseClick = () => {
    if (!selectedAccount) {
      setMessage('Please select an account.');
      setShowModal(true);
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleConfirmDeactivate = async () => {
    setShowConfirmationModal(false);
    try {
      await axios.put('http://localhost:3552/customer/update-status', {
        accountNumber: selectedAccount,
      });
      setMessage('Account deactivated successfully.');
      setSelectedAccount(''); // Reset the form
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error deactivating account';
      setMessage(errorMessage);
    } finally {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setMessage('');
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="close_account_container">
      <h4>CLOSE ACCOUNT</h4>
      <select 
        className="close_account_select" 
        value={selectedAccount} 
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        <option value="">Select Account</option>
        {ActiveAccounts.map((account) => (
          <option key={account} value={account}>{account}</option>
        ))}
      </select>

      <div className="close_account_button-container">
        <button 
          className="close_account_button" 
          onClick={handleCloseClick}
        >
          Confirm
        </button>
      </div>

      {showConfirmationModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Confirm Deactivation</h2>
            <p>Are you sure you want to deactivate this account?</p>
            <button className="close_account_button" onClick={handleConfirmDeactivate}>
              OK
            </button>
            <button className="close_account_button" onClick={handleConfirmationModalClose}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{message}</h2>
            <button className="close_account_button" onClick={handleModalClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloseAccount;

