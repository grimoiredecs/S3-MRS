import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";


// Dummy data — Replace with fetched data later
const studentInfo = {
    profilePic: "/default-profile.png",
    adminId: "2852304",
    email: "staff3@hcmut.edu.vn",
};



const AdminProfile: React.FC = () => {
    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <a href="#">Dashboard</a>
                    <Link to="/book">Book</Link>
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
