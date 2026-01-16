// frontend/src/components/BedHistory.jsx
import React from 'react';

const BedHistory = ({ history }) => (
    <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
            🕒 Recent Bed Activity
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {history.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No recent history</p>
            ) : (
                history.map((log, i) => (
                    <div key={i} className="text-[11px] flex justify-between bg-gray-50 p-2 rounded border-l-2 border-indigo-400">
                        <div>
                            <span className="font-bold text-indigo-900">{log.action_type}</span>: {log.patient_name}
                        </div>
                        <div className="text-gray-400">
                            {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default BedHistory;