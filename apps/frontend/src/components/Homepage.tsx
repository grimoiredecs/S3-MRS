import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaComments, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ChatBox from "../App";   
import "./HomePage.css";

const HomePage: React.FC = () => {
    const [showChat, setShowChat] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className="homepage">
            {/* === Navbar === */}
            <nav className="navbar">
                <img
                    src="/bklogo.png"
                    alt="BK Logo"
                    className="logo"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                />

                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to = "/book">Book</Link>
                </div>

                <div className="nav-icons">
                    <FaBell />
                    <FaComments
                        onClick={() => setShowChat((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />
                    <FaUserCircle
                        onClick={() => navigate("/profile")}
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
            {showChat && <ChatBox />}
        </div>
    );
};

export default HomePage;
