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
    if (typeof window === 'undefined') return <Navigate to="/" />;

    const token = localStorage.getItem('authToken');

    // No token -> redirect to login
    if (!token) return <Navigate to="/" replace />;

    // Try to validate token expiry (if it's a JWT)
    try {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload.exp && typeof payload.exp === 'number') {
                const now = Math.floor(Date.now() / 1000);
                if (payload.exp < now) {
                    // token expired
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('userRole');
                    return <Navigate to="/" replace />;
                }
            }
        }
    } catch (e) {
        // malformed token: clear and redirect
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
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
