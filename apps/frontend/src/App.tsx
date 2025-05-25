import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginBox from "./components/LoginBox";
//admin
import AdminHome from "./components/AdminHome";
import AdminDashboard from "./components/AdminDashboard";
import AdminProfile from "./components/AdminProfile";

//student
import Dashboard from "./components/Dashboard";
import BookingPage from "./components/BookingPage";
import HomePage from "./components/Homepage";
import ProfilePage from "./components/ProfilePage";
import ChatBox from "./components/Chatbox";
//general
import AboutPage from "./components/AboutUs";
import ReportPage from "./components/Reports";

import "./App.css";
import IoTManagement from "./components/IoT.tsx";

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Routes>
                    <Route path="/" element={<LoginBox />} />

                    <Route path="/admin" element={<AdminHome />} /> 
                    <Route path = "/admindash" element={<AdminDashboard/>}/>
                    <Route path = "/adminprofile" element={<AdminProfile/>}/>
                    <Route path="/report" element={<ReportPage />} />

                    <Route path="/home" element={<HomePage />} />
                    <Route path = "/dashboard" element={<Dashboard/>}/>
                    <Route path="/book" element={<BookingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/ChatBox" element={<ChatBox />} />


                    <Route path="/about" element={<AboutPage />} />
                    <Route path = "/IoTManagement" element={<IoTManagement/>}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;
