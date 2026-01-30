// frontend/src/pages/AnalyticsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/axiosConfig';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
    const [occupancyData, setOccupancyData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError("Authentication token not found. Please login.");
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/analytics/occupancy-by-hospital`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = response.data;
                const chartData = {
                    labels: data.map(d => d.name),
                    datasets: [
                        {
                            label: 'Occupancy %',
                            data: data.map(d => d.occupancy_percentage),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };
                setOccupancyData(chartData);

            } catch (err) {
                console.error("Failed to fetch analytics data:", err);
                setError(err.response?.data?.error || "Failed to load data.");
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Current Occupancy Rate by Hospital (%)',
                font: {
                    size: 20
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Occupancy (%)'
                }
            }
        }
    };

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    if (!occupancyData) {
        return <div className="p-8 text-center">Loading analytics...</div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                <Bar options={options} data={occupancyData} />
            </div>
        </div>
    );
};

export default AnalyticsPage;
