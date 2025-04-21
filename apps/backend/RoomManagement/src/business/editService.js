const { save, update } = require('../persistence/roomRepository');
const { findByID } = require('../persistence/roomRepository');

// ✅ Create a new room with equipment
const createRoom = async (room) => {
    return await save(room);
};

// ✅ Update full room object (after fetching it)
const updateRoom = async (room) => {
    return await update(room);
};

// ✅ Change status only
const changeRoomStatus = async (room_id, newStatus) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    room.status = newStatus;
    return await update(room);
};

// ✅ Change condition only
const changeRoomCondition = async (room_id, newCondition) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    room.condition = newCondition;
    return await update(room);
};

module.exports = {
    createRoom,
    updateRoom,
    changeRoomStatus,
    changeRoomCondition
};