import React from "react";

export default function Report() {
  // Sample data for the report table
  const reports = [
    { time: "2025-04-22 08:00", room: "A4-501", device: "Projector", issue: "Not working" },
    { time: "2025-04-22 09:00", room: "A4-101", device: "Air Conditioning", issue: "Too cold" },
    { time: "2025-04-22 10:30", room: "B1-202", device: "Lighting", issue: "Flickering" },
    { time: "2025-04-22 11:15", room: "C5-405", device: "Whiteboard", issue: "Needs cleaning" },
    // Add more reports as needed
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div>
        <h2 style={{ color: "black", textAlign: "center", marginTop: "2rem" ,backgroundColor: "white", 
    padding: "1rem", 
    borderRadius: "8px", }}>
          Student reports
        </h2>
        <div className = "center-box">
          <div className = "welcome-box">
        <table style={{ width: "80%", margin: "2rem auto", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Time</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Room</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Device</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Issue</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{report.time}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{report.room}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{report.device}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{report.issue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
}
