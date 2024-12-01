import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage navbar visibility
    const { user, logout } = useContext(AuthContext); // Get user and logout function from context

    const toggleNavbar = () => {
        setIsOpen(!isOpen); // Toggle the navbar open/close state
    };

    return (
        <nav className="navbar">
            <div className="navbar-toggle" onClick={toggleNavbar}>
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
            <ul className={isOpen ? 'navbar-links open' : 'navbar-links'}>
                <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></li>
                <li><Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link></li>
                {user ? (
                    <>
                        <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
                        <li><button onClick={logout} className="logout-button"><i className="fas fa-sign-out-alt"></i> Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
                        <li><Link to="/signup"><i className="fas fa-user-plus"></i> Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;