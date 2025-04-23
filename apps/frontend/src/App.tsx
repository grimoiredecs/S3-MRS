import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginBox from "./components/LoginBox";
import HomePage from "./components/HomePage"; // Make sure this is implemented
import BookingPage from "./components/BookingPage.tsx";
import ProfilePage from "./components/ProfilePage";
import AboutPage from "./components/AboutUs.tsx";
import ReportPage from "./components/Reports.tsx"
import AdminHome from "./components/AdminHome.tsx";

import "./App.css";
import Dashboard from "./components/Dashboard.tsx";

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Routes>
                    <Route path="/" element={<LoginBox />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/book" element={<BookingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path = "/dashboard" element={<Dashboard/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
