import pool from '../Database/postgres.js';

class Student {
    async getStudent(id) {
        const query = `SELECT * FROM student WHERE id = $1`;
        const res = await pool.query(query, [id]);
        return res.rows[0];
    }

    async exists(studentId) {
        const query = `SELECT 1 FROM Student WHERE id = $1`;
        const result = await pool.query(query, [studentId]);
        return result.rowCount > 0;
    }
    async getAllStudents() {
        const query = `SELECT * FROM student`;
        const res = await pool.query(query);
        return res.rows;
    }
}

export { Student };