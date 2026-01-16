import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// --- Default Ward Mapping ---
const WARD_MAPPING = {
    'Maternity': 'Maternity Ward',
    'ICU': 'Intensive Care Unit',
    'NICU': 'Neonatal ICU',
    'Pediatric': 'Children’s Wing',
    'Emergency beds': 'Emergency Dept',
    'General': 'General Ward'
};

const AddBedForm = ({ onBedAdded, specialties }) => {
    const [formData, setFormData] = useState({
        bed_number: '', // Added this back as it's vital for your DB
        ward_name: 'General Ward',
        specialty_type: 'General',
        current_status: 'AVAILABLE'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('authToken');

    // --- AUTO-FILL LOGIC ---
    // This runs whenever the specialty dropdown changes
    useEffect(() => {
        const defaultWard = WARD_MAPPING[formData.specialty_type];
        if (defaultWard) {
            setFormData(prev => ({ ...prev, ward_name: defaultWard }));
        }
    }, [formData.specialty_type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_BASE_URL}/beds`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("New bed registered successfully!");
            // Keep the ward and specialty but clear the number for the next entry
            setFormData({ ...formData, bed_number: '' }); 
            onBedAdded(); 
        } catch (err) {
            alert(err.response?.data?.error || "Error creating bed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <h2 className="text-xl font-bold mb-4 flex items-center text-indigo-900">
                <span className="mr-2">➕</span> Register New Bed
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Specialty Dropdown (The Trigger) */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Specialty Type</label>
                    <select 
                        className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 cursor-pointer"
                        value={formData.specialty_type}
                        onChange={(e) => setFormData({...formData, specialty_type: e.target.value})}
                    >
                        {specialties.filter(s => s !== 'All').map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 2. Bed Number */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Bed Number</label>
                        <input 
                            type="text" 
                            required
                            placeholder="e.g. B-01"
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.bed_number}
                            onChange={(e) => setFormData({...formData, bed_number: e.target.value})}
                        />
                    </div>

                    {/* 3. Ward Name (Auto-filled but editable) */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Ward Name</label>
                        <input 
                            type="text" 
                            required
                            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-500 outline-none bg-indigo-50 font-medium"
                            placeholder="Ward Name"
                            value={formData.ward_name}
                            onChange={(e) => setFormData({...formData, ward_name: e.target.value})}
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md disabled:bg-gray-400 disabled:shadow-none"
                >
                    {isSubmitting ? 'Registering...' : 'Add Bed to Inventory'}
                </button>
            </form>
        </div>
    );
};

export default AddBedForm;