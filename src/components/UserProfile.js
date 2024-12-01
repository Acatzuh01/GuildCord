// src/components/UserProfile.js
import React from 'react';

const UserProfile = ({ userData }) => {
    return (
        <div>
            <h1>User Profile</h1>
            {userData ? (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    {/* Add more user profile details here */}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default UserProfile;