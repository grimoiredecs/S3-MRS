// ✅ đúng cú pháp
import React from "react";
import { useParams } from "react-router-dom";

export default function RoomDetail() {
  const { roomId } = useParams();

  return (
    <div class = "welcome-box">
    <div style={{ color: "black", padding: "2rem" }}>
      <h2>Room Detail: {roomId}</h2>
      <ul  className="room-details-list">
        <li>💡 Lighting</li>
        <li>🔌 Power outlets</li>
        <li>📽️ Projector</li>
        <li>🧼 Whiteboard</li>
        <li>💻 Online Meeting Devices</li>
        <li>❄️ Air Conditioning</li>
      </ul>
    </div>
    </div>
  );
}
