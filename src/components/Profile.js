import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>User  Profile</h1>
            {user ? (
                <div style={styles.profileInfo}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Add more user details as needed */}
                    <p><strong>Joined:</strong> {user.joinedDate || 'N/A'}</p> {/* Example additional field */}
                    <button onClick={logout} style={styles.logoutButton}>Logout</button>
                </div>
            ) : (
                <p style={styles.message}>No user is logged in.</p>
            )}
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: 'auto',
        marginTop: '50px',
    },
    heading: {
        marginBottom: '20px',
    },
    profileInfo: {
        textAlign: 'left',
        width: '100%',
    },
    logoutButton: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#dc3545', // Bootstrap danger color
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    message: {
        color: 'gray',
    },
};

export default Profile;