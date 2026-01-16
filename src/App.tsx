// frontend/src/App.tsx

import React, { PropsWithChildren } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// --- Private Route Component ---
// This component checks if a token exists before allowing access
const PrivateRoute: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    // Check for the token in local storage
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('authToken');
    
    // If authenticated, render the children (the requested page)
    if (isAuthenticated) {
        return <>{children}</>;
    }
    
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Login Page: Accessible to everyone at the root path */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* 2. Dashboard Page: Protected route */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    } 
                />
                
                {/* 3. Catch-all for 404s */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
