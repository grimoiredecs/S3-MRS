import React from 'react';
import './HomePage.css';
import { FaBell, FaComments, FaUserCircle, FaChevronDown } from 'react-icons/fa';

const HomePage: React.FC = () => {
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
                    <FaComments />
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
        </div>
    );
};

export default HomePage;
