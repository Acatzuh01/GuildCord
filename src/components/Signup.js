import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!name || !email || !password) {
            setError('All fields are required!');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email format is invalid!');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long!');
            return;
        }

        try {
            const response = await fetch('https://your-api-endpoint/signup', { // Replace with your actual signup endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed. Please check your details.');
            }

            const data = await response.json();
            // Handle successful signup and login
            console.log('Signed up successfully:', data);
            login(data); // Assuming `data` contains the user info or token

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Signup</h1>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Signup</button>
                </form>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        textAlign: 'left',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '16px',
    },
};

export default Signup;