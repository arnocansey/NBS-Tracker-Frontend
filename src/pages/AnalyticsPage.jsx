import React, { useState, useEffect } from 'react';
import { apiClient } from '../api/axiosConfig';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stat = ({ label, value }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value ?? 0}</p>
    </div>
);

const AnalyticsPage = () => {
    const [occupancyData, setOccupancyData] = useState(null);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [occupancyRes, summaryRes] = await Promise.all([
                    apiClient.get('/analytics/occupancy-by-hospital'),
                    apiClient.get('/analytics/operations-summary'),
                ]);

                const data = occupancyRes.data;
                setOccupancyData({
                    labels: data.map(d => d.name),
                    datasets: [
                        {
                            label: 'Occupancy %',
                            data: data.map(d => Number(d.occupancy_percentage)),
                            backgroundColor: 'rgba(79, 70, 229, 0.65)',
                            borderColor: 'rgba(79, 70, 229, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
                setSummary(summaryRes.data);
            } catch (err) {
                console.error('Failed to fetch analytics data:', err);
                setError(err.response?.data?.error || 'Failed to load data.');
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Current Occupancy Rate by Hospital (%)',
                font: { size: 20 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Occupancy (%)' },
            },
        },
    };

    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!occupancyData || !summary) return <div className="p-8 text-center">Loading analytics...</div>;

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Operations Analytics</h1>
                        <p className="text-sm text-slate-500">Capacity, transfer pressure, and cleaning risk.</p>
                    </div>
                    <Link to="/dashboard" className="text-sm font-bold text-indigo-600 hover:underline">Back to dashboard</Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Stat label="Available beds" value={summary.beds?.available_beds} />
                    <Stat label="Occupied beds" value={summary.beds?.occupied_beds} />
                    <Stat label="Pending transfers" value={summary.transfers?.pending_transfers} />
                    <Stat label="Overdue cleaning" value={summary.cleaning?.overdue_cleaning} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                    <Bar options={options} data={occupancyData} />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h2 className="text-sm font-black uppercase text-slate-700">Last 24h Activity</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {summary.activity_last_24h?.length ? summary.activity_last_24h.map(item => (
                            <div key={item.action_type} className="px-6 py-3 flex justify-between text-sm">
                                <span className="font-bold text-slate-700">{item.action_type}</span>
                                <span className="text-slate-500">{item.count}</span>
                            </div>
                        )) : (
                            <div className="px-6 py-8 text-center text-sm text-slate-400">No recorded activity yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
