import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import './ResetFirstPassword.css'

const ResetFirstPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setCustomerId } = useUser();
  const { customerId } = useUser();



  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3552/customer/update-password",
        {
          customerId: parseInt
          (customerId, 10),
          password: newPassword,
        }
      );
      setCustomerId(parseInt
        (customerId, 10));
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update password");
    }
  };

  return (
    <div className="reset-body-2">
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword} className="form">
        <div className="reset-form-group">
          <label htmlFor="new-password">New Password:</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="reset-form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="reset-error">{error}</p>}
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
    </div>
  );
};

export default ResetFirstPassword;
