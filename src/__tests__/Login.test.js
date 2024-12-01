import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to provide context to the component
import Login from '../components/Login'; // Import the Login component

// Test case to check if the login form renders correctly
test('renders login form', () => {
    render(
        <AuthContext.Provider value={{ login: jest.fn() }}> {/* Provide a mock login function */}
            <Login />
        </AuthContext.Provider>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument(); // Check for email input
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument(); // Check for password input
});

// Test case to check error message display on failed login
test('displays error message on failed login', async () => {
    render(
        <AuthContext.Provider value={{ login: jest.fn() }}>
            <Login />
        </AuthContext.Provider>
    );

    // Simulate user input for email and password
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
    
    // Simulate form submission
    fireEvent.click(screen.getByText(/login/i));

    // Check if the error message is displayed
    const errorMessage = await screen.findByText(/login failed/i);
    expect(errorMessage).toBeInTheDocument(); // Ensure the error message is in the document
});