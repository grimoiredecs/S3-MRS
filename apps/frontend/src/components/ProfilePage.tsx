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

const bookingHistory = [
    { room: "303-A4", date: "2025-04-25", time: "10:00", duration: "1 hour" },
    { room: "501-A4", date: "2025-04-22", time: "08:30", duration: "2 hours" },
    { room: "202-B1", date: "2025-04-20", time: "15:45", duration: "45 minutes" },
];

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

                <div className="booking-history">
                    <h3>Booking History</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Room</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookingHistory.map((booking, idx) => (
                            <tr key={idx}>
                                <td>{booking.room}</td>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{booking.duration}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;