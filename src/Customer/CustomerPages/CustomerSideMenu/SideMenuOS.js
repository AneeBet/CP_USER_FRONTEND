import React from 'react';
import { Link, useLocation } from 'react-router-dom';



function SideMenuOS() {
    const location = useLocation();

    return (
        <div className='side_menu'>
            <ul>
                <li>
                    <Link className={location.pathname === "/otherservices/customer-registergrievance" ? "active" : ""} to="customer-registergrievance">Register a grievance</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/otherservices/customer-schedulecall" ? "active" : ""} to="customer-schedulecall">Schedule Call</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/otherservices/customer-feedback" ? "active" : ""} to="customer-feedback">Feedback</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/otherservices/customer-trackgrievance" ? "active" : ""} to="customer-trackgrievance">Track Grievance</Link>
                </li>
                
            </ul>
        </div>
    );
}

export default SideMenuOS;
