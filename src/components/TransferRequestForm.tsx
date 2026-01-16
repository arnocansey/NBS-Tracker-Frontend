import React, { useState } from 'react';
import axios from 'axios';
import { TransferRequest, PriorityLevel } from '../types/transfer';

// Normalize API base: allow NEXT_PUBLIC_API_URL to be either host or host+/api/v1
const _RAW_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_BASE_URL = /\/api\/v1\/?$/.test(_RAW_API) ? _RAW_API.replace(/\/$/, '') : _RAW_API.replace(/\/$/, '') + '/api/v1';
const SPECIALTIES = ['General', 'ICU', 'Pediatric', 'HDU', 'CCU', 'NICU', 'Emergency beds', 'PACU', 'PICU', 'Maternity'];
const PRIORITIES: PriorityLevel[] = ['Low', 'Medium', 'High', 'Emergency'];

const TransferRequestForm: React.FC = () => {
    const [formData, setFormData] = useState<TransferRequest>({
        patient_name: '',
        from_ward: '',
        required_specialty: 'General',
        priority: 'Medium',
        clinical_notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('authToken');
            
            // Critical check for that 401 error prevention
            if (!token) {
                setMessage({ type: 'error', text: 'Authentication missing. Please log in.' });
                return;
            }

            await axios.post(`${API_BASE_URL}/transfers`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage({ type: 'success', text: 'Transfer request logged and patient queued!' });
            
            // Reset form to original state
            setFormData({ 
                patient_name: '', 
                from_ward: '', 
                required_specialty: 'General', 
                priority: 'Medium', 
                clinical_notes: '' 
            });

        } catch (err: any) {
            if (err.response?.status === 401) {
                setMessage({ type: 'error', text: 'Session expired. Please refresh and log in.' });
            } else {
                setMessage({ type: 'error', text: 'Failed to submit request. Check connection.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">📋</span>
                <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">New Transfer</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Patient Name - Maps to patient_name in DB */}
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Patient Identity</label>
                    <input
                        type="text"
                        placeholder="Full Name or Hospital ID"
                        required
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                        value={formData.patient_name}
                        onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Source Ward</label>
                        <input
                            type="text"
                            placeholder="e.g. A&E"
                            required
                            className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            value={formData.from_ward}
                            onChange={(e) => setFormData({...formData, from_ward: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Target Specialty</label>
                        <select 
                            className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer font-bold outline-none"
                            value={formData.required_specialty}
                            onChange={(e) => setFormData({...formData, required_specialty: e.target.value})}
                        >
                            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                {/* Priority Toggle Buttons */}
                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Triage Priority</label>
                    <div className="grid grid-cols-4 gap-2">
                        {PRIORITIES.map(p => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setFormData({...formData, priority: p})}
                                className={`py-2 rounded-lg text-[10px] font-black transition-all border ${
                                    formData.priority === p 
                                    ? (p === 'Emergency' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100') 
                                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                                }`}
                            >
                                {p.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">Clinical Indication</label>
                    <textarea
                        placeholder="Reason for transfer (Handover notes)..."
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all resize-none outline-none"
                        rows={3}
                        value={formData.clinical_notes}
                        onChange={(e) => setFormData({...formData, clinical_notes: e.target.value})}
                    />
                </div>

                {message && (
                    <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${
                        message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                        <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-950 text-white py-4 rounded-xl font-black text-xs tracking-widest hover:bg-indigo-900 disabled:bg-slate-300 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100/50"
                >
                    {isSubmitting ? 'PROCESSING...' : 'DISPATCH REQUEST'}
                </button>
            </form>
        </div>
    );
};

export default TransferRequestForm;