DROP TABLE IF EXISTS equipments;
DROP TABLE IF EXISTS rooms;

-- Room Table (name removed)
CREATE TABLE rooms (
    room_id VARCHAR(10) PRIMARY KEY,         -- e.g., '501-A4'
    capacity INT NOT NULL,
    status VARCHAR(10) CHECK (status IN ('available', 'full')),
    has_private_space BOOLEAN,
    condition VARCHAR(20) CHECK (condition IN ('ready', 'under_repair')),
    seat_remaining INT
);

-- Equipments Table
CREATE TABLE equipments (
    room_id VARCHAR(10) PRIMARY KEY REFERENCES rooms(room_id) ON DELETE CASCADE,
    projector INT DEFAULT 0 CHECK (projector >= 0),
    whiteboard INT DEFAULT 0 CHECK (whiteboard >= 0),
    mini_monitor INT DEFAULT 0 CHECK (mini_monitor >= 0)
);


-- Insert Room
INSERT INTO rooms (room_id, capacity, status, has_private_space, condition, seat_remaining)
VALUES ('501-A4', 6, 'available', TRUE, 'ready', 6);

-- Insert Equipment
INSERT INTO equipments (room_id, projector, whiteboard, mini_monitor)
VALUES ('501-A4', 1, 1, 0);


SELECT * from rooms