import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";


// Dummy data — Replace with fetched data later
const studentInfo = {
    profilePic: "/default-profile.png",
    studentId: "2252304",
    email: "khangnguyen@hcmut.edu.vn",
    year: "3rd year",
};



const ProfilePage: React.FC = () => {
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
