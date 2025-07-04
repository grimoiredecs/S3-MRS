import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AdminHome.css"

const AdminHome: React.FC = () => {

    const navigate = useNavigate();
    return (
        <div className="homepage">
            {/* === Navbar === */}
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/admin">Home</Link>
                    <Link to="/admindash">Dashboard</Link>
                    {/* <Link to = "/Board">Book</Link>
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

            {/* === Hero Section === */}
            <div className="hero">
                <div className="hero-box">
                    <h1>WELCOME TO S3-MRS:</h1>
                    <p>
                        Smart Study Space Management and Reservation System at HCMUT
                    </p>
                </div>
            </div>

            {/* === Chat Floating Box === */}
        </div>
    );
};

export default AdminHome;
