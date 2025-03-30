import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_files: 0,
        file_type_breakdown: {},
        files_per_user: []
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/dashboard/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching dashboard stats", error);
        }
    };



    return (
        <div className="container mt-4">
            <h2>Dashboard</h2>

            <div className="card p-3 mb-3">
                <h4>Total Files Uploaded: {stats.total_files}</h4>
            </div>

            <div className="card p-3 mb-3">
                <h4>File Type Breakdown</h4>
                <ul>
                    {Object.entries(stats.file_type_breakdown).map(([type, count]) => (
                        <li key={type}>{type}: {count} files</li>
                    ))}
                </ul>
            </div>

            <div className="card p-3">
                <h4>Files Uploaded by Users</h4>
                <ul>
                    {stats.files_per_user.map(user => (
                        <li key={user.user__username}>{user.user__username}: {user.count} files</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
