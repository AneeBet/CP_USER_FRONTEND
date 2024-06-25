
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useUser } from "../../Login/Context/UserContext";
import './GuestTrackApplication.css'

const GuestTrackApplication = () => {
  const location = useLocation();
  const { email } = useUser(); 
  const [applicationData, setApplicationData] = useState({
    userName: "",
    cardType: "",
    applicationStatus: "",
    applicationId: "",
  });

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3551/guest/track-application/${email}`
        );
        const data = response.data;
        setApplicationData({
          userName: data.name,
          cardType: data.cardType,
          applicationStatus: data.applicationStatus,
          applicationId: data.applicationId,
        });
      } catch (error) {
        console.error("Error fetching application data", error);
      }
    };

    fetchApplicationData();
  }, [email]);

  return (
    <div className="guest-track-application-container">
      <h2>Track Your Card Application</h2>
      <div className="guest-track-application-table">
        <table>
          <thead>
            <tr>
              <th>Application Id</th>
              <th>User Name</th>
              <th>Card Type</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{applicationData.applicationId}</td>
              <td>{applicationData.userName}</td>
              <td>{applicationData.cardType}</td>
              <td>{applicationData.applicationStatus}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestTrackApplication;
