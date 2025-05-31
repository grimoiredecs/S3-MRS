import { Room } from '../Persistence/Room.js';

class RoomServices {
    constructor() {
        this.roomRepository = new Room();
    }

    async getRoomDetails(roomId) {
        if (typeof roomId !== 'number' || roomId <= 0) {
            throw new Error("Invalid Room ID provided.");
        }

        const room = await this.roomRepository.getRoom(roomId);
        if (!room) {
            throw new Error(`Room with ID ${roomId} not found.`);
        }
        return room;
    }

    async getAllRooms() {
        return this.roomRepository.getAllRooms();
    }

    async bookSeats(roomId, numberOfSeatsToBook, bookingDetails = {}) {
        if (typeof roomId !== 'number' || roomId <= 0) {
            throw new Error("Invalid Room ID provided for booking.");
        }
        if (typeof numberOfSeatsToBook !== 'number' || numberOfSeatsToBook <= 0) {
            throw new Error("Number of seats to book must be a positive number.");
        }

        try {
            const updatedRoom = await this.roomRepository.updateRemainingSeats(roomId, numberOfSeatsToBook);

            // Example orchestration: save booking or send notification here later if needed
            return {
                message: `Successfully booked ${numberOfSeatsToBook} seats in room ${roomId}.`,
                room: updatedRoom
            };

        } catch (error) {
            const room = await this.roomRepository.getRoom(roomId);
            if (!room) {
                throw new Error(`Booking failed: Room with ID ${roomId} not found.`);
            } else if (room.remaining < numberOfSeatsToBook) {
                throw new Error(`Booking failed: Not enough seats available in room ${roomId}. Remaining: ${room.remaining}`);
            }
            throw new Error(`Booking failed for room ${roomId}: ${error.message}`);
        }
    }

    async setRoomUnavailable(roomId) {
        if (typeof roomId !== 'number' || roomId <= 0) {
            throw new Error("Invalid Room ID provided.");
        }

        try {
            const updatedRoom = await this.roomRepository.setRoomUnavailable(roomId);
            return {
                message: `Room ${roomId} has been made unavailable.`,
                room: updatedRoom
            };
        } catch (error) {
            if (error.message.includes("not found")) {
                throw new Error(`Cannot make room unavailable: Room with ID ${roomId} not found.`);
            }
            throw new Error(`Failed to set room ${roomId} unavailable: ${error.message}`);
        }
    }
}

export { RoomServices };