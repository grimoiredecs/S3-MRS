const {
    findAll,
    findAvailable,
    findByID,
    filterByEquipment
} = require('../persistence/roomRepository');

// 🧠 Internal helper
const ensureRoom = async (room_id) => {
    const room = await findByID(room_id);
    if (!room) throw new Error(`Room with ID ${room_id} not found`);
    return room;
};

// ✅ Public functions

const getAllRooms = async () => {
    return await findAll();
};

const getAvailableRooms = async () => {
    return await findAvailable();
};

const getRoomByID = async (room_id) => {
    return await ensureRoom(room_id);
};

const getRoomCondition = async (room_id) => {
    const room = await ensureRoom(room_id);
    return room.condition;
};

const getRoomAvailability = async (room_id) => {
    const room = await ensureRoom(room_id);
    return room.status;
};

const getRoomCapacity = async (room_id) => {
    const room = await ensureRoom(room_id);
    return room.capacity;
};

const getRoomEquipments = async (room_id) => {
    const room = await ensureRoom(room_id);
    return room.equipments;
};

const checkSeatAvailable = async (room_id) => {
    const room = await ensureRoom(room_id);
    return room.seat_remaining > 0;
};

const getRoomsByEquipment = async (equipmentKey, min = 1) => {
    return await filterByEquipment(equipmentKey, min);
};

const checkAvailableEquipment = getRoomsByEquipment; // alias

module.exports = {
    getAllRooms,
    getAvailableRooms,
    getRoomByID,
    getRoomCondition,
    getRoomAvailability,
    getRoomCapacity,
    getRoomEquipments,
    checkSeatAvailable,
    getRoomsByEquipment,
    checkAvailableEquipment
};