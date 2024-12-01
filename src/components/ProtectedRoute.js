// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // If the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the children components
    return children;
};

export default ProtectedRoute;