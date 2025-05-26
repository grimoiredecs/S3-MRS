// controllers/roomController.js (Example)

const { RoomService } = require('../Services/RoomService');

const roomService = new RoomService(); // Instantiate the service

// GET /api/rooms/:id
exports.getRoomById = async (req, res, next) => {
    try {
        const roomId = parseInt(req.params.id, 10); // Ensure ID is an integer
        const room = await roomService.getRoomDetails(roomId);
        res.json(room);
    } catch (error) {
        // Use next(error) to pass errors to a global error handling middleware
        // This middleware can then decide appropriate HTTP status codes (404 for "not found", 400 for "invalid ID")
        next(error);
    }
};

// GET /api/rooms
exports.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (error) {
        next(error);
    }
};

// POST /api/rooms/:id/book
exports.bookSeatsInRoom = async (req, res, next) => {
    try {
        const roomId = parseInt(req.params.id, 10);
        const { numberOfSeats } = req.body; // Assuming the request body has { numberOfSeats: X }
        // You would get userId from the authenticated user (e.g., from req.currentUser set by API Gateway)
        const userId = req.currentUser ? req.currentUser.id : null; // Example: assuming req.currentUser is set by auth middleware

        const result = await roomService.bookSeats(roomId, numberOfSeats, { userId });
        res.status(200).json(result);
    } catch (error) {
        // Example of custom error handling by the controller or passed to global error middleware
        if (error.message.includes("Invalid") || error.message.includes("positive number")) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message.includes("Room with ID") && error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes("Not enough seats available")) {
            return res.status(409).json({ message: error.message }); // 409 Conflict for resource state
        }
        next(error); // Pass other errors to generic error handler
    }
};

// POST /api/rooms/:id/close (Example for setting unavailable)
exports.closeRoom = async (req, res, next) => {
    try {
        // Add authorization check here: Only admins can close rooms
        // if (!req.currentUser || !req.currentUser.roles.includes('admin')) {
        //     return res.status(403).json({ message: 'Forbidden: Admin access required to close rooms.' });
        // }

        const roomId = parseInt(req.params.id, 10);
        const result = await roomService.setRoomUnavailable(roomId);
        res.status(200).json(result);
    } catch (error) {
        if (error.message.includes("Room with ID") && error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};

// ... other controller methods