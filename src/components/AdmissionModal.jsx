// frontend/src/components/AdmissionModal.jsx
import React, { useState } from 'react';

const AdmissionModal = ({ isOpen, onClose, onConfirm, bedNumber }) => {
    const [patientName, setPatientName] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!patientName.trim()) {
            alert("Please enter a patient name.");
            return;
        }
        onConfirm(patientName);
        setPatientName(''); // Reset for next time
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
                <div className="text-center mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <span className="text-green-600 text-xl font-bold">👤</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Direct Admission</h3>
                    <p className="text-sm text-gray-500">Assigning patient to Bed {bedNumber}</p>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Patient Full Name</label>
                    <input 
                        autoFocus
                        type="text"
                        className="w-full border-2 border-gray-100 p-3 rounded-lg outline-none focus:border-green-500 transition-colors"
                        placeholder="Enter name..."
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                        Cancel
                    </button>
                    <button onClick={handleConfirm} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md">
                        Confirm Admission
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdmissionModal;