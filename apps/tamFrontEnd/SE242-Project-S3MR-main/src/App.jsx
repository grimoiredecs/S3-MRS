// File: App.jsx
import React, {useState} from "react";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import bgImage from "./assets/background.jpg";
import logo from "./assets/logoHCMUT.png";

export default function App() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(prev => prev === menu ? null : menu);
  };
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Logo" className="logo" />
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/report">Report</Link></li>
          </ul>
        </div>
        <div className="nav-right">
          <span onClick={() => toggleDropdown("notif")}>🔔</span>
          <span onClick={() => toggleDropdown("msg")}>💬</span>
          <span onClick={() => toggleDropdown("acc")}>👤</span>

          {/* Dropdowns */}
          {activeDropdown === "notif" && (
            <div className="dropdown">🔔 No new notifications</div>
          )}
          {activeDropdown === "msg" && (
            <div className="dropdown">💬 You have 2 new messages</div>
          )}
          {activeDropdown === "acc" && (
            <div className="dropdown">
              <p>👤 Account settings</p>
              <p>🔓 Logout</p>
            </div>
          )}
        </div>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
