import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaComments, FaUserCircle } from "react-icons/fa";
import ChatBox from "../App";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No userId found");
      return;
    }

    fetch(`http://localhost:3003/bookings/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
      });
  }, []);

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
          <Link to="/book">Book</Link>
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

      {/* === Dashboard Content === */}
      <div className="dashboard-content">
        <h2>Your Booking History</h2>
        <ul>
          {bookings.map((booking: any, index: number) => (
            <li key={index}>
              Room: {booking.roomId}, Time: {new Date(booking.startTime).toLocaleString()} – {new Date(booking.endTime).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* === Chat Floating Box === */}
      {showChat && <ChatBox />}
    </div>
  );
};

export default Dashboard;
