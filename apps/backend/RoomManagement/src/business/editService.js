const {
    save,
    update,
    findByID,
    checkRoomAvailability,
    updateRemainingSeats
} = require('../persistence/roomRepository');

// ✅ Create a new room
const createRoom = async (room) => {
    const existing = await findByID(room.room_id);
    if (existing) throw new Error('Room with this ID already exists');

    // Ensure the room's remaining seats are initialized correctly
    room.remainingSeats = room.capacity; // set initial remaining seats to room capacity

    const saved = await save(room);
    return saved;
};

// ✅ Update an existing room
const updateRoom = async (room) => {
    const existing = await findByID(room.room_id);
    if (!existing) throw new Error('Room not found');

    // If room status or capacity changes, we might need to recheck availability
    if (room.capacity !== existing.capacity) {
        const remainingSeats = await updateRemainingSeats(room.room_id, room.capacity);
        room.remainingSeats = remainingSeats;
    }

    const updated = await update(room);
    return updated;
};

// ✅ Change only the status of a room
const changeRoomStatus = async (room_id, newStatus) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    room.status = newStatus;
    const updated = await update(room);
    return updated;
};

// ✅ Change only the condition of a room
const changeRoomCondition = async (room_id, newCondition) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    room.condition = newCondition;
    const updated = await update(room);
    return updated;
};

// ✅ Check if a room has enough available seats
const checkRoomCapacity = async (room_id, userNumber) => {
    const room = await findByID(room_id);
    if (!room) throw new Error('Room not found');

    if (room.remainingSeats < userNumber) {
        throw new Error(`Room does not have enough seats. Required: ${userNumber}, Available: ${room.remainingSeats}`);
    }

    return room;
};

module.exports = {
    createRoom,
    updateRoom,
    changeRoomStatus,
    changeRoomCondition,
    checkRoomCapacity
};