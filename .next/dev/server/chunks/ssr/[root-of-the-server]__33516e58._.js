module.exports = [
"[project]/src/api/axiosConfig.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL
]);
// Normalize API base: allow NEXT_PUBLIC_API_URL to be either host or host+/api/v1
const _RAW_API = ("TURBOPACK compile-time value", "https://nbs-backend.onrender.com/api/v1") || 'http://localhost:3000';
const API_BASE_URL = /\/api\/v1\/?$/.test(_RAW_API) ? _RAW_API.replace(/\/$/, '') : _RAW_API.replace(/\/$/, '') + '/api/v1';
}),
"[project]/src/components/HospitalDiscovery.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import, [project]/node_modules/axios)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosConfig.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__ = __turbopack_context__.i("[externals]/react-leaflet [external] (react-leaflet, esm_import, [project]/node_modules/react-leaflet)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$leaflet$29$__ = __turbopack_context__.i("[externals]/leaflet [external] (leaflet, cjs, [project]/node_modules/leaflet)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
// --- HELPERS ---
const calculateDistance = (lat1, lon1, lat2, lon2)=>{
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
};
const hospitalIcon = (color)=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$leaflet__$5b$external$5d$__$28$leaflet$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$leaflet$29$__["default"].Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [
            25,
            41
        ],
        iconAnchor: [
            12,
            41
        ],
        popupAnchor: [
            1,
            -34
        ],
        shadowSize: [
            41,
            41
        ]
    });
};
const centerPosition = [
    5.1053,
    -1.2464
];
const HospitalDiscovery = ()=>{
    // 1. REFS & STATE
    const mapRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [hospitals, setHospitals] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [specialtyFilter, setSpecialtyFilter] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('distance');
    const [activeHospital, setActiveHospital] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [wardData, setWardData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [userCoords, setUserCoords] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // 2. DATA FETCHING
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        navigator.geolocation.getCurrentPosition((pos)=>setUserCoords({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }), (err)=>console.warn("Location blocked"));
        __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$axios$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/public/hospitals`).then((res)=>setHospitals(res.data)).catch((err)=>console.error("Error loading hospitals", err));
    }, []);
    // 3. SEARCH & FILTERS
    const specialties = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const allWards = hospitals.flatMap((h)=>h.wards?.map((w)=>w.ward_name) || []);
        return [
            ...new Set(allWards)
        ].sort();
    }, [
        hospitals
    ]);
    const filteredHospitals = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        return hospitals.filter((h)=>{
            const searchTermMatch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.location.toLowerCase().includes(searchTerm.toLowerCase());
            if (!specialtyFilter) {
                return searchTermMatch;
            }
            const specialtyMatch = h.wards && h.wards.some((w)=>w.ward_name === specialtyFilter && w.available_beds > 0);
            return searchTermMatch && specialtyMatch;
        });
    }, [
        searchTerm,
        hospitals,
        specialtyFilter
    ]);
    // 4. MAP & DIRECTIONS
    const moveMapTo = (lat, lng)=>{
        if (mapRef.current) {
            mapRef.current.flyTo([
                lat,
                lng
            ], 15, {
                animate: true,
                duration: 1.5
            });
        }
    };
    const handleGetDirections = (hospital)=>{
        if (userCoords && hospital.lat && hospital.lng) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${hospital.lat},${hospital.lng}&travelmode=driving`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            alert("Could not get directions. Your location or the hospital's location is unavailable.");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (searchTerm !== "" && filteredHospitals.length > 0) {
            const first = filteredHospitals[0];
            if (first.lat && first.lng) {
                moveMapTo(Number(first.lat), Number(first.lng));
            }
        }
    }, [
        searchTerm,
        filteredHospitals
    ]);
    const handleSelect = (hospital)=>{
        if (activeHospital === hospital.id) {
            setActiveHospital(null);
            return;
        }
        if (hospital.lat && hospital.lng) {
            moveMapTo(Number(hospital.lat), Number(hospital.lng));
        }
        setWardData(hospital.wards || []);
        setActiveHospital(hospital.id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto p-4 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-extrabold text-gray-900",
                        children: "Available Beds Near You"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 mb-6",
                        children: "Real-time status of emergency facilities in the Central Region"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search hospital name or location...",
                                        className: "w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "absolute left-4 top-4 text-gray-400 text-xl",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                value: specialtyFilter,
                                onChange: (e)=>setSpecialtyFilter(e.target.value),
                                className: "py-4 px-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All Specialties"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    specialties.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                            value: s,
                                            children: s
                                        }, s, false, {
                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                            lineNumber: 158,
                                            columnNumber: 35
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white relative z-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__["MapContainer"], {
                    center: centerPosition,
                    zoom: 12,
                    style: {
                        height: '100%',
                        width: '100%'
                    },
                    ref: mapRef,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__["TileLayer"], {
                            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        filteredHospitals.map((hospital)=>hospital.lat && hospital.lng && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__["Marker"], {
                                position: [
                                    Number(hospital.lat),
                                    Number(hospital.lng)
                                ],
                                icon: hospital.available_beds > 0 ? hospitalIcon('green') : hospitalIcon('red'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$leaflet__$5b$external$5d$__$28$react$2d$leaflet$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$29$__["Popup"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "p-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-blue-600",
                                                children: hospital.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                lineNumber: 185,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium",
                                                children: [
                                                    hospital.available_beds,
                                                    " beds free"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                lineNumber: 186,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSelect(hospital),
                                                className: "mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded",
                                                children: "View Details"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                lineNumber: 187,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleGetDirections(hospital),
                                                className: "mt-2 ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded",
                                                children: "Directions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                        lineNumber: 184,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                    lineNumber: 183,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, `map-${hospital.id}`, false, {
                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                lineNumber: 178,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex justify-end mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                    value: sortBy,
                    onChange: (e)=>setSortBy(e.target.value),
                    className: "py-2 px-4 rounded-lg border border-gray-300 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                            value: "distance",
                            children: "Sort by Distance"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                            value: "name",
                            children: "Sort by Name"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                            value: "available_beds",
                            children: "Sort by Available Beds"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    ...filteredHospitals
                ].sort((a, b)=>{
                    switch(sortBy){
                        case 'name':
                            return a.name.localeCompare(b.name);
                        case 'available_beds':
                            return b.available_beds - a.available_beds;
                        case 'distance':
                        default:
                            if (!userCoords || !a.lat || !b.lat) return 0;
                            const distA = Number(calculateDistance(userCoords.lat, userCoords.lng, Number(a.lat), Number(a.lng)));
                            const distB = Number(calculateDistance(userCoords.lat, userCoords.lng, Number(b.lat), Number(b.lng)));
                            return distA - distB;
                    }
                }).map((hospital)=>{
                    const occupancy = hospital.total_capacity > 0 ? (hospital.total_capacity - hospital.available_beds) / hospital.total_capacity * 100 : 0;
                    const occupancyColor = occupancy > 80 ? 'bg-red-500' : occupancy > 60 ? 'bg-yellow-400' : 'bg-green-500';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSelect(hospital),
                                className: "w-full text-left focus:outline-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "p-5 flex justify-between items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "space-y-1 flex-grow mr-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl",
                                                            children: "🏥"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors",
                                                            children: hospital.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center text-gray-500 text-sm ml-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "mr-1",
                                                            children: "📍"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " ",
                                                        hospital.location,
                                                        userCoords && hospital.lat && hospital.lng && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "ml-3 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-semibold text-xs",
                                                                    children: [
                                                                        calculateDistance(userCoords.lat, userCoords.lng, Number(hospital.lat), Number(hospital.lng)),
                                                                        " km away"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                    lineNumber: 244,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        handleGetDirections(hospital);
                                                                    },
                                                                    className: "ml-2 text-blue-600 hover:text-blue-800",
                                                                    title: "Get Directions",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        className: "h-5 w-5",
                                                                        viewBox: "0 0 20 20",
                                                                        fill: "currentColor",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
                                                                            clipRule: "evenodd"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                            lineNumber: 256,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                        lineNumber: 255,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                    lineNumber: 247,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "ml-8 pt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between mb-1 text-xs font-medium text-gray-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    children: "Overall Occupancy"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        Math.round(occupancy),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                    lineNumber: 265,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "w-full bg-gray-200 rounded-full h-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: `${occupancyColor} h-2 rounded-full`,
                                                                style: {
                                                                    width: `${occupancy}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                            lineNumber: 235,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "text-right flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: `inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${hospital.available_beds > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `w-2 h-2 rounded-full mr-2 ${hospital.available_beds > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    hospital.available_beds,
                                                    " Beds Available"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                lineNumber: 273,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                            lineNumber: 272,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                    lineNumber: 234,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                lineNumber: 233,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            activeHospital === hospital.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 border-t border-gray-100 p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-4",
                                        children: "Ward Breakdown"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                        lineNumber: 285,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                                        children: wardData.map((ward)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "bg-white p-4 rounded-xl border border-gray-200 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-gray-700 mb-1",
                                                        children: ward.ward_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-full bg-gray-100 h-2 rounded-full mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "bg-blue-500 h-2 rounded-full",
                                                            style: {
                                                                width: `${ward.available_beds / ward.total_beds * 100}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                            lineNumber: 291,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-blue-600",
                                                                children: ward.available_beds
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                lineNumber: 294,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: [
                                                                    " / ",
                                                                    ward.total_beds,
                                                                    " free"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                                lineNumber: 295,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, ward.ward_name, true, {
                                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                                lineNumber: 288,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                        lineNumber: 286,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                                lineNumber: 284,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, hospital.id, true, {
                        fileName: "[project]/src/components/HospitalDiscovery.tsx",
                        lineNumber: 232,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mt-10 pt-6 border-t border-gray-100 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: "/login",
                    className: "text-blue-600 hover:underline text-sm font-medium",
                    children: "Hospital Staff? Log in here →"
                }, void 0, false, {
                    fileName: "[project]/src/components/HospitalDiscovery.tsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/HospitalDiscovery.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HospitalDiscovery.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = HospitalDiscovery;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/HospitalDiscovery.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/HospitalDiscovery.tsx [ssr] (ecmascript)"));
}),
"[externals]/axios [external] (axios, esm_import, [project]/node_modules/axios)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("axios-fc13683ac9a02a51");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/react-leaflet [external] (react-leaflet, esm_import, [project]/node_modules/react-leaflet)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-leaflet-0d15a688ff7d710a");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/leaflet [external] (leaflet, cjs, [project]/node_modules/leaflet)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("leaflet-dd35bdd58107d823", () => require("leaflet-dd35bdd58107d823"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__33516e58._.js.map