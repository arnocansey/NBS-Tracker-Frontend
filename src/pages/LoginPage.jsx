// frontend/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Use React Router's Link

const API_BASE_URL = 'http://localhost:3000/api/v1';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            const { token, user } = response.data;
            
            // --- Crucial Step: Store the JWT securely ---
            // Storing in localStorage is acceptable for an MVP/testing environment.
            // For production, consider using HttpOnly cookies for better security.
            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', user.role); 

            console.log(`User ${user.username} logged in successfully.`);

            // Redirect the user to the main dashboard page
            navigate('/dashboard'); 

        } catch (err) {
            console.error('Login failed:', err);
            // Display friendly error message
            setError(err.response?.data?.error || 'Login failed. Check server connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-indigo-800">No Bed Syndrome Tracker Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    
                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <p className="text-sm font-medium text-red-600">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                    <Link to="/forgot-password" title="Reset Password" className="text-sm text-indigo-600 hover:underline block">
                        Forgot password?
                    </Link>
                    <Link to="/signup" className="text-blue-600 font-bold">
                        Register New Account
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;