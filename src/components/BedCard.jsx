import React, { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal';
import AdmissionModal from './AdmissionModal';
import BedHistory from './BedHistory';
import { apiClient } from '../api/axiosConfig';

const BedCard = ({ bedData, onStatusChange, token, userRole }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
    const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [status, setStatus] = useState(bedData.current_status);
    const bedId = bedData.bed_id;

    useEffect(() => {
        let isMounted = true;
        const fetchHistory = async () => {
            try {
                const res = await apiClient.get(`/beds/${bedId}/history`);
                if (isMounted) setHistory(res.data);
            } catch (err) { 
                // If the backend isn't ready, just set history to empty so the UI doesn't break
                if (err.response?.status === 404) {
                    console.warn("History endpoint not found on server yet.");
                    setHistory([]); 
                }
            };
        };

        fetchHistory();
        setStatus(bedData.current_status);
        
        return () => { isMounted = false; };
    }, [bedData.current_status, bedId, token]);

    // --- API HANDLERS ---

    const handleAdmission = async (patientName) => {
        try {
            await apiClient.post(`/beds/${bedId}/status`,
                { 
                    new_status: 'OCCUPIED', 
                    patient_name: patientName, // Explicitly pass name
                    performed_by: userRole 
                }
            );
            onStatusChange();
            setIsAdmissionModalOpen(false);
        } catch (error) { alert('Admission failed.'); }
    };

    const handleDischarge = async () => {
        try {
            // When discharging, we explicitly clear the patient_name in the DB
            await apiClient.post(`/beds/${bedId}/status`,
                { 
                    new_status: 'CLEANING',
                    patient_name: null // Clear the name upon discharge
                }
            );
            onStatusChange();
            setIsDischargeModalOpen(false);
        } catch (err) { alert('Discharge failed.'); }
    };

    const handleMarkClean = async () => {
        try {
            await apiClient.post(`/beds/${bedId}/status`,
                { new_status: 'AVAILABLE' }
            );
            onStatusChange();
        } catch (err) { alert('Could not mark bed clean.'); }
    };

    const handleDelete = async () => {
        try {
            await apiClient.delete(`/beds/${bedId}`);
            onStatusChange();
            setIsDeleteModalOpen(false);
        } catch (err) { alert('Delete failed. Discharge Patient First'); }
    };

    // --- UI HELPERS ---
    const isLongStay = () => {
        if (status !== 'OCCUPIED' || !bedData.admitted_at) return false;
        return (new Date() - new Date(bedData.admitted_at)) / (1000 * 60 * 60) >= 48;
    };

    const cleaningMinutes = () => {
        if (status !== 'CLEANING' || !bedData.cleaning_started_at) return null;
        return Math.max(0, Math.floor((new Date() - new Date(bedData.cleaning_started_at)) / (1000 * 60)));
    };

    const minutesCleaning = cleaningMinutes();

    const getCardStyle = () => {
        let base = "";
        switch (status) {
            case 'AVAILABLE': base = 'bg-emerald-50 text-emerald-800 border-emerald-200'; break;
            case 'OCCUPIED': base = 'bg-rose-50 text-rose-800 border-rose-200'; break;
            case 'CLEANING': base = 'bg-amber-50 text-amber-800 border-amber-200'; break;
            default: base = 'bg-gray-50 text-gray-800 border-gray-200';
        }
        if (bedData.specialty_type === 'Maternity') base += ' border-l-8 border-l-pink-400';
        if (bedData.specialty_type === 'ICU') base += ' border-l-8 border-l-indigo-600';
        if (isLongStay()) base += ' ring-2 ring-rose-500 ring-offset-2';
        return base;
    };

    return (
        <div className={`p-5 border-2 rounded-xl shadow-sm transition-all flex flex-col justify-between relative min-h-[340px] ${getCardStyle()}`}>
            
            {/* ALERT OVERLAYS */}
            {isLongStay() && (
                <div className="absolute -top-3 left-4 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-bounce z-20">
                    ⚠️ LONG STAY {'> 48 hrs'}
                </div>
            )}
            
            {userRole?.toUpperCase() === 'ADMIN' && (
                <button onClick={() => setIsDeleteModalOpen(true)} className="absolute top-3 right-3 p-2 bg-white/60 hover:bg-rose-500 hover:text-white text-rose-600 rounded-full transition-all z-30 shadow-sm border border-rose-100">
                    <span className="text-sm">🗑️</span>
                </button>
            )}

            {/* MODALS */}
            <AdmissionModal 
                isOpen={isAdmissionModalOpen} 
                onClose={() => setIsAdmissionModalOpen(false)} 
                onConfirm={handleAdmission} 
                bedNumber={bedData.bed_number} 
            />
            
            <ConfirmationModal 
                isOpen={isDischargeModalOpen} 
                onClose={() => setIsDischargeModalOpen(false)} 
                onConfirm={handleDischarge} 
                title="Confirm Discharge" 
                message={`Discharge ${bedData.patient_name || 'Patient'}? Bed will move to CLEANING.`} 
            />

            <ConfirmationModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={handleDelete} 
                title="Delete Bed" 
                message="Permanently remove this bed from inventory?" 
            />

            {/* CARD CONTENT */}
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-black text-xl text-slate-900 tracking-tight">Bed {bedData.bed_number}</h3>
                    <span className="text-[9px] uppercase font-black px-2 py-1 rounded-md border border-current">{status}</span>
                </div>
                
                <div className="text-xs space-y-1 mb-4">
                    <p><span className="text-slate-400 font-bold uppercase text-[10px]">Ward:</span> {bedData.ward_name}</p>
                    <p><span className="text-slate-400 font-bold uppercase text-[10px]">Type:</span> {bedData.specialty_type}</p>
                </div>

                {status === 'OCCUPIED' && (
                    <div className="p-3 bg-white/90 rounded-lg border border-rose-100 shadow-sm mb-4">
                        <p className="text-[9px] uppercase font-bold text-rose-500 mb-0.5 tracking-tighter">Current Patient</p>
                        <p className="text-sm font-bold text-slate-900 truncate">
                            👤 {bedData.patient_name || 'Anonymous'}
                        </p>
                    </div>
                )}

                {status === 'CLEANING' && minutesCleaning !== null && (
                    <div className={`p-3 rounded-lg border shadow-sm mb-4 ${minutesCleaning >= 30 ? 'bg-amber-100 border-amber-300' : 'bg-white/90 border-amber-100'}`}>
                        <p className="text-[9px] uppercase font-bold text-amber-700 mb-0.5 tracking-tighter">Cleaning Elapsed</p>
                        <p className="text-sm font-bold text-slate-900">
                            {minutesCleaning} min {minutesCleaning >= 30 ? '(overdue)' : ''}
                        </p>
                    </div>
                )}

                <BedHistory history={history} />
            </div>
            
            {/* ACTION BUTTONS */}
            <div className="mt-5 flex flex-col gap-2">
                {status === 'OCCUPIED' && (
                    <button className="bg-rose-600 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-rose-700 shadow-md transition-all active:scale-95" 
                        onClick={() => setIsDischargeModalOpen(true)}>Discharge</button>
                )}
                {status === 'CLEANING' && (
                    <button className="bg-amber-500 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-amber-600 shadow-md transition-all active:scale-95" 
                        onClick={handleMarkClean}>Mark Clean</button>
                )}
                {status === 'AVAILABLE' && (
                    <button className="bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-xs hover:bg-emerald-700 shadow-md transition-all active:scale-95" 
                        onClick={() => setIsAdmissionModalOpen(true)}>Admit Patient</button>
                )}
            </div>
        </div>
    );
};

export default BedCard;
