CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY,
    student_id VARCHAR(7) NOT NULL,
    room_id VARCHAR(10) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    user_number INTEGER NOT NULL CHECK (user_number BETWEEN 1 AND 6),
    is_private BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);