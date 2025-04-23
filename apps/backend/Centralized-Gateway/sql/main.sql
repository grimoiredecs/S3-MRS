CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,  -- 10-character max ID
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'staff', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

INSERT INTO users (id, email, password_hash, role) VALUES
('2450001', 'student1@hcmut.edu.vn', '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'student'),
('2450002', 'student2@hcmut.edu.vn', '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'student'),
('2350001', 'student3@hcmut.edu.vn', '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'student'),
('2250001', 'student4@hcmut.edu.vn', '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'student'),
('2750001', 'staff1@hcmut.edu.vn',  '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'staff'),
('2750002', 'staff2@hcmut.edu.vn',  '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'staff'),
('2850001', 'admin1@hcmut.edu.vn',  '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u', 'admin');

INSERT INTO users (id, email, password_hash, role) VALUES
('2252304', 'man@hcmut.edu.vn','123','student')

INSERT INTO users (id, email, password_hash, role) VALUES
('2852304', 'staff3@hcmut.edu.vn','456','admin')

UPDATE users
SET password_hash = '$2b$10$X6OaZt2XrE7BLfy3N.q05uY2K0m.PFosCCS3eePv2y3hyv1B1uN5u'
WHERE email = 'admink@hcmut.edu.vn';

INSERT INTO users (id, email, password_hash, role) VALUES
('2852344', 'admink@hcmut.edu.vn','$2b$10$1gisxKxoCTND0V5O5jlDzuYFzQw06lptiGXaby3FuAKodbUH.lUnu','admin')

SELECT * FROM users WHERE email = 'student1@hcmut.edu.vn';
select * from users