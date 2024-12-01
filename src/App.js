import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/Profile'; // Corrected import for UserProfile
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <User Profile /> {/* Corrected here */}
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;