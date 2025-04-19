import React, { useState } from "react";
import { FaBell, FaComments, FaUserCircle, FaChevronDown } from "react-icons/fa";
import ChatBox from "./ChatBox"; // <-- import
import "./HomePage.css";

const HomePage: React.FC = () => {
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="homepage">
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Dashboard</a>
                    <a href="#">Book</a>
                </div>
                <div className="nav-icons">
                    <FaBell />
                    <FaComments
                        onClick={() => setShowChat((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                    />
                    <FaUserCircle />
                    <FaChevronDown />
                </div>
            </nav>

            <div className="hero">
                <div className="hero-box">
                    <h1>WELCOME TO S3-MRS:</h1>
                    <p>Smart Study Space Management and Reservation System at HCMUT</p>
                    <button>More</button>
                </div>
            </div>

            {showChat && <ChatBox />}
        </div>
    );
};

export default HomePage;
