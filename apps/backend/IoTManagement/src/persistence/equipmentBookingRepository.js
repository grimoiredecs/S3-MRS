const pool = require('../database/db');

const EquipmentBookingRepository = {
    async create(equipmentBooking) {
        const { id, equipment_id, room_id, start_time, end_time } = equipmentBooking;
        const res = await pool.query(
            `INSERT INTO equipment_bookings (id, equipment_id, room_id, start_time, end_time)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [id, equipment_id, room_id, start_time, end_time]
        );
        return res.rows[0];
    },

    async findConflicts(equipmentId, startTime, endTime) {
        const res = await pool.query(
            `SELECT * FROM equipment_bookings
             WHERE equipment_id = $1 AND
                   start_time < $3 AND end_time > $2`,
            [equipmentId, startTime, endTime]
        );
        return res.rows;
    }
};

module.exports = EquipmentBookingRepository;
