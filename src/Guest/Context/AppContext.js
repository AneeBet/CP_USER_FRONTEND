import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
const [data, setData] = useState({
personalDetails: {
mobileNumber: '',
name: '',
panId: '',
aadhaarNumber: '',
address: '',
dob: '',
},
employmentDetails: {
employmentYears: '',
companyName: '',
annualIncome: '',
incomeProofFilePath: ''
},
selectedCard: '',
application: {
applicationId: '',
status: '',
userName: '',
cardType: ''
}
});

return (
<AppContext.Provider value={{ data, setData }}>
{children}
</AppContext.Provider>
);
};

