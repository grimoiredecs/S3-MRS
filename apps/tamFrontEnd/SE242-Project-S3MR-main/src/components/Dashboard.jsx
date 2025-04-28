import React from "react";
import '../../src/index.css';
import { useNavigate } from "react-router-dom";

const rooms = [
  "A4-501",
  "A4-101",
  "B1-202",
  "C5-405",
  "B4-601",
  "C6-101"
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <div className="room-grid">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="room-box"
            onClick={() => handleClick(room)}
          >
            <h3>{room}</h3>
            <p className="room-details-text">Click to view room details</p>
          </div>
        ))}
      </div>
    </div>
  );
}
