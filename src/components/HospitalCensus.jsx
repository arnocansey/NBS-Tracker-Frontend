// frontend/src/components/HospitalCensus.jsx

import React from 'react';

const HospitalCensus = ({ beds }) => {
    const total = beds.length;
    const occupied = beds.filter(b => b.current_status === 'OCCUPIED').length;
    const available = beds.filter(b => b.current_status === 'AVAILABLE').length;
    
    const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

    // Group beds by specialty to create the breakdown
    const specialtyData = beds.reduce((acc, bed) => {
        const spec = bed.specialty_type;
        if (!acc[spec]) acc[spec] = { total: 0, available: 0 };
        acc[spec].total += 1;
        if (bed.current_status === 'AVAILABLE') acc[spec].available += 1;
        return acc;
    }, {});

    return (
        <div className="space-y-6 mb-8">
            {/* Top Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
                    <p className="text-xs font-bold uppercase opacity-80">Global Occupancy</p>
                    <p className="text-4xl font-black">{occupancyRate}%</p>
                    <div className="w-full bg-indigo-700 h-2 mt-4 rounded-full overflow-hidden">
                        <div className="bg-white h-full" style={{ width: `${occupancyRate}%` }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase">Available Beds</p>
                    <p className="text-4xl font-black text-green-600">{available}</p>
                    <p className="text-sm text-gray-400 mt-2">Ready for admissions</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase">Total Capacity</p>
                    <p className="text-4xl font-black text-gray-800">{total}</p>
                    <p className="text-sm text-gray-400 mt-2">Registered across all wards</p>
                </div>
            </div>

            {/* Specialty Breakdown Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b">
                    <h3 className="text-sm font-bold text-gray-700 uppercase">Specialty Capacity Breakdown</h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-2 text-left font-semibold text-gray-600">Specialty</th>
                            <th className="px-6 py-2 text-center font-semibold text-gray-600">Available</th>
                            <th className="px-6 py-2 text-center font-semibold text-gray-600">Total</th>
                            <th className="px-6 py-2 text-right font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {Object.entries(specialtyData).map(([name, stats]) => (
                            <tr key={name} className="hover:bg-gray-50">
                                <td className="px-6 py-2 font-medium text-gray-800">{name}</td>
                                <td className="px-6 py-2 text-center text-green-600 font-bold">{stats.available}</td>
                                <td className="px-6 py-2 text-center text-gray-500">{stats.total}</td>
                                <td className="px-6 py-2 text-right">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                        stats.available === 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                        {stats.available === 0 ? 'Full' : 'Space'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HospitalCensus;