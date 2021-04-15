import React from 'react'
import {Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
    return (
        <div className="navbar">
           <nav>
               <ul className="navbar__list">
                   <li className="navbar__item"><Link to="/" >Portfolio Management</Link>
                   </li>
                   <li className="navbar__item"><Link to="/dashboard" >Dashboard</Link></li>
                   <li className="navbar__item"><Link to="/stockForm"  >Stock Form </Link></li>
                   <li className="navbar__item"><Link to="/stockTable"  >Your Stocks</Link></li>
                   
               </ul>
           </nav>
        </div>
    )
}
export default Navbar;
