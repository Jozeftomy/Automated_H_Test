// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const reloadPage = () => {
        console.log("hi")
    window.location.reload();
  };
  return (

    <nav className="navbar">
      <div className="navbar-container">
    
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={reloadPage}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-links">
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-links">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
