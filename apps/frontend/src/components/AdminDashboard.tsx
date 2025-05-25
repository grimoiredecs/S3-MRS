import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Dashboard.css"; // Reuse your dashboard CSS

const AdminDashboard: React.FC = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:3003/bookings")
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((err) => {
                console.error("❌ Failed to fetch bookings:", err);
            });
    }, []);

    return (
        <div className="homepage">
            {/* === Navbar === */}
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />

                <div className="nav-links">
                    <Link to="/admin">Home</Link>
                    <Link to="/admindash">Dashboard</Link>
                    {/* <Link to = "/dashboard">Book</Link>
                    <Link to="/report">Reports</Link> */}
                </div>

                <div className="nav-icons">
                    <FaBell />
                    <FaUserCircle
                        onClick={() => navigate("/adminprofile")}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </nav>

            {/* === Admin Dashboard Content === */}
            <div className="admin-dashboard-content">
                <h2>All Students' Bookings</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Room</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking: any, index: number) => (
                        <tr key={index}>
                            <td>{booking.userId}</td>
                            <td>{booking.roomId}</td>
                            <td>{new Date(booking.startTime).toLocaleString()}</td>
                            <td>{new Date(booking.endTime).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
