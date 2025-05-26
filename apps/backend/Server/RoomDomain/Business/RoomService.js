// services/RoomService.js

// Import the RoomRepository we just refined
const { RoomRepository } = require('../Persistence/RoomRepository');

// Assume you might have other services for a complete booking system
// const { UserService } = require('./UserService');
// const { BookingRepository } = require('../repositories/BookingRepository');
// const { NotificationService } = require('./NotificationService');

class RoomService {
    constructor() {
        // Initialize repositories and other services this service depends on
        this.roomRepository = new RoomRepository();
        // this.userService = new UserService(); // Example dependency
        // this.bookingRepository = new BookingRepository(); // Example dependency
        // this.notificationService = new NotificationService(); // Example dependency
    }

    /**
     * Retrieves details for a specific room.
     * @param {number} roomId - The ID of the room.
     * @returns {Promise<object>} The room details object.
     * @throws {Error} If the room is not found.
     */
    async getRoomDetails(roomId) {
        // Basic input validation
        if (typeof roomId !== 'number' || roomId <= 0) {
            throw new Error("Invalid Room ID provided.");
        }

        const room = await this.roomRepository.getRoom(roomId);
        if (!room) {
            throw new Error(`Room with ID ${roomId} not found.`);
        }
        return room;
    }

    /**
     * Retrieves all rooms.
     * @returns {Promise<Array<object>>} An array of all room objects.
     */
    async getAllRooms() {
        return this.roomRepository.getAllRooms();
    }

    /**
     * Books a specified number of seats in a room.
     * This method includes business logic like checking availability and creating bookings.
     * @param {number} roomId - The ID of the room to book seats in.
     * @param {number} numberOfSeatsToBook - The number of seats to book.
     * @param {object} bookingDetails - Additional details for the booking (e.g., userId).
     * @returns {Promise<object>} The updated room details after booking.
     * @throws {Error} If the room is not found, not enough seats are available, or other booking errors occur.
     */
    async bookSeats(roomId, numberOfSeatsToBook, bookingDetails = {}) {
        // 1. Business Logic - Input Validation
        if (typeof roomId !== 'number' || roomId <= 0) {
            throw new Error("Invalid Room ID provided for booking.");
        }
        if (typeof numberOfSeatsToBook !== 'number' || numberOfSeatsToBook <= 0) {
            throw new Error("Number of seats to book must be a positive number.");
        }

        try {
            // 2. Orchestration - Delegate to RoomRepository for atomic seat update
            const updatedRoom = await this.roomRepository.updateRemainingSeats(roomId, numberOfSeatsToBook);

            // 3. Further Business Logic / Orchestration (Example: creating a booking record)
            // This would typically involve another repository/service for 'bookings'
            // await this.bookingRepository.createBooking({
            //     roomId: roomId,
            //     userId: bookingDetails.userId, // Assuming userId comes from a higher layer (controller/auth)
            //     seatsBooked: numberOfSeatsToBook,
            //     bookingDate: new Date()
            // });

            // 4. Orchestration - Example: Send a notification
            // if (updatedRoom.remaining === 0) {
            //     await this.notificationService.sendNotification(
            //         `Room ${updatedRoom.id} is now fully booked!`,
            //         'admin@example.com'
            //     );
            // }

            // 5. Return updated state
            return {
                message: `Successfully booked ${numberOfSeatsToBook} seats in room ${roomId}.`,
                room: updatedRoom
            };

        } catch (error) {
            // 6. Error Handling - Translate repository errors into more specific business errors
            if (error.message.includes("Not enough seats or room not found")) {
                // You could distinguish between "not found" and "not enough seats"
                // based on the repository's error detail, if it provided more.
                const room = await this.roomRepository.getRoom(roomId);
                if (!room) {
                    throw new Error(`Booking failed: Room with ID ${roomId} not found.`);
                } else if (room.remaining < numberOfSeatsToBook) {
                    throw new Error(`Booking failed: Not enough seats available in room ${roomId}. Remaining: ${room.remaining}`);
                }
                // Fallback for general "not enough seats" or unexpected repo error
                throw new Error(`Booking failed for room ${roomId}: Not enough seats available or another issue occurred.`);
            }
            // Re-throw other unexpected errors
            throw new Error(`An unexpected error occurred during booking for room ${roomId}: ${error.message}`);
        }
    }

    /**
     * Manually sets a room as unavailable (remaining seats to 0, condition to false).
     * This could be used for maintenance, closing, etc.
     * @param {number} roomId - The ID of the room to make unavailable.
     * @returns {Promise<object>} The updated room details.
     * @throws {Error} If the room is not found.
     */
    async setRoomUnavailable(roomId) {
        if (typeof roomId !== 'number' || roomId <= 0) {
            throw new Error("Invalid Room ID provided.");
        }

        try {
            const updatedRoom = await this.roomRepository.setRoomUnavailable(roomId);
            // Further business logic, e.g., cancel existing bookings for this room
            // await this.bookingService.cancelBookingsForRoom(roomId);
            return {
                message: `Room ${roomId} has been made unavailable.`,
                room: updatedRoom
            };
        } catch (error) {
            if (error.message.includes("Room with ID") && error.message.includes("not found")) {
                throw new Error(`Cannot make room unavailable: Room with ID ${roomId} not found.`);
            }
            throw new Error(`Failed to set room ${roomId} unavailable: ${error.message}`);
        }
    }

    // You could add more methods here:
    // async addRoom(capacity, initialRemaining, condition) { ... }
    // async deleteRoom(roomId) { ... }
    // async promoteCondition(roomId) // If you need a specific business case to set condition to TRUE (remaining > 0)
}

module.exports = { RoomService };