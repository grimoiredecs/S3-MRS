import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Report from "./components/Report.jsx";
import RoomDetail from "./components/RoomDetail.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="report" element={<Report />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);