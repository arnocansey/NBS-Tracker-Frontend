// frontend/src/pages/SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Normalize API base (accept either host or host + /api/v1 in env)
const _RAW_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_BASE = /\/api\/v1\/?$/.test(_RAW_API) ? _RAW_API.replace(/\/$/, '') : _RAW_API.replace(/\/$/, '') + '/api/v1';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '', // New field
        role: 'STAFF'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        // 1. Client-side Validation: Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match.');
        }

        // 2. Client-side Validation: Minimum length check
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        }

        setLoading(true);

        try {
            await axios.post(`${API_BASE}/auth/signup`, {
                username: formData.username,
                password: formData.password,
                role: formData.role
            });

            // Auto-login after signup for a smoother flow
            try {
                const loginRes = await axios.post(`${API_BASE}/auth/login`, {
                    username: formData.username,
                    password: formData.password
                });
                const { token, user } = loginRes.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('userRole', user.role);
                navigate('/dashboard');
            } catch (loginErr) {
                // Signup succeeded but auto-login failed — fallback to login page
                console.warn('Auto-login failed after signup', loginErr);
                alert('Account created. Please log in.');
                navigate('/');
            }

        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Staff Registration</h1>
                    <p className="text-slate-500 mt-2">No Bed Syndrome Tracker</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-medium animate-pulse">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="e.g. jdoe_admin"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Access Level</label>
                        <select 
                            name="role"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            onChange={handleChange}
                        >
                            <option value="STAFF">Clinical Staff</option>
                            <option value="ADMIN">Bed Manager / Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                            loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Processing...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-600">Already have an account? </span>
                    <Link to="/" className="text-blue-600 font-bold hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;