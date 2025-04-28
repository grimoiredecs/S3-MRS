import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import {Link} from "react-router-dom";
import axios from "axios";
import "./BookingPage.css";
import "./LoginBox"


// types/Booking.ts
export interface Booking {
    _id: string;
    userId: string;
    roomId: string;
    startTime: string;
    endTime: string;
    userNumber: number;
    createdAt: string;
    updatedAt: string;
}

const durations = ["30 minutes", "45 minutes", "1 hour", "2 hours"];
const seats = [1, 2, 3, 4, 5];

// Generate time slots in 15-minute intervals
const times: string[] = [];
for (let hour = 7; hour <= 18; hour++) {
    for (let min = 0; min < 60; min += 15) {
        times.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
    }
}

const BookingPage: React.FC = () => {
    const userId = localStorage.getItem("userId");
    const [rooms, setRooms] = useState<any[]>([]);
    const [room, setRoom] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [booked, setBooked] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:3003/rooms");
                console.log("Fetched rooms:", response.data);
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedYear = new Date(date).getFullYear();
        if (selectedYear !== 2025) {
            setError("❌ Only bookings in the year 2025 are allowed.");
            return;
        }

        if (!room || !date || !startTime || !duration || !userNumber) {
            setError("❌ Please fill in all required fields.");
            return;
        }

        setError("");

        const startDateTime = new Date(`${date}T${startTime}:00`);
        const endDateTime = new Date(startDateTime);
        const durationMinutes = parseInt(duration.split(" ")[0], 10);
        endDateTime.setMinutes(startDateTime.getMinutes() + durationMinutes);

        const bookingPayload = {
            userId: userId,
            roomId: room,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            userNumber: Number(userNumber)
        };

        try {
            console.log("📦 Sending booking payload:", bookingPayload);
            const res = await axios.post("http://localhost:3003/bookings", bookingPayload);
            console.log("✅ Booking confirmed:", res.data);
            setBooked(true);
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                setError(`❌ Booking failed: ${err.response?.data?.error || err.message}`);
            } else {
                setError("❌ Booking failed due to an unexpected error.");
            }
        }
    };

    const handleReset = () => {
        setRoom("");
        setDate("");
        setStartTime("");
        setDuration("");
        setUserNumber("");
        setBooked(false);
    };

    return (
        <div className="homepage">
            <nav className="navbar">
                <img src="/bklogo.png" alt="BK Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to = "/Dashboard">Dashboard</Link>
                    <Link to="/book">Book</Link>
                </div>
            </nav>

            <div className="booking-content">
                {!booked ? (
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <h2>Book a Study Room</h2>

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

                        <label>Select Room</label>
                        <select value={room} onChange={(e) => setRoom(e.target.value)} required>
                            <option value="">-- Choose a room --</option>
                            {rooms.map((r) => (
                                <option key={r.room_id} value={r.room_id}>
                                    {r.room_id} (Seats left: {r.seat_remaining})
                                </option>
                            ))}
                        </select>

                        <label>Duration</label>
                        <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                            <option value="">-- Choose duration --</option>
                            {durations.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        <label>Number of users (1–5)</label>
                        <select value={userNumber} onChange={(e) => setUserNumber(e.target.value)} required>
                            <option value="">-- Choose number of users --</option>
                            {seats.map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>

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
                        <p><strong>Number of Users:</strong> {userNumber}</p>
                        <button onClick={handleReset}>Book Another</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
