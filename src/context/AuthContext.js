import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null); // State to store user data

    // Check for existing user token in localStorage on initial load
    useEffect(() => {
        const storedUser  = localStorage.getItem('user');
        if (storedUser ) {
            setUser (JSON.parse(storedUser )); // Restore user from localStorage
        }
    }, []);

    const login = (userData) => {
        setUser (userData); // Set user data on login
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user data in localStorage
    };

    const logout = () => {
        setUser (null); // Clear user data on logout
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};