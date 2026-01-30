import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { TransferRequest } from '../types/transfer';
import { API_BASE_URL } from '../api/axiosConfig';

interface Bed {
    bed_id: number;
    ward_name: string;
    specialty_type: string;
    current_status: string;
}

const TransferRequestList: React.FC = () => {
    const [requests, setRequests] = useState<TransferRequest[]>([]);
    const [availableBeds, setAvailableBeds] = useState<Bed[]>([]);
    const [selectedBeds, setSelectedBeds] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);

    const fetchBeds = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(`${API_BASE_URL}/beds`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAvailableBeds(response.data.filter((b: Bed) => b.current_status === 'AVAILABLE'));
        } catch (err) {
            console.error("Error fetching beds", err);
        }
    }, []);

    const fetchRequests = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        try {
            const res = await axios.get(`${API_BASE_URL}/transfers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Filter only pending requests for this list
            setRequests(res.data.filter((r: any) => r.status === 'PENDING' || !r.status));
            setLoading(false);
        } catch (err: any) {
            if (err.response?.status === 401) {
                console.warn("Session expired in List component");
            }
        }
    }, []);

    useEffect(() => {
        fetchRequests();
        fetchBeds();
        const interval = setInterval(() => {
            fetchRequests();
            fetchBeds();
        }, 15000); // Polling every 15s for "Live" feel
        return () => clearInterval(interval);
    }, [fetchRequests, fetchBeds]);

    const handleAction = async (id: number, action: 'APPROVED' | 'REJECTED') => {
        const token = localStorage.getItem('authToken');
        const bedId = selectedBeds[id];

        if (action === 'APPROVED' && !bedId) {
            alert("Please assign a destination bed.");
            return;
        }

        try {
            await axios.patch(`${API_BASE_URL}/transfers/${id}`, 
                { 
                    new_status: action,
                    assigned_bed_id: action === 'APPROVED' ? parseInt(bedId) : null 
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Instant refresh
            fetchRequests();
            fetchBeds();
        } catch (err) {
            alert(`${action} failed. Verify backend route exists.`);
        }
    };

    if (loading && requests.length === 0) return <div className="p-10 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest">Loading Requests...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-6">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-sm font-black text-slate-800 tracking-tighter uppercase flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Live Transfer Queue
                </h2>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded-full">
                    {requests.length} PENDING
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/30">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Requirement</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Deployment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {requests.map((req) => (
                            <tr key={req.request_id} className={`transition-colors ${req.priority === 'Emergency' ? 'bg-rose-50/30' : 'hover:bg-slate-50/50'}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-slate-800 uppercase">{req.patient_name}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Location: {req.from_ward}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                                        req.priority === 'Emergency' ? 'bg-rose-600 text-white animate-pulse' : 
                                        req.priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {req.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-[11px] font-bold text-slate-600 uppercase">
                                    {req.required_specialty}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                    <select 
                                        className="text-[10px] font-black border-none bg-slate-100 rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={selectedBeds[req.request_id || 0] || ""}
                                        onChange={(e) => setSelectedBeds({...selectedBeds, [req.request_id || 0]: e.target.value})}
                                    >
                                        <option value="">Select Bed</option>
                                        {availableBeds
                                            .filter(b => b.specialty_type === req.required_specialty)
                                            .map(b => (
                                                <option key={b.bed_id} value={b.bed_id}>
                                                    BED {b.bed_id} ({b.ward_name})
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => req.request_id && handleAction(req.request_id, 'APPROVED')}
                                            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-sm"
                                            title="Approve"
                                        >
                                            ✅
                                        </button>
                                        <button 
                                            onClick={() => req.request_id && handleAction(req.request_id, 'REJECTED')}
                                            className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                                            title="Reject"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {requests.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-3xl mb-2">✨</div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Queue Clear - All Patients Assigned</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferRequestList;