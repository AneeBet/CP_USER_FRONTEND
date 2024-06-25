import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../Login/Context/UserContext';
import './TrackCardApplication.css'

const TrackCardApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const{customerId}=useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.post('http://localhost:3552/customer/getallcardapplications', {
          customerId: customerId 
        });
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading applications: {error.message}</p>;
  }

  return (
    <div className="my-applications-container">
      <h2 className="my-applications-title">My Applications</h2>
      {applications.length === 0 ? (
        <p className="my-applications-empty">No applications found.</p>
      ) : (
        <table className="my-applications-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Type</th>
              <th>Card Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.applicationId}>
                <td>{application.applicationId}</td>
                <td>{application.isUpgrade ? 'Upgrade' : 'Additional Card'}</td>
                <td>{application.creditCard || 'N/A'}</td>
                <td>{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      )}
   

export default TrackCardApplication;
