


import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './GuestNavbar.css';
 
const GuestNavbar = () => {
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
    <nav className="guest_navbar">
      <div className="burger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
     
      <ul>
         <NavLink to="/apply">Apply</NavLink>
         <NavLink to="/guest-track-application">Track Application</NavLink>
         <NavLink to="/guest-other-services/profile">Other Services</NavLink>
         
           <button onClick={toggleTheme} className="theme-toggle-button">Toggle</button>
         
         <span><NavLink to="/"><FaUserCircle /></NavLink></span>
       </ul>
    </nav>
  );
};
 
export default GuestNavbar;