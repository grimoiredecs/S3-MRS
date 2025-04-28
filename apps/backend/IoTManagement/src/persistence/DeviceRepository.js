const pool = require('../database/db');

// Find all devices
const findAllDevices = async () => {
    const res = await pool.query(`SELECT * FROM devices`);
    return res.rows;
};

// Find device by ID
const findDeviceById = async (id) => {
    const res = await pool.query(`SELECT * FROM devices WHERE id = $1`, [id]);
    return res.rows[0];
};

// Create a new device
const createDevice = async (device) => {
    const { id, room_id, type, status } = device;
    const res = await pool.query(`
                INSERT INTO devices (id, room_id, type, status)
                VALUES ($1, $2, $3, $4)
                    RETURNING *`,
        [id, room_id, type, status]);
    return res.rows[0];
};

// Update device (general)
const updateDevice = async (id, device) => {
    const { status } = device;
    const res = await pool.query(`
                UPDATE devices
                SET status = $1
                WHERE id = $2
                    RETURNING *`,
        [status, id]);
    return res.rows[0];
};

// Turn device ON (status = true)
const turnDeviceOn = async (id) => {
    const res = await pool.query(`
        UPDATE devices
        SET status = true
        WHERE id = $1
        RETURNING *`,
        [id]);
    return res.rows[0];
};

// Turn device OFF (status = false)
const turnDeviceOff = async (id) => {
    const res = await pool.query(`
                UPDATE devices
                SET status = false
                WHERE id = $1
                    RETURNING *`,
        [id]);
    return res.rows[0];
};

// Delete a device
const deleteDevice = async (id) => {
    await pool.query(`DELETE FROM devices WHERE id = $1`, [id]);
};

// Log an issue for a device
const logIssue = async (device_id, timestamp, issue_description) => {
    const res = await pool.query(`
        INSERT INTO device_issues (device_id, timestamp, issue_description)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [device_id, timestamp, issue_description]);
    return res.rows[0];
};

// Get all issues by device
const getIssuesByDevice = async (device_id) => {
    const res = await pool.query(`
        SELECT * FROM device_issues
        WHERE device_id = $1
        ORDER BY timestamp DESC`,
        [device_id]);
    return res.rows;
};

module.exports = {
    findAllDevices,
    findDeviceById,
    createDevice,
    updateDevice,
    turnDeviceOn,
    turnDeviceOff,
    deleteDevice,
    logIssue,
    getIssuesByDevice
};
