DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id VARCHAR(7) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  year INTEGER CHECK (year >= 1 AND year <= 5),
  password TEXT NOT NULL
);

select * from students