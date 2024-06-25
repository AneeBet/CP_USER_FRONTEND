import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../SideMenuCSS/SideMenu.css';



function SideMenuAS() {
    const location = useLocation();

    return (
        <div>
            <ul>
                <li>
                    <Link className={location.pathname === "/accountsnservices/profile" ? "active" : ""} to="profile">Profile</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/accountsnservices/accountdetails" ? "active" : ""} to="accountdetails">Account Details</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/accountsnservices/accountstatement" ? "active" : ""} to="accountstatement">Account Statement</Link>
                </li>
                
            </ul>
        </div>
    );
}

export default SideMenuAS;
