// repositories/RoomRepository.js (assuming it's in a 'repositories' folder)

const pool = require('../Database/postgres'); // Ensure this path is correct

class RoomRepository {

    // Fetches a single room by ID
    async getRoom(id) {
        // IMPORTANT: Use parameterized queries ($1, $2, etc.) to prevent SQL Injection
        const query = `SELECT id, capacity, remaining, condition FROM Room WHERE id = $1`;
        const res = await pool.query(query, [id]); // Pass parameters as an array
        return res.rows[0]; // Returns undefined if not found
    }

    // Fetches all rooms
    async getAllRooms() {
        const query = `SELECT id, capacity, remaining, condition FROM Room`;
        const res = await pool.query(query);
        return res.rows; // Returns an array of room objects
    }

    // Atomically updates remaining seats and automatically manages 'condition' based on DB constraints
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


    // This method is likely not needed or should be used with extreme caution.
    // The 'condition' should be derived from 'remaining' seats, enforced by DB constraints.
    // If you explicitly need to force a condition change (e.g., manual override),
    // then you'd need different logic and potentially bypass the check constraint temporarily (not recommended).
    // Let's assume for now, it's tied to 'remaining'.
    // If you still want a method that might set a room to 'false' condition if 0 seats are left,
    // this logic is now integrated into `updateRemainingSeats`.
    // If it's to explicitly set a room to "unavailable" for other reasons,
    // you'd need a new column like 'is_available' independent of 'remaining'.
    //
    // For now, I'll remove it as the database constraints make it redundant
    // for tying 'condition' to 'remaining'.
    // If you need a method to 'close' a room (e.g., set remaining to 0 and condition to false),
    // that would be a separate business logic function in the service layer
    // that calls `updateRemainingSeats` with the appropriate number.
    async changeCondition(roomId) {
        console.warn("`changeCondition` method is often a sign of misaligned responsibilities. " +
            "Room condition should ideally be derived from 'remaining' seats, " +
            "which your database constraints now enforce. " +
            "Consider if this should be a business logic method that adjusts 'remaining' seats.");

        // If you MUST manually set condition, it bypasses the direct DB check.
        // A direct update to set condition to FALSE if remaining is 0 might look like this:
        // const query = `
        //     UPDATE Room
        //     SET condition = FALSE
        //     WHERE id = $1 AND remaining = 0
        //     RETURNING *;
        // `;
        // const res = await pool.query(query, [roomId]);
        // return res.rows[0];
        //
        // This is complex because your DB constraint for `condition` already prevents this
        // if `remaining` isn't 0. The best way is to manage `remaining` seats,
        // and let the DB handle `condition`.
        throw new Error("`changeCondition` method should be re-evaluated. " +
            "The 'condition' is handled by database constraints based on 'remaining' seats.");
    }

    // New: Method to set remaining seats to 0 and thus condition to false
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

// Use module.exports for consistency with require()
module.exports = { RoomRepository };