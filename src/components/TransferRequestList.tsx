import React, { useEffect, useState, useCallback } from 'react';
import { TransferRequest } from '../types/transfer';
import { apiClient } from '../api/axiosConfig';
import { getSocket } from '../api/socket';

interface Bed {
    bed_id: number;
    bed_number?: string;
    ward_name: string;
    specialty_type: string;
    current_status: string;
}

const ACTIVE_STATUSES = ['PENDING', 'APPROVED', 'IN_TRANSIT'];

const TransferRequestList: React.FC = () => {
    const [requests, setRequests] = useState<TransferRequest[]>([]);
    const [availableBeds, setAvailableBeds] = useState<Bed[]>([]);
    const [selectedBeds, setSelectedBeds] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);

    const fetchBeds = useCallback(async () => {
        try {
            const response = await apiClient.get('/beds');
            setAvailableBeds(response.data.filter((b: Bed) => b.current_status === 'AVAILABLE'));
        } catch (err) {
            console.error('Error fetching beds', err);
        }
    }, []);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await apiClient.get('/transfers');
            setRequests(res.data.filter((r: TransferRequest) => ACTIVE_STATUSES.includes(r.status || 'PENDING')));
            setLoading(false);
        } catch (err: any) {
            if (err.response?.status === 401) console.warn('Session expired in transfer list');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
        fetchBeds();

        const socket = getSocket();
        const refresh = () => {
            fetchRequests();
            fetchBeds();
        };

        socket?.on('transfers:changed', refresh);
        socket?.on('beds:changed', refresh);

        return () => {
            socket?.off('transfers:changed', refresh);
            socket?.off('beds:changed', refresh);
        };
    }, [fetchRequests, fetchBeds]);

    const handleAction = async (id: number, action: 'APPROVED' | 'REJECTED' | 'IN_TRANSIT' | 'COMPLETED') => {
        const bedId = selectedBeds[id];
        let rejectReason = '';
        let decisionNotes = '';

        if (action === 'APPROVED' && !bedId) {
            alert('Please assign a destination bed.');
            return;
        }

        if (action === 'REJECTED') {
            rejectReason = window.prompt('Reason for rejection?') || '';
            if (!rejectReason.trim()) return;
        }

        if (action === 'APPROVED') {
            decisionNotes = window.prompt('Approval note or handoff instruction (optional):') || '';
        }

        try {
            await apiClient.patch(`/transfers/${id}`, {
                new_status: action,
                assigned_bed_id: action === 'APPROVED' ? parseInt(bedId, 10) : null,
                reject_reason: rejectReason,
                decision_notes: decisionNotes,
            });
            fetchRequests();
            fetchBeds();
        } catch (err: any) {
            alert(err.response?.data?.error || `${action} failed.`);
        }
    };

    if (loading && requests.length === 0) {
        return <div className="p-10 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest">Loading Requests...</div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-6">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-sm font-black text-slate-800 tracking-tighter uppercase flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    Live Transfer Queue
                </h2>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded-full">
                    {requests.length} ACTIVE
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
                                    <div>{req.required_specialty}</div>
                                    <div className="text-[10px] text-slate-400">{req.status || 'PENDING'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        {(req.status === 'PENDING' || !req.status) && (
                                            <select
                                                className="text-[10px] font-black border-none bg-slate-100 rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
                                                value={selectedBeds[req.request_id || 0] || ''}
                                                onChange={(e) => setSelectedBeds({ ...selectedBeds, [req.request_id || 0]: e.target.value })}
                                            >
                                                <option value="">Select Bed</option>
                                                {availableBeds
                                                    .filter(b => b.specialty_type === req.required_specialty)
                                                    .map(b => (
                                                        <option key={b.bed_id} value={b.bed_id}>
                                                            {b.bed_number || `Bed ${b.bed_id}`} ({b.ward_name})
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        )}

                                        <div className="flex gap-1">
                                            {(req.status === 'PENDING' || !req.status) && (
                                                <button
                                                    onClick={() => req.request_id && handleAction(req.request_id, 'APPROVED')}
                                                    className="px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-sm text-[10px] font-black"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {(req.status === 'PENDING' || !req.status) && (
                                                <button
                                                    onClick={() => req.request_id && handleAction(req.request_id, 'REJECTED')}
                                                    className="px-3 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all text-[10px] font-black"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                            {req.status === 'APPROVED' && (
                                                <button
                                                    onClick={() => req.request_id && handleAction(req.request_id, 'IN_TRANSIT')}
                                                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-[10px] font-black"
                                                >
                                                    In Transit
                                                </button>
                                            )}
                                            {req.status === 'IN_TRANSIT' && (
                                                <button
                                                    onClick={() => req.request_id && handleAction(req.request_id, 'COMPLETED')}
                                                    className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all text-[10px] font-black"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {requests.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-3xl mb-2">Clear</div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Queue Clear - All Patients Assigned</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferRequestList;
