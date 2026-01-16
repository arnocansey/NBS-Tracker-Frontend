(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/pages/LoginPage.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
// frontend/src/pages/LoginPage.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-EPOLDU6W.mjs [client] (ecmascript)"); // Assuming you use React Router
;
var _s = __turbopack_context__.k.signature();
;
;
;
const API_BASE_URL = 'http://localhost:3000/api/v1';
const LoginPage = ()=>{
    _s();
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const handleLogin = async (e)=>{
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/auth/login`, {
                username,
                password
            });
            const { token, user } = response.data;
            // --- Crucial Step: Store the JWT securely ---
            // Storing in localStorage is acceptable for an MVP/testing environment.
            // For production, consider using HttpOnly cookies for better security.
            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', user.role);
            console.log(`User ${user.username} logged in successfully.`);
            // Redirect the user to the main dashboard page
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            // Display friendly error message
            setError(err.response?.data?.error || 'Login failed. Check server connection.');
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center min-h-screen bg-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-center text-indigo-800",
                    children: "No Bed Syndrome Tracker Login"
                }, void 0, false, {
                    fileName: "[project]/src/pages/LoginPage.jsx",
                    lineNumber: 52,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleLogin,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-gray-700",
                                    children: "Username"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LoginPage.jsx",
                                    lineNumber: 58,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: username,
                                    onChange: (e)=>setUsername(e.target.value),
                                    required: true,
                                    className: "mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LoginPage.jsx",
                                    lineNumber: 59,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LoginPage.jsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-gray-700",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LoginPage.jsx",
                                    lineNumber: 70,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    required: true,
                                    className: "mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/LoginPage.jsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/LoginPage.jsx",
                            lineNumber: 69,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-red-600",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LoginPage.jsx",
                            lineNumber: 82,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isLoading,
                            className: "w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50",
                            children: isLoading ? 'Logging In...' : 'Login'
                        }, void 0, false, {
                            fileName: "[project]/src/pages/LoginPage.jsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/LoginPage.jsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/LoginPage.jsx",
            lineNumber: 51,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/pages/LoginPage.jsx",
        lineNumber: 50,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LoginPage, "uP3nJoymimvLxhanuaXnZ3jHLTU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useNavigate"]
    ];
});
_c = LoginPage;
const __TURBOPACK__default__export__ = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BedCard.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
// BedCard.jsx (React Component Snippet)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)"); // We use axios for simpler API calls
;
var _s = __turbopack_context__.k.signature();
;
;
const API_BASE_URL = 'http://localhost:3000/api/v1';
const BedCard = ({ bedData, onStatusChange, token })=>{
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(bedData.current_status);
    const bedId = bedData.bed_id;
    // --- Styles for the Card ---
    const getStatusColor = (currentStatus)=>{
        switch(currentStatus){
            case 'AVAILABLE':
                return 'bg-green-100 text-green-800';
            case 'OCCUPIED':
                return 'bg-red-100 text-red-800';
            case 'CLEANING':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    // --- Core Logic: Status Update ---
    const handleStatusUpdate = async (newStatus)=>{
        if (!window.confirm(`Are you sure you want to change Bed ${bedId} status to ${newStatus}?`)) {
            return;
        }
        try {
            // Replace 'YOUR_JWT_TOKEN' with the actual token received on login (MVP-401)
            // const token = 'YOUR_JWT_TOKEN'; 
            await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${API_BASE_URL}/beds/${bedId}/status`, {
                new_status: newStatus
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // On success, update the local state to reflect the change
            setStatus(newStatus);
            alert(`Status updated to ${newStatus}`);
            onStatusChange();
        } catch (error) {
            console.error('Error updating status:', error.response ? error.response.data : error.message);
            alert('Failed to update status. Check console for details.');
        }
    };
    // --- Rendering the Component ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `p-4 border rounded-lg shadow-md ${getStatusColor(status)}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-bold text-lg mb-1",
                children: [
                    "Bed ID: ",
                    bedId
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BedCard.jsx",
                lineNumber: 55,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Ward: ",
                    bedData.ward_name
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BedCard.jsx",
                lineNumber: 56,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Specialty: ",
                    bedData.specialty_type
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BedCard.jsx",
                lineNumber: 57,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xl font-extrabold",
                children: [
                    "Status: ",
                    status
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BedCard.jsx",
                lineNumber: 58,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-x-2",
                children: [
                    status !== 'AVAILABLE' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-green-500 text-white p-1 rounded text-sm",
                        onClick: ()=>handleStatusUpdate('AVAILABLE'),
                        children: "Mark Available"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BedCard.jsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    status !== 'OCCUPIED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-red-500 text-white p-1 rounded text-sm",
                        onClick: ()=>handleStatusUpdate('OCCUPIED'),
                        children: "Mark Occupied"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BedCard.jsx",
                        lineNumber: 69,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BedCard.jsx",
                lineNumber: 60,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BedCard.jsx",
        lineNumber: 54,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BedCard, "YInXLKVRQE8RwwXXR/eP9gZViHw=");
_c = BedCard;
const __TURBOPACK__default__export__ = BedCard;
var _c;
__turbopack_context__.k.register(_c, "BedCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/DashboardPage.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
// frontend/src/pages/DashboardPage.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BedCard$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BedCard.jsx [client] (ecmascript)"); // Import the BedCard component
;
var _s = __turbopack_context__.k.signature();
;
;
;
impor;
// Assuming we have a dedicated service for API calls
// import { fetchBeds } from '../api/bedService'; 
// --- Configuration ---
const API_BASE_URL = 'http://localhost:3000/api/v1';
// Hardcoded for MVP, should be fetched from a central config/database later
const SPECIALTY_OPTIONS = [
    'All',
    'General',
    'ICU',
    'Pediatric',
    'HDU',
    'CCU',
    'NICU',
    'Emergency beds',
    'PACU',
    'PICU'
];
const DashboardPage = ()=>{
    _s();
    const [beds, setBeds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSpecialty, setSelectedSpecialty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('All');
    // NOTE: This should come from local storage after successful login (MVP-401)
    const token = localStorage.getItem('authToken') || 'YOUR_JWT_TOKEN';
    // --- 1. Fetch Data Function (MVP-101 & MVP-103) ---
    const fetchBedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[fetchBedData]": async (specialty)=>{
            setIsLoading(true);
            setError(null);
            try {
                // Construct the API URL with an optional query parameter for filtering
                let url = `${API_BASE_URL}/beds`;
                if (specialty && specialty !== 'All') {
                    url += `?specialty_type=${specialty}`;
                }
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(url, {
                    headers: {
                        // Send the JWT token for authentication (Auth Middleware check)
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBeds(response.data);
            } catch (err) {
                console.error('Failed to fetch bed data:', err);
                // Handle 401 Unauthorized (Token expired/invalid)
                if (err.response && err.response.status === 401) {
                    setError("Session expired or unauthorized. Please log in.");
                // Redirect to login page in a production app
                } else {
                    setError('Could not load bed data. Please check the API server.');
                }
            } finally{
                setIsLoading(false);
            }
        }
    }["DashboardPage.useCallback[fetchBedData]"], [
        token
    ]);
    // --- Effect Hook: Runs on component mount and when selectedSpecialty changes ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            fetchBedData(selectedSpecialty);
        }
    }["DashboardPage.useEffect"], [
        selectedSpecialty,
        fetchBedData
    ]);
    // --- 2. Filter Handler ---
    const handleFilterChange = (event)=>{
        setSelectedSpecialty(event.target.value);
    };
    // --- 3. Display Logic ---
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center p-8",
        children: "Loading bed status..."
    }, void 0, false, {
        fileName: "[project]/src/pages/DashboardPage.jsx",
        lineNumber: 76,
        columnNumber: 27
    }, ("TURBOPACK compile-time value", void 0));
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center p-8 text-red-600 font-bold",
        children: error
    }, void 0, false, {
        fileName: "[project]/src/pages/DashboardPage.jsx",
        lineNumber: 77,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6 text-indigo-700",
                children: "🏥 Hospital Bed Status Dashboard"
            }, void 0, false, {
                fileName: "[project]/src/pages/DashboardPage.jsx",
                lineNumber: 81,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex items-center space-x-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "specialty-filter",
                        className: "font-semibold",
                        children: "Filter by Specialty:"
                    }, void 0, false, {
                        fileName: "[project]/src/pages/DashboardPage.jsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "specialty-filter",
                        value: selectedSpecialty,
                        onChange: handleFilterChange,
                        className: "p-2 border rounded-md shadow-sm",
                        children: SPECIALTY_OPTIONS.map((specialty)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: specialty,
                                children: specialty
                            }, specialty, false, {
                                fileName: "[project]/src/pages/DashboardPage.jsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/DashboardPage.jsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-500",
                        children: [
                            "Displaying ",
                            beds.length,
                            " beds."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/DashboardPage.jsx",
                        lineNumber: 98,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/DashboardPage.jsx",
                lineNumber: 84,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            beds.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                children: beds.map((bed)=>// Pass a callback function to BedCard so it can trigger a dashboard refresh after a successful update
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BedCard$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        bedData: bed,
                        onStatusChange: ()=>fetchBedData(selectedSpecialty),
                        token: token
                    }, bed.bed_id, false, {
                        fileName: "[project]/src/pages/DashboardPage.jsx",
                        lineNumber: 108,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/pages/DashboardPage.jsx",
                lineNumber: 105,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-10 bg-yellow-50 rounded-lg",
                children: "No beds found for the selected specialty."
            }, void 0, false, {
                fileName: "[project]/src/pages/DashboardPage.jsx",
                lineNumber: 117,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/DashboardPage.jsx",
        lineNumber: 80,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DashboardPage, "zSeelLtxoMUrwYydRe5IUGJHc3s=");
_c = DashboardPage;
const __TURBOPACK__default__export__ = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// frontend/src/App.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-EPOLDU6W.mjs [client] (ecmascript)");
// Import Pages
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LoginPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/LoginPage.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$DashboardPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/pages/DashboardPage.jsx [client] (ecmascript)");
;
;
;
;
// --- Private Route Component ---
// This component checks if a token exists before allowing access
const PrivateRoute = ({ children })=>{
    // Check for the token in local storage
    const isAuthenticated = ("TURBOPACK compile-time value", "object") !== 'undefined' && localStorage.getItem('authToken');
    // If authenticated, render the children (the requested page)
    if (isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    // If not authenticated, redirect to the login page
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Navigate"], {
        to: "/"
    }, void 0, false, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 22,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PrivateRoute;
const App = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BrowserRouter"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Routes"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Route"], {
                    path: "/",
                    element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$LoginPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 30,
                        columnNumber: 42
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Route"], {
                    path: "/dashboard",
                    element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivateRoute, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$DashboardPage$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 37,
                            columnNumber: 29
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 36,
                        columnNumber: 25
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Route"], {
                    path: "*",
                    element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$EPOLDU6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Navigate"], {
                        to: "/"
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 43,
                        columnNumber: 42
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/App.tsx",
            lineNumber: 28,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = App;
const __TURBOPACK__default__export__ = App;
var _c, _c1;
__turbopack_context__.k.register(_c, "PrivateRoute");
__turbopack_context__.k.register(_c1, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/App.tsx [client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/App.tsx [client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_e253cc9c._.js.map