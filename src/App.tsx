import React, { PropsWithChildren } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
// NEW: Import the Public Discovery Component/Page
// import HospitalDiscovery from './components/HospitalDiscovery'; 
import PublicFinderPage from './pages/find-bed';
import AnalyticsPage from './pages/AnalyticsPage';

// --- Private Route Component ---
const PrivateRoute: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    if (typeof window === 'undefined') return <Navigate to="/login" />;

    const token = localStorage.getItem('authToken');

    if (!token) return <Navigate to="/login" replace />;

    try {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload.exp && typeof payload.exp === 'number') {
                const now = Math.floor(Date.now() / 1000);
                if (payload.exp < now) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    localStorage.removeItem('userRole');
                    return <Navigate to="/login" replace />;
                }
            }
        }
    } catch (e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* --- PUBLIC ROUTES (No Login Needed) --- */}
                
                {/* 1. New Discovery Route: This is where regular people go */}
                <Route path="/find-bed" element={<PublicFinderPage />} />
                
                {/* 2. Login & Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* --- PROTECTED ROUTES (Staff Only) --- */}
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
                
                {/* --- REDIRECTS --- */}
                {/* Default root now points to Discovery for the public */}
                <Route path="/" element={<Navigate to="/find-bed" />} />
                <Route path="*" element={<Navigate to="/find-bed" />} />
            </Routes>
        </Router>
    );
};

export default App;