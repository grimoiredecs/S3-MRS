const {
    save,
    update,
    findByID
} = require('../persistence/roomRepository');

const { produceRoomEvent } = require('../events/roomProducer');

// ✅ Create a new room and emit ROOM_CREATED event
const createRoom = async (room) => {
    const existing = await findByID(room.room_id);
    if (existing) throw new Error('Room with this ID already exists');

    const saved = await save(room);
    await produceRoomEvent('ROOM_CREATED', room);

    return saved;
};

// ✅ Update an existing room and emit ROOM_UPDATED
const updateRoom = async (room) => {
    const existing = await findByID(room.room_id);
    if (!existing) throw new Error('Room not found');

    const updated = await update(room);
    await produceRoomEvent('ROOM_UPDATED', room);

    return updated;
};

// ✅ Change only the status of a room
const changeRoomStatus = async (room_id, newStatus) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    room.status = newStatus;
    const updated = await update(room);
    await produceRoomEvent('ROOM_STATUS_CHANGED', { room_id, status: newStatus });

    return updated;
};

// ✅ Change only the condition of a room
const changeRoomCondition = async (room_id, newCondition) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    room.condition = newCondition;
    const updated = await update(room);
    await produceRoomEvent('ROOM_CONDITION_CHANGED', { room_id, condition: newCondition });

    return updated;
};

module.exports = {
    createRoom,
    updateRoom,
    changeRoomStatus,
    changeRoomCondition
};