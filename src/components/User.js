import React, { useEffect, useState } from 'react';

const User = () => {
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/user'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
            } catch (error) {
                setError(error); // Set the error state if fetching fails
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Render loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render error state
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Render user data
    return 

};

export default User;