

import React, { useEffect, useState } from "react";

import "./Dashboard.css"
const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
      });
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking: any, index: number) => (
          <li key={index}>
            Room: {booking.roomId}, Time: {new Date(booking.startTime).toLocaleString()} – {new Date(booking.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;