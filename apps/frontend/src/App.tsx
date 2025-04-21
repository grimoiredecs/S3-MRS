import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginBox from "./components/LoginBox";
import HomePage from "./components/HomePage"; // Make sure this is implemented
import BookingPage from "./components/BookingPage.tsx";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Routes>
                    <Route path="/" element={<LoginBox />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/book" element={<BookingPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
