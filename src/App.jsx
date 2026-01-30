// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';

// --- Private Route Component ---
// This component checks if a token exists before allowing access
const PrivateRoute = ({ children }) => {
    // Check for the token in local storage
    const isAuthenticated = localStorage.getItem('authToken');
    
    // If authenticated, render the children (the requested page)
    if (isAuthenticated) {
        return children;
    }
    
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Login Page: Accessible to everyone at the root path */}
                <Route path="/" element={<LoginPage />} />

                {/* 2. Dashboard Page: Protected route */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    } 
                />

                {/* 3. Analytics Page: Protected route */}
                <Route 
                    path="/analytics" 
                    element={
                        <PrivateRoute>
                            <AnalyticsPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Catch-all for 404s */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router> 
    );
};

export default App;