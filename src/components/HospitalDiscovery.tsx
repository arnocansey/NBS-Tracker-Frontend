import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/axiosConfig';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- TYPES ---
interface WardDetail {
  ward_name: string;
  total_beds: number;
  available_beds: number;
}

interface Hospital {
  id: number;
  name: string;
  location: string;
  available_beds: number;
  total_capacity: number;
  lat?: number;
  lng?: number;
  wards: WardDetail[];
}

// --- HELPERS ---
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

const hospitalIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const centerPosition: L.LatLngExpression = [5.1053, -1.2464];

const HospitalDiscovery: React.FC = () => {
  // 1. REFS & STATE
  const mapRef = useRef<L.Map | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('distance');
  const [activeHospital, setActiveHospital] = useState<number | null>(null);
  const [wardData, setWardData] = useState<WardDetail[]>([]);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // 2. DATA FETCHING
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn("Location blocked")
    );

    axios.get(`${API_BASE_URL}/public/hospitals`)
      .then(res => setHospitals(res.data))
      .catch(err => console.error("Error loading hospitals", err));
  }, []);

  // 3. SEARCH & FILTERS
  const specialties = useMemo(() => {
    const allWards = hospitals.flatMap(h => h.wards?.map(w => w.ward_name) || []);
    return [...new Set(allWards)].sort();
  }, [hospitals]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(h => {
      const searchTermMatch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            h.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (!specialtyFilter) {
        return searchTermMatch;
      }

      const specialtyMatch = h.wards && h.wards.some(w => w.ward_name === specialtyFilter && w.available_beds > 0);

      return searchTermMatch && specialtyMatch;
    });
  }, [searchTerm, hospitals, specialtyFilter]);

  // 4. MAP & DIRECTIONS
  const moveMapTo = (lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
    }
  };

  const handleGetDirections = (hospital: Hospital) => {
    if (userCoords && hospital.lat && hospital.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${hospital.lat},${hospital.lng}&travelmode=driving`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert("Could not get directions. Your location or the hospital's location is unavailable.");
    }
  };

  useEffect(() => {
    if (searchTerm !== "" && filteredHospitals.length > 0) {
      const first = filteredHospitals[0];
      if (first.lat && first.lng) {
        moveMapTo(Number(first.lat), Number(first.lng));
      }
    }
  }, [searchTerm, filteredHospitals]);

  const handleSelect = (hospital: Hospital) => {
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

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* HEADER & SEARCH */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Available Beds Near You</h2>
        <p className="text-gray-500 mb-6">Real-time status of emergency facilities in the Central Region</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="relative md:col-span-2">
            <input 
              type="text"
              placeholder="Search hospital name or location..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-4 text-gray-400 text-xl">🔍</span>
          </div>
          <select
            value={specialtyFilter}
            onChange={e => setSpecialtyFilter(e.target.value)}
            className="py-4 px-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          >
            <option value="">All Specialties</option>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border-4 border-white relative z-0">
        <MapContainer 
          center={centerPosition} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
          ref={mapRef} 
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredHospitals.map((hospital) => (
            hospital.lat && hospital.lng && (
              <Marker 
                key={`map-${hospital.id}`} 
                position={[Number(hospital.lat), Number(hospital.lng)]}
                icon={hospital.available_beds > 0 ? hospitalIcon('green') : hospitalIcon('red')}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-blue-600">{hospital.name}</h3>
                    <p className="text-sm font-medium">{hospital.available_beds} beds free</p>
                    <button onClick={() => handleSelect(hospital)} className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">View Details</button>
                    <button onClick={() => handleGetDirections(hospital)} className="mt-2 ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">Directions</button>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      {/* HOSPITAL LIST SECTION */}
      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="py-2 px-4 rounded-lg border border-gray-300 shadow-sm"
        >
          <option value="distance">Sort by Distance</option>
          <option value="name">Sort by Name</option>
          <option value="available_beds">Sort by Available Beds</option>
        </select>
      </div>
      <div className="space-y-4">
        {[...filteredHospitals]
          .sort((a, b) => {
            switch (sortBy) {
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
          })
          .map((hospital) => {
            const occupancy = hospital.total_capacity > 0
              ? ((hospital.total_capacity - hospital.available_beds) / hospital.total_capacity) * 100
              : 0;
            const occupancyColor = occupancy > 80 ? 'bg-red-500' : occupancy > 60 ? 'bg-yellow-400' : 'bg-green-500';

            return (
              <div key={hospital.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                <button onClick={() => handleSelect(hospital)} className="w-full text-left focus:outline-none">
                  <div className="p-5 flex justify-between items-start">
                    <div className="space-y-1 flex-grow mr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🏥</span>
                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm ml-8">
                        <span className="mr-1">📍</span> {hospital.location}
                        {userCoords && hospital.lat && hospital.lng && (
                          <>
                            <span className="ml-3 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-semibold text-xs">
                              {calculateDistance(userCoords.lat, userCoords.lng, Number(hospital.lat), Number(hospital.lng))} km away
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleGetDirections(hospital);
                                }}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                                title="Get Directions"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                          </>
                        )}
                      </div>
                      <div className="ml-8 pt-2">
                        <div className="flex justify-between mb-1 text-xs font-medium text-gray-500">
                          <span>Overall Occupancy</span>
                          <span>{Math.round(occupancy)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${occupancyColor} h-2 rounded-full`} style={{ width: `${occupancy}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                        hospital.available_beds > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${hospital.available_beds > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        {hospital.available_beds} Beds Available
                      </div>
                    </div>
                  </div>
                </button>

                {activeHospital === hospital.id && (
                  <div className="bg-gray-50 border-t border-gray-100 p-5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ward Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {wardData.map((ward) => (
                        <div key={ward.ward_name} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                          <p className="text-sm font-semibold text-gray-700 mb-1">{ward.ward_name}</p>
                          <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(ward.available_beds / ward.total_beds) * 100}%` }}></div>
                          </div>
                          <p className="text-sm">
                            <span className="font-bold text-blue-600">{ward.available_beds}</span>
                            <span className="text-gray-400"> / {ward.total_beds} free</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-100 text-center">
        <a href="/login" className="text-blue-600 hover:underline text-sm font-medium">Hospital Staff? Log in here →</a>
      </div>
    </div>
  );
};

export default HospitalDiscovery;