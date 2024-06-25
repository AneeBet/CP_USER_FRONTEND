import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideMenuManageCards() {
    const location = useLocation();

    return (
        
        <div>
            <ul>
                <li>
                    <Link className={location.pathname === "/additionalcard" ? "active" : ""} to="additionalcard">Additional Card</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/changepin" ? "active" : ""} to="changepin">Change PIN</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/closeaccount" ? "active" : ""} to="closeaccount">Close Account</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/disablepayments" ? "active" : ""} to="disablepayments">Disable Payments</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/duepayments" ? "active" : ""} to="duepayments">Due Payments</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/edittransactionlimit" ? "active" : ""} to="edittransactionlimit">Edit Transaction Limit</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/upgradecard" ? "active" : ""} to="upgradecard">Upgrade Card</Link>
                </li>
                <li>
                    <Link className={location.pathname === "/trackapplication" ? "active" : ""} to="trackapplication">Track Application</Link>
                </li>
            </ul>
        </div>
       
    );
}

export default SideMenuManageCards;
