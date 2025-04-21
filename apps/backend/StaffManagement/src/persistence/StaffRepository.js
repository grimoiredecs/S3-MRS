const db = require('../database/db');
const generateStaffId = require('../utils/generateStaffId');

const StaffRepository = {
    save: async (staff) => {
        const { full_name, role, email, phone_number, password } = staff;
        const staff_id = generateStaffId();
        const result = await db.query(
            'INSERT INTO staff (staff_id, full_name, role, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [staff_id, full_name, role, email, phone_number, password]
        );
        return result.rows[0];
    },

    findAll: async () => {
        const result = await db.query('SELECT * FROM staff');
        return result.rows;
    },

    findByID: async (id) => {
        const result = await db.query('SELECT * FROM staff WHERE staff_id = $1', [id]);
        return result.rows[0];
    },

    updateData: async (id, staff) => {
        const { full_name, role, email, phone_number, password } = staff;
        const result = await db.query(
            'UPDATE staff SET full_name = $1, role = $2, email = $3, phone_number = $4, password = $5 WHERE staff_id = $6 RETURNING *',
            [full_name, role, email, phone_number, password, id]
        );
        return result.rows[0];
    },

    findByRole: async (role) => {
        const result = await db.query('SELECT * FROM staff WHERE role = $1', [role]);
        return result.rows;
    },

    findByEmail: async (email) => {
        const result = await db.query('SELECT * FROM staff WHERE email = $1', [email]);
        return result.rows[0];
    },

    delete: async (id) => {
        await db.query('DELETE FROM staff WHERE staff_id = $1', [id]);
    },
    create: async (staff) => {
        const { full_name, role, email, phone_number, password } = staff;
        const staff_id = generateStaffId();
        const result = await db.query(
            'INSERT INTO staff (staff_id, full_name, role, email, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [staff_id, full_name, role, email, phone_number, password]
        );
        return result.rows[0];
    },
};

module.exports = StaffRepository;