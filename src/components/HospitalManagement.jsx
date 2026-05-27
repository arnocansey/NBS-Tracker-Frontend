import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/axiosConfig';

const emptyForm = {
    name: '',
    location: '',
    phone: '',
    lat: '',
    lng: '',
};

const HospitalManagement = () => {
    const [hospitals, setHospitals] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [message, setMessage] = useState('');

    const loadHospitals = async () => {
        try {
            const res = await apiClient.get('/hospitals');
            setHospitals(res.data);
        } catch {
            setHospitals([]);
        }
    };

    useEffect(() => {
        loadHospitals();
    }, []);

    const createHospital = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await apiClient.post('/hospitals', {
                ...form,
                lat: form.lat ? Number(form.lat) : null,
                lng: form.lng ? Number(form.lng) : null,
            });
            setForm(emptyForm);
            setMessage('Hospital added.');
            loadHospitals();
        } catch (err) {
            setMessage(err.response?.data?.error || 'Could not add hospital.');
        }
    };

    const deleteHospital = async (id) => {
        if (!window.confirm('Delete this hospital? Beds must be moved first.')) return;
        try {
            await apiClient.delete(`/hospitals/${id}`);
            loadHospitals();
        } catch (err) {
            alert(err.response?.data?.error || 'Could not delete hospital.');
        }
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 mt-10">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">Hospital Management</h2>
            {message && <div className="mb-4 text-sm font-bold text-indigo-700 bg-indigo-50 p-3 rounded-lg">{message}</div>}

            <form onSubmit={createHospital} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                <input required placeholder="Hospital name" className="border p-2 rounded-lg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input required placeholder="Location" className="border p-2 rounded-lg" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <input placeholder="Phone" className="border p-2 rounded-lg" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input placeholder="Lat" className="border p-2 rounded-lg" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} />
                <div className="flex gap-2">
                    <input placeholder="Lng" className="border p-2 rounded-lg min-w-0 flex-1" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} />
                    <button className="bg-indigo-600 text-white px-4 rounded-lg font-bold">Add</button>
                </div>
            </form>

            <div className="divide-y divide-slate-100">
                {hospitals.map((hospital) => (
                    <div key={hospital.id} className="py-3 flex items-center justify-between gap-3">
                        <div>
                            <p className="font-black text-slate-800">{hospital.name}</p>
                            <p className="text-xs text-slate-500">{hospital.location} {hospital.phone ? `- ${hospital.phone}` : ''}</p>
                        </div>
                        <button onClick={() => deleteHospital(hospital.id)} className="text-xs font-bold text-rose-600 hover:underline">Delete</button>
                    </div>
                ))}
                {hospitals.length === 0 && <p className="text-sm text-slate-400 py-4">No hospitals found.</p>}
            </div>
        </section>
    );
};

export default HospitalManagement;
