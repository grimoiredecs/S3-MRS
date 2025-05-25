import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./ProfilePage.css";


// Dummy data — Replace with fetched data later
const studentInfo = {
    profilePic: "/default-profile.png",
    adminId: "2852304",
    email: "staff3@hcmut.edu.vn",
    
};


const AdminProfile: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/admin">Home</Link>
                    <Link to="/admindash">Dashboard</Link>
                    {/* <Link to="/book">Book</Link> */}
                </div>

                <div className="nav-icons">
                    <FaBell />
                    <FaUserCircle
                        onClick={() => navigate("/adminprofile")}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </nav>

            {/* Profile Content */}
            <div className="profile-content">
                <div className="profile-box">
                    <img
                        src={`https://avatars.dicebear.com/api/big-smile/${studentInfo.adminId}.svg`}
                        alt="avatar"
                        className="profile-pic"
                    />
                    <h2>Student Profile</h2>
                    <p><strong>ID:</strong> {studentInfo.adminId}</p>
                    <p><strong>Email:</strong> {studentInfo.email}</p>
                </div>


            </div>
        </div>
    );
};

export default AdminProfile;
