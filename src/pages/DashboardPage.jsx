import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import BedCard from '../components/BedCard';
import TransferRequestForm from '../components/TransferRequestForm';
import TransferRequestList from '../components/TransferRequestList';
import HospitalCensus from '../components/HospitalCensus';
import AddBedForm from '../components/AddBedForm';
import Head from 'next/head';


const API_BASE_URL = 'http://localhost:3000/api/v1';

const SPECIALTY_OPTIONS = [
    'All', 'General', 'ICU', 'Pediatric', 'HDU', 
    'CCU', 'NICU', 'Emergency beds', 'PACU', 'PICU',
    'Maternity'
];

const AdminTools = ({ token }) => {
    const [targetUser, setTargetUser] = useState('');
    const [newPass, setNewPass] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleAdminReset = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/auth/admin-reset-password`, 
                { targetUsername: targetUser, newPassword: newPass },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatus({ type: 'success', msg: `Password for ${targetUser} updated successfully!` });
            setTargetUser(''); setNewPass('');
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.error || "Reset failed" });
        }
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-50 mt-10">
            <h2 className="text-xl font-bold text-red-700 mb-2 flex items-center">
                <span className="mr-2">🔐</span> Admin: Staff Password Override
            </h2>
            <p className="text-sm text-gray-500 mb-4">Manual override for staff experiencing 401 Authentication errors.</p>
            {status.msg && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status.msg}
                </div>
            )}
            <form onSubmit={handleAdminReset} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    placeholder="Exact Username" 
                    className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
                    value={targetUser} required
                    onChange={(e) => setTargetUser(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="New Secure Password" 
                    className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
                    value={newPass} required
                    onChange={(e) => setNewPass(e.target.value)}
                />
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-all shadow-md">
                    Update Credentials
                </button>
            </form>
        </section>
    );
};

const DashboardPage = () => {
    const [beds, setBeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');
    const [isOnline, setIsOnline] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                setShowSessionModal(true);
                localStorage.clear(); // Wipe the bad/expired token
            }
            return Promise.reject(error);
        }
    );

    const BED_LIMIT = 6;
    const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
    const token = localStorage.getItem('authToken');

    // --- SYSTEM MONITORING ---
    useEffect(() => {
        const checkConnection = async () => {
            try {
                await axios.get(`${API_BASE_URL}/beds`, { headers: { Authorization: `Bearer ${token}` } });
                setIsOnline(true);
            } catch { setIsOnline(false); }
        };
        const interval = setInterval(checkConnection, 15000);
        return () => clearInterval(interval);
    }, [token]);

    const fetchBedData = useCallback(async (specialty) => {
        setIsLoading(true);
        setError(null);
        try {
            let url = `${API_BASE_URL}/beds`;
            if (specialty && specialty !== 'All') url += `?specialty_type=${specialty}`;
            
            const response = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setBeds(response.data);
        } catch (err) {
            if (err.response?.status === 401) setError("Session expired. Please log in again.");
            else setError('Could not load bed data.');
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchBedData(selectedSpecialty);
        else window.location.href = '/';
    }, [selectedSpecialty, fetchBedData, token]);

    // --- COMPUTED STATS ---
    const stats = useMemo(() => ({
        total: beds.length,
        available: beds.filter(b => b.current_status === 'AVAILABLE').length,
        occupied: beds.filter(b => b.current_status === 'OCCUPIED').length,
        cleaning: beds.filter(b => b.current_status === 'CLEANING').length
    }), [beds]);

    const filteredBeds = beds.filter(bed => 
        bed.bed_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bed.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bed.ward_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const visibleBeds = showAll ? filteredBeds : filteredBeds.slice(0, BED_LIMIT);

    const exportCensusToCSV = () => {
        const occupied = beds.filter(b => b.current_status === 'OCCUPIED');
        if (occupied.length === 0) return alert("No patients to export.");

        const headers = ["Bed", "Ward", "Specialty", "Patient", "Last Update"];
        const rows = occupied.map(b => [b.bed_number, b.ward_name, b.specialty_type, b.patient_name || "N/A", new Date(b.updated_at).toLocaleString()]);
        const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Census_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    if (error) return (
        <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-red-200 text-center max-w-md w-full">
                <p className="text-red-600 font-black text-2xl mb-2">⚠️ Access Denied</p>
                <p className="text-gray-500 mb-6">{error}</p>
                <button onClick={handleLogout} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg">Return to Login</button>
            </div>
        </div>
    );

    return (
        <>
        <Head>
            <title>No Bed Syndrome Tracker</title>
            <meta name="description" content="Dashboard for monitoring hospital bed availability and patient admissions." />
        </Head>
        <div className="min-h-screen bg-slate-50">
            {/* STICKY HEADER */}
            <header className="bg-indigo-950 text-white p-4 shadow-xl flex justify-between items-center sticky top-0 z-50 border-b border-indigo-800">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
                        <span className="bg-white text-indigo-900 p-1 rounded">🏥</span> NO BED SYNDROME
                    </h1>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                        <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                            {isOnline ? 'System Live' : 'Connection Lost'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-indigo-200 uppercase">{user?.username}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-black uppercase ${user?.role === 'ADMIN' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
                            {user?.role || 'Staff'}
                        </span>
                    </div>
                    <button onClick={handleLogout} className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-xs font-black transition-all shadow-lg active:scale-95">LOGOUT</button>
                </div>
            </header>

            <main className="p-4 md:p-8 max-w-[1700px] mx-auto space-y-8">
                {/* TOP STATS CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Capacity</p>
                        <p className="text-2xl font-black text-slate-800">{stats.total}</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase">Available</p>
                        <p className="text-2xl font-black text-emerald-700">{stats.available}</p>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 shadow-sm">
                        <p className="text-[10px] font-bold text-rose-600 uppercase">Occupied</p>
                        <p className="text-2xl font-black text-rose-700">{stats.occupied}</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 shadow-sm">
                        <p className="text-[10px] font-bold text-amber-600 uppercase">Turnover/Cleaning</p>
                        <p className="text-2xl font-black text-amber-700">{stats.cleaning}</p>
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-3 text-slate-400">🔍</span>
                        <input 
                            type="text"
                            placeholder="Find Bed, Patient, or Ward..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select 
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                            className="bg-slate-50 px-4 py-3 rounded-xl border-none font-bold text-sm text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                            {SPECIALTY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <button 
                            onClick={exportCensusToCSV}
                            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 text-sm"
                        >
                            <span>📊</span> <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* LEFT CONTENT: BEDS */}
                    <div className="xl:col-span-8 space-y-8">
                        <section>
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Bed Inventory</h2>
                                    <p className="text-sm text-slate-400 font-medium">Tracking {filteredBeds.length} units in {selectedSpecialty} sector</p>
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />)}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {visibleBeds.map(bed => (
                                            <BedCard 
                                                key={bed.bed_id} 
                                                bedData={bed} 
                                                onStatusChange={() => fetchBedData(selectedSpecialty)}
                                                token={token}
                                                userRole={user?.role}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="mt-10 flex justify-center">
                                        {filteredBeds.length > BED_LIMIT && (
                                            <button 
                                                onClick={() => setShowAll(!showAll)}
                                                className="bg-white border-2 border-indigo-100 text-indigo-600 px-12 py-3 rounded-full font-black hover:bg-indigo-50 transition-all shadow-sm"
                                            >
                                                {showAll ? 'SHOW LESS' : `VIEW ALL ${filteredBeds.length} BEDS`}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </section>

                        {user?.role === 'ADMIN' && <AdminTools token={token} />}
                    </div>

                    {/* RIGHT SIDEBAR: FORMS & LISTS */}
                    <div className="xl:col-span-4 space-y-8">
                        <aside className="sticky top-28 space-y-8">
                            <AddBedForm onBedAdded={() => fetchBedData(selectedSpecialty)} specialties={SPECIALTY_OPTIONS} />
                            <TransferRequestForm />
                            <TransferRequestList />
                        </aside>
                    </div>
                </div>
            </main>
        </div>
        {showSessionModal && (
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-slate-100">
                    <div className="text-4xl mb-4">🔑</div>
                    <h2 className="text-xl font-black text-slate-800 mb-2">Session Expired</h2>
                    <p className="text-sm text-slate-500 mb-6">For your security, you have been logged out. Please sign in again to continue managing beds.</p>
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black hover:bg-indigo-700 transition-all shadow-lg"
                    >
                    RETURN TO LOGIN
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

export default DashboardPage;