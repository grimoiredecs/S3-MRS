const pool = require('../database/db'); // your PostgreSQL connection

const StudentRepository = {
    async getAll() {
        const result = await pool.query('SELECT * FROM students ORDER BY id');
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        return result.rows[0];
    },

    async create(student) {
        const { id, first_name, last_name, email, year, password } = student;

        await pool.query(
            `INSERT INTO students (id, first_name, last_name, email, year, password)
       VALUES ($1, $2, $3, $4, $5, $6)`,
            [id, first_name, last_name, email, year, password]
        );
    },

    async update(id, data) {
        const fields = [];
        const values = [];
        let i = 1;

        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = $${i++}`);
            values.push(value);
        }

        values.push(id);

        const query = `UPDATE students SET ${fields.join(', ')} WHERE id = $${i}`;
        await pool.query(query, values);
    },

    async delete(id) {
        await pool.query('DELETE FROM students WHERE id = $1', [id]);
    },
};

module.exports = StudentRepository;