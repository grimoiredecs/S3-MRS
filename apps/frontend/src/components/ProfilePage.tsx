import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaComments, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import "../App.css"


// Dummy data — Replace with fetched data later
const studentInfo = {
    profilePic: "/default-profile.png",
    studentId: "2252304",
    email: "khangnguyen@hcmut.edu.vn",
    year: "3rd year",
};



const ProfilePage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="navbar">
                <div className = "nav-left">
                    <img src="/bklogo.png" alt="BK Logo" className="logo" />
                    <ul className="nav-links">
                        <li><Link to="/home">Home</Link></li>
                        <li><a href="#">Dashboard</a></li>
                        <li><Link to="/book">Book</Link></li>
                    </ul>
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

            {/* Profile Content */}
            <div className="profile-content">
                <div className="profile-box">
                    <img
                        src={`https://avatars.dicebear.com/api/big-smile/${studentInfo.studentId}.svg`}
                        alt="avatar"
                        className="profile-pic"
                    />
                    <h2>Student Profile</h2>
                    <p><strong>ID:</strong> {studentInfo.studentId}</p>
                    <p><strong>Email:</strong> {studentInfo.email}</p>
                    <p><strong>Year:</strong> {studentInfo.year}</p>
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;
