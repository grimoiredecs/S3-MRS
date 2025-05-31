// Persistence/Room.js (ES Module version)

// Import the 'pool' default export from the postgres.js module
import pool from '../Database/postgres.js'; // IMPORTANT: Note the .js extension

class Room {

    /**
     * Fetches a single room by ID.
     * @param {string} id - The ID of the room (e.g., '505-A4').
     * @returns {Promise<object|undefined>} The room object if found, otherwise undefined.
     */
    async getRoom(id) {
        // IMPORTANT: Use parameterized queries ($1, $2, etc.) to prevent SQL Injection
        const query = `SELECT id, capacity, remaining, condition FROM Room WHERE id = $1`;
        const res = await pool.query(query, [id]); // Pass parameters as an array
        return res.rows[0]; // Returns undefined if not found
    }

    /**
     * Fetches all rooms.
     * @returns {Promise<Array<object>>} An array of room objects.
     */
    async getAllRooms() {
        const query = `SELECT id, capacity, remaining, condition FROM Room`;
        const res = await pool.query(query);
        return res.rows; // Returns an array of room objects
    }

    /**
     * Atomically updates remaining seats and automatically manages 'condition' based on DB constraints.
     * @param {string} roomId - The ID of the room.
     * @param {number} numberOfSeatsToBook - The number of seats to book.
     * @returns {Promise<object>} The updated room object.
     * @throws {Error} If booking fails (e.g., non-positive seats, not enough seats, room not found).
     */
    async updateRemainingSeats(roomId, numberOfSeatsToBook) {
        if (numberOfSeatsToBook <= 0) {
            throw new Error("Number of seats to book must be positive.");
        }

        // Use a single ATOMIC UPDATE statement to prevent race conditions.
        // The database's CHECK constraints will handle 'condition' automatically.
        const query = `
            UPDATE Room
            SET
                remaining = GREATEST(0, remaining - $1), -- Ensure remaining doesn't go below 0
                condition = CASE
                                WHEN GREATEST(0, remaining - $1) = 0 THEN FALSE
                                ELSE TRUE
                            END
            WHERE
                id = $2 AND remaining >= $1 -- Only update if enough seats are available
            RETURNING id, capacity, remaining, condition;
        `;
        // Note: The `remaining >= $1` in the WHERE clause is crucial for pessimistic locking or
        // to simply fail if not enough seats are available at the time of the update attempt.

        const res = await pool.query(query, [numberOfSeatsToBook, roomId]);

        if (res.rows.length === 0) {
            // This means either the room wasn't found, or there weren't enough remaining seats.
            // The service layer (or higher) should handle this specific business error.
            throw new Error(`Failed to update room ${roomId}: Not enough seats or room not found.`);
        }

        return res.rows[0]; // Return the updated room object
    }

    /**
     * This method is considered problematic as 'condition' should ideally be derived from 'remaining'.
     * It will throw an error as per the original design.
     * @param {string} roomId - The ID of the room.
     * @throws {Error} Always throws an error, indicating it should be re-evaluated.
     */
    async changeCondition(roomId) {
        console.warn("`changeCondition` method is often a sign of misaligned responsibilities. " +
            "Room condition should ideally be derived from 'remaining' seats, " +
            "which your database constraints now enforce. " +
            "Consider if this should be a business logic method that adjusts 'remaining' seats.");

        throw new Error("`changeCondition` method should be re-evaluated. " +
            "The 'condition' is handled by database constraints based on 'remaining' seats.");
    }

    /**
     * Sets a room's remaining seats to 0 and thus its condition to false.
     * @param {string} roomId - The ID of the room.
     * @returns {Promise<object>} The updated room object.
     * @throws {Error} If the room is not found.
     */
    async setRoomUnavailable(roomId) {
        const query = `
            UPDATE Room
            SET
                remaining = 0,
                condition = FALSE
            WHERE
                id = $1
            RETURNING id, capacity, remaining, condition;
        `;
        const res = await pool.query(query, [roomId]);
        if (res.rows.length === 0) {
            throw new Error(`Room with ID ${roomId} not found.`);
        }
        return res.rows[0];
    }
}

// Export the Room class using ES Module named export
export { Room };