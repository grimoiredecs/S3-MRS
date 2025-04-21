const { findAll, findAvailable, findByID, filterByEquipment } = require('../persistence/roomRepository');

const getAvailableRooms = async () => {
    return await findAvailable();
};

const getRoomByID = async (room_id) => {
    return await findByID(room_id);
};

const getRoomCondition = async (room_id) => {
    const room = await findByID(room_id);
    return room?.condition;
};

const getRoomAvailability = async (room_id) => {
    const room = await findByID(room_id);
    return room?.status;
};

const getRoomCapacity = async (room_id) => {
    const room = await findByID(room_id);
    return room?.capacity;
};

const getRoomEquipments = async (room_id) => {
    const room = await findByID(room_id);
    return room?.equipments;
};

const checkAvailableEquipment = async (equipmentKey, min = 1) => {
    return await filterByEquipment(equipmentKey, min);
};

const checkPrivateSpace = async (room_id) => {
    const room = await findByID(room_id);
    return room?.has_private_space;
};

const checkSeatAvailable = async (room_id) => {
    const room = await findByID(room_id);
    return room?.seat_remaining > 0;
};

const getRoomsByEquipment = async (equipmentKey, min = 1) => {
    return await filterByEquipment(equipmentKey, min);
};

module.exports = {
    getAvailableRooms,
    getRoomByID,
    getRoomCondition,
    getRoomAvailability,
    getRoomCapacity,
    getRoomEquipments,
    checkAvailableEquipment,
    checkPrivateSpace,
    checkSeatAvailable,
    getRoomsByEquipment
};