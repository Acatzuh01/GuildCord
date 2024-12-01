import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to provide context to the component
import UserProfile from '../components/UserProfile'; // Import the UserProfile component

// Test case to check if the user profile renders correctly
test('renders user profile', () => {
    const mockUser  = { name: 'John Doe', email: 'john@example.com' }; // Mock user data
    render(
        <AuthContext.Provider value={{ user: mockUser  }}> {/* Provide mock user data */}
            <User Profile />
        </AuthContext.Provider>
    );

    expect(screen.getByText(/user profile/i)).toBeInTheDocument(); // Check for user profile heading
    expect(screen.getByText(/john doe/i)).toBeInTheDocument(); // Check if the user's name is displayed
});