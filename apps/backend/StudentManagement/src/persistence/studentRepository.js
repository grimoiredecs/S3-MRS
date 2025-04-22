const pool = require('../database/db');

class StudentRepository {
    async save(student) {
        const query = `
            INSERT INTO students (id, first_name, last_name, email, password, year)
            VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
        `;
        const values = [
            student.id,
            student.first_name,
            student.last_name,
            student.email,
            student.password,
            student.year
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
    }

    async findById(id) {
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        return result.rows[0];
    }

    async findAll() {
        const result = await pool.query('SELECT * FROM students');
        return result.rows;
    }
}

module.exports = { StudentRepository };