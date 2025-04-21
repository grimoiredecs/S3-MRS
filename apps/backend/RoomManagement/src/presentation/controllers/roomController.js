const queryService = require('../../business/queryService');
const editService = require('../../business/editService');

// [GET] /api/rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await queryService.getAvailableRooms();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// [GET] /api/rooms/:id
const getRoomByID = async (req, res) => {
    try {
        const room = await queryService.getRoomByID(req.params.id);
        if (!room) return res.status(404).json({ error: 'Room not found' });
        res.json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// [POST] /api/rooms
const createRoom = async (req, res) => {
    try {
        await editService.createRoom(req.body);
        res.status(201).json({ message: 'Room created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// [PUT] /api/rooms/:id/status
const updateRoomStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await editService.changeRoomStatus(req.params.id, status);
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// [PUT] /api/rooms/:id/condition
const updateRoomCondition = async (req, res) => {
    try {
        const { condition } = req.body;
        await editService.changeRoomCondition(req.params.id, condition);
        res.json({ message: 'Condition updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// [GET] /api/rooms/:id/equipments
const getRoomEquipments = async (req, res) => {
    try {
        const data = await queryService.getRoomEquipments(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllRooms,
    getRoomByID,
    createRoom,
    updateRoomStatus,
    updateRoomCondition,
    getRoomEquipments
};