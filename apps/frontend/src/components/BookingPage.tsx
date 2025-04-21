import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BookingPage.css";

// Room list and durations
const rooms = ["303-A4", "501-A4", "101-A4", "202-B1", "405-C5", "601-B4", "102-C6"];
const durations = ["30 minutes", "45 minutes", "1 hour", "2 hours", "3 hours"];
const privateRoomAvailable = ["501-A4", "202-B1", "405-C5", "102-C6"];
const seats = [1, 2, 3, 4, 5];

// Generate time in 15-minute intervals from 07:00 to 18:00
const times: string[] = [];
for (let hour = 7; hour <= 18; hour++) {
    for (let min = 0; min < 60; min += 15) {
        times.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
}

const BookingPage: React.FC = () => {
    const [room, setRoom] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [privateRoom, setPrivateRoom] = useState(false);
    const [booked, setBooked] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedYear = new Date(date).getFullYear();
        if (selectedYear !== 2025) {
            setError("❌ Only bookings in the year 2025 are allowed.");
            return;
        }

        if (!room || !date || !startTime || !duration || (!privateRoom && !userNumber)) {
            setError("❌ Please fill in all required fields.");
            return;
        }

        setError("");
        setBooked(true);
    };

    const handleReset = () => {
        setRoom("");
        setDate("");
        setStartTime("");
        setDuration("");
        setUserNumber("");
        setPrivateRoom(false);
        setBooked(false);
    };

    return (
        <div className="homepage">
            {/* Navbar */}
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <a href="#">Dashboard</a>
                    <Link to="/book">Book</Link>
                </div>
            </nav>

            {/* Main booking section */}
            <div className="booking-content">
                {!booked ? (
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <h2>Book a Study Room</h2>

                        <label>Select Room</label>
                        <select value={room} onChange={(e) => setRoom(e.target.value)} required>
                            <option value="">-- Choose a room --</option>
                            {rooms.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>

                        <label>Select Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            min="2025-01-01"
                            max="2025-12-31"
                        />

                        <label>Select Time</label>
                        <select value={startTime} onChange={(e) => setStartTime(e.target.value)} required>
                            <option value="">-- Choose a time --</option>
                            {times.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>

                        <label>Duration</label>
                        <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                            <option value="">-- Choose duration --</option>
                            {durations.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        {/* Private room toggle (only for supported rooms) */}
                        {privateRoomAvailable.includes(room) && (
                            <label>
                                <input
                                    type="checkbox"
                                    checked={privateRoom}
                                    onChange={(e) => setPrivateRoom(e.target.checked)}
                                />
                                {' '}Require private room
                            </label>
                        )}

                        {/* Number of users (only if not private room) */}
                        {!privateRoom && (
                            <>
                                <label>Number of users (1–5)</label>
                                <select value={userNumber} onChange={(e) => setUserNumber(e.target.value)} required>
                                    <option value="">-- Choose number of users --</option>
                                    {seats.map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit">Book Now</button>
                    </form>
                ) : (
                    <div className="booking-success">
                        <h3>🎉 Booking Confirmed!</h3>
                        <p><strong>Room:</strong> {room}</p>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {startTime}</p>
                        <p><strong>Duration:</strong> {duration}</p>
                        <p><strong>Private Room:</strong> {privateRoom ? "Yes" : "No"}</p>
                        <p><strong>Number of Users:</strong> {privateRoom ? "6+" : userNumber}</p>
                        <button onClick={handleReset}>Book Another</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;