import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Dashboard.css"; // Reuse your dashboard styling

interface Device {
    id: string;
    type: string;
    room_id: string;
    status: boolean;
}

const IoTManagement: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3004/devices")
            .then((res) => res.json())
            .then((data) => setDevices(data))
            .catch((err) => {
                console.error("❌ Failed to fetch IoT devices:", err);
            });
    }, []);

    return (
        <div className="homepage">
            {/* === Navbar === */}
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />

                <div className="nav-links">
                    <Link to="/admin">Home</Link>
                    <Link to="/admindashboard">Dashboard</Link>
                    <Link to="/iot">IoT Management</Link>
                    <Link to="/report">Reports</Link>
                </div>

                <div className="nav-icons">
                    <FaBell />
                    <FaUserCircle
                        onClick={() => navigate("/profile")}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </nav>

            {/* === IoT Device Content === */}
            <div className="admin-dashboard-content">
                <h2>IoT Device Management</h2>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Device ID</th>
                            <th>Type</th>
                            <th>Room ID</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {devices.map((device, index) => (
                            <tr key={index}>
                                <td>{device.id}</td>
                                <td>{device.type}</td>
                                <td>{device.room_id}</td>
                                <td>{device.status ? "On" : "Off"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IoTManagement;
