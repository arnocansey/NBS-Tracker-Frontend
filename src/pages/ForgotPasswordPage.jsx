// frontend/src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call: axios.post('/api/v1/auth/reset-request', { username })
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Reset Password</h2>
                
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <p className="text-sm text-slate-600">Enter your username or ID to request a password reset.</p>
                        <input 
                            type="text" required
                            placeholder="Username / Staff ID"
                            className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700">
                            Send Request
                        </button>
                    </form>
                ) : (
                    <div className="text-center space-y-4">
                        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
                            Request received for <strong>{username}</strong>.
                        </div>
                        <p className="text-sm text-slate-600">
                            Please contact your **Shift Lead** or **IT Admin** to finalize your password reset.
                        </p>
                    </div>
                )}
                
                <div className="mt-6 text-center">
                    <Link to="/" className="text-indigo-600 text-sm font-medium hover:underline">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;