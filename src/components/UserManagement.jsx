import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/axiosConfig';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [updatingUser, setUpdatingUser] = useState('');

    const loadUsers = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await apiClient.get('/auth/users');
            setUsers(res.data);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Could not load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const updateRole = async (username, role) => {
        setUpdatingUser(username);
        setMessage('');
        try {
            await apiClient.patch(`/auth/users/${encodeURIComponent(username)}/role`, { role });
            setMessage(`${username} is now ${role}.`);
            await loadUsers();
        } catch (err) {
            setMessage(err.response?.data?.error || 'Could not update role.');
        } finally {
            setUpdatingUser('');
        }
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-10">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">User Management</h2>
                    <p className="text-sm text-slate-500">Assign staff or admin access for registered users.</p>
                </div>
                <button
                    onClick={loadUsers}
                    className="text-xs font-black uppercase text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100"
                >
                    Refresh
                </button>
            </div>

            {message && (
                <div className="mb-4 text-sm font-bold text-indigo-700 bg-indigo-50 p-3 rounded-lg">
                    {message}
                </div>
            )}

            {loading ? (
                <div className="py-8 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Loading users...
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Username</th>
                                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Role</th>
                                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Change Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => {
                                const username = user.username;
                                const role = user.user_role || user.role || 'STAFF';
                                return (
                                    <tr key={user.user_id || username} className="hover:bg-slate-50/70">
                                        <td className="px-4 py-3 font-bold text-slate-800">{username}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase ${
                                                role === 'ADMIN' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={role}
                                                disabled={updatingUser === username}
                                                onChange={(e) => updateRole(username, e.target.value)}
                                                className="bg-slate-100 border-none rounded-lg px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                                            >
                                                <option value="STAFF">Staff</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className="py-8 text-center text-sm text-slate-400">
                            No users found.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default UserManagement;
