import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

interface Complaint {
    studentId: string;
    message: string;
}

const ReportsPage: React.FC = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3007/feedback")
            .then((res) => setComplaints(res.data))
            .catch((err) => console.error("Failed to load feedback:", err));
    }, []);

    return (
        <div className="homepage">
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/admin">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/report">Report</Link>
                </div>
            </nav>

            <div className="profile-content">
                <div className="profile-box">
                    <h2>Room Complaints</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Issue</th>
                        </tr>
                        </thead>
                        <tbody>
                        {complaints.map((complaint, idx) => (
                            <tr key={idx}>
                                <td>{complaint.studentId}</td>
                                <td>{complaint.message}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;