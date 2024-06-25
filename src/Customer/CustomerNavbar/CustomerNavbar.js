import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './CustomerNavbar.css';

const CustomerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.className = 'light-theme';
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleTheme = () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.className = 'dark-theme';
    } else {
      document.body.className = 'light-theme';
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="customer_navbar">
      <div className="burger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Link to="/dashboard">Home</Link>
      <Link to="/accountsnservices/profile">Accounts & Services</Link>
      <Link to="/managecards/additionalcard">Manage Cards</Link>
      <Link to="/otherservices/customer-registergrievance">Other Services</Link>
      <a href="#">Offers</a>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle Theme
      </button>
      <div className="profile-button" ref={dropdownRef} onClick={toggleDropdown}>
        <FaUserCircle size={24} />
        {isOpen && (
          <div className="dropdown-menu">
            <Link to="/accountsnservices/profile">View Profile</Link>
            <Link to="/">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

  

export default CustomerNavbar;