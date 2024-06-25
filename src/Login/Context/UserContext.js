import React, { createContext, useContext, useState ,useEffect} from 'react';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [guestName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [UserLogged, setUserLogged]=useState(false);
  const [ActiveAccounts, setActiveAccounts] = useState([]);

  return (
    <UserContext.Provider value={{ guestName, setName, email, setEmail, userType, setUserType, customerId, setCustomerId,  UserLogged, setUserLogged, ActiveAccounts, setActiveAccounts}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);