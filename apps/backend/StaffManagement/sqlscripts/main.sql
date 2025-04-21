DROP TABLE IF EXISTS staff;

CREATE TABLE staff (
    staff_id CHAR(8) PRIMARY KEY,  -- 8-digit string
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL
);