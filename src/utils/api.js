export const apiRequest = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error; // Rethrow the error for further handling
    }
};