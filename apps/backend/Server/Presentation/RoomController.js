// Presentation/RoomController.js
import express from 'express';
import { RoomServices } from '../Business/RoomServices.js';
import {Room} from '../Persistence/Room.js';

function createRoomController() {
    const router = express.Router();
    const roomService = new RoomServices(Room); // pass model if needed in constructor

    router.get('/', async (req, res, next) => {
        try {
            const rooms = await roomService.getAllRooms();
            res.json(rooms);
        } catch (err) {
            next(err);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const roomId = parseInt(req.params.id, 10);
            const room = await roomService.getRoomDetails(roomId);
            res.json(room);
        } catch (err) {
            next(err);
        }
    });

    router.post('/:id/book', async (req, res, next) => {
        try {
            const roomId = parseInt(req.params.id, 10);
            const { seats, userId } = req.body;

            const result = await roomService.bookSeats(roomId, seats, { userId });
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

    router.patch('/:id/unavailable', async (req, res, next) => {
        try {
            const roomId = parseInt(req.params.id, 10);
            const result = await roomService.setRoomUnavailable(roomId);
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

    return router;
}

export default createRoomController;