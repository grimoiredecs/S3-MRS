
const pool = require('../database/postgres');

// ✅ Create a new room with equipment (Transactional)
const createRoom = async (room) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            room_id,
            capacity,
            status,
            condition,
            seat_remaining,
            equipments
        } = room;

        await client.query(
            `INSERT INTO rooms (room_id, capacity, status, condition, seat_remaining)
             VALUES ($1, $2, $3, $4, $5)`,
            [room_id, capacity, status, condition, seat_remaining]
        );

        await client.query(
            `INSERT INTO equipments (room_id, projector, whiteboard, mini_monitor)
             VALUES ($1, $2, $3, $4)`,
            [
                room_id,
                equipments.projector || 0,
                equipments.whiteboard || 0,
                equipments.mini_monitor || 0
            ]
        );

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

// ✅ Read: Get room by ID
const getRoomById = async (room_id) => {
    const res = await pool.query(
        `SELECT * FROM rooms r
         JOIN equipments e ON r.room_id = e.room_id
         WHERE r.room_id = $1`,
        [room_id]
    );
    return res.rows[0];
};

// ✅ Read: Get all rooms
const getAllrooms = async () => {
    const res = await pool.query(`SELECT * FROM rooms`);
    return res.rows;
};

// ✅ Update room and equipment (Transactional)
const updateRoom = async (room) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            room_id,
            capacity,
            status,
            condition,
            seat_remaining,
            equipments
        } = room;

        await client.query(
            `UPDATE rooms SET
             capacity = $1,
             status = $2,
             condition = $3,
             seat_remaining = $4
             WHERE room_id = $5`,
            [capacity, status, condition, seat_remaining, room_id]
        );

        await client.query(
            `UPDATE equipments SET
             projector = $1,
             whiteboard = $2,
             mini_monitor = $3
             WHERE room_id = $4`,
            [
                equipments.projector || 0,
                equipments.whiteboard || 0,
                equipments.mini_monitor || 0,
                room_id
            ]
        );

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

/*
// ✅ Delete room and its equipment
const deleteRoom = async (room_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM equipments WHERE room_id = $1', [room_id]);
        await client.query('DELETE FROM rooms WHERE room_id = $1', [room_id]);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
*/

module.exports = {
    createRoom,
    getRoomById,
    getAllrooms,
    updateRoom,
};
