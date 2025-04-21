const pool = require('../database/db');

// 1. Save Room + Equipment (Transactional)
const save = async (room) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const {
            room_id,
            capacity,
            status,
            has_private_space,
            condition,
            seat_remaining,
            equipments
        } = room;

        await client.query(
            `INSERT INTO rooms (room_id, capacity, status, has_private_space, condition, seat_remaining)
       VALUES ($1, $2, $3, $4, $5, $6)`,
            [room_id, capacity, status, has_private_space, condition, seat_remaining]
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

// 2. Find Available Rooms
const findAvailable = async () => {
    const res = await pool.query(`
    SELECT * FROM rooms r 
    JOIN equipments e ON r.room_id = e.room_id
    WHERE r.status = 'available'
  `);
    return res.rows;
};

// 3. Find All Rooms
const findAll = async () => {
    const res = await pool.query(`
    SELECT * FROM rooms r 
    JOIN equipments e ON r.room_id = e.room_id
  `);
    return res.rows;
};

// 4. Filter by Equipment
const filterByEquipment = async (equipmentKey, minValue = 1) => {
    const validKeys = ['projector', 'whiteboard', 'mini_monitor'];
    if (!validKeys.includes(equipmentKey)) throw new Error('Invalid equipment type');

    const query = `
    SELECT * FROM rooms r
    JOIN equipments e ON r.room_id = e.room_id
    WHERE e.${equipmentKey} >= $1
  `;
    const res = await pool.query(query, [minValue]);
    return res.rows;
};

// 5. Find By ID
const findByID = async (room_id) => {
    const res = await pool.query(`
    SELECT * FROM rooms r
    JOIN equipments e ON r.room_id = e.room_id
    WHERE r.room_id = $1
  `, [room_id]);
    return res.rows[0];
};

// 6. Update Room + Equipment (transactional)
const update = async (room) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const {
            room_id,
            capacity,
            status,
            has_private_space,
            condition,
            seat_remaining,
            equipments
        } = room;

        await client.query(
            `UPDATE rooms SET 
        capacity = $1,
        status = $2,
        has_private_space = $3,
        condition = $4,
        seat_remaining = $5
      WHERE room_id = $6`,
            [capacity, status, has_private_space, condition, seat_remaining, room_id]
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

module.exports = {
    save,
    findAvailable,
    findAll,
    filterByEquipment,
    findByID,
    update
};