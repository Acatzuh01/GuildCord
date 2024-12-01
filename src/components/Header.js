// src/components/Header.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header>
            <h1>Welcome to Guildcord</h1>
            {user ? (
                <div>
                    <span>Welcome, {user.name}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <nav>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </nav>
            )}
        </header>
    );
};

export default Header;