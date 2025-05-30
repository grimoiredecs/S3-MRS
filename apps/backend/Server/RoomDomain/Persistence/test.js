// test/test-room-repository.js

import 'dotenv/config'; // Loads environment variables from .env

// Adjust path to your RoomRepository.js file
import { RoomRepository } from '../Persistence/RoomRepository.js'; // Assuming RoomRepository is in 'Persistence' folder
// Adjust path to your postgres.js file
import pool from '../Database/postgres.js'; // Your PostgreSQL connection pool

async function runRoomRepositoryTests() {
    console.log('--- Starting Room Repository Persistence Layer Tests ---');

    const roomRepo = new RoomRepository();

    // --- Define Test Rooms (UPDATED FROM SCREENSHOT) ---
    const testRooms = [
        { id: '505-A4', capacity: 70, remaining: 70, condition: true },
        { id: '303-A4', capacity: 30, remaining: 30, condition: true },
        { id: '105-B2', capacity: 50, remaining: 50, condition: true },
        { id: '301-B10', capacity: 50, remaining: 50, condition: true },
        { id: '602-C6', capacity: 70, remaining: 70, condition: true },
        { id: '201-B1', capacity: 40, remaining: 40, condition: true },
        // --- Add a few more for specific test cases (e.g., single seat, full room) ---
        { id: 'SINGLE', capacity: 1, remaining: 1, condition: true }, // For single-seat tests
        { id: 'FULL', capacity: 5, remaining: 0, condition: false },   // For a room that starts full
        { id: 'EMPTY', capacity: 5, remaining: 5, condition: true },   // For a room to become full during tests
    ];


    try {
        // --- Setup: Clear existing test data and insert fresh data ---

        // --- Test 1: getRoom - Existing Room (e.g., 505-A4) ---
        console.log('\nTest 1: getRoom - Existing Room (505-A4)');
        const room505A4 = await roomRepo.getRoom('505-A4');
        console.log('  Fetched 505-A4:', room505A4);
        if (room505A4 && room505A4.id === '505-A4' && room505A4.capacity === 70) {
            console.log('  PASSED: getRoom successfully fetched existing room.');
        } else {
            console.error('  FAILED: getRoom failed to fetch existing room or data mismatch.');
        }

        // --- Test 2: getRoom - Non-existent Room ---
        console.log('\nTest 2: getRoom - Non-existent Room (NONEXST)');
        const nonExistentRoom = await roomRepo.getRoom('NONEXST');
        console.log('  Fetched NONEXST:', nonExistentRoom);
        if (nonExistentRoom === undefined) {
            console.log('  PASSED: getRoom correctly returned undefined for non-existent room.');
        } else {
            console.error('  FAILED: getRoom returned data for non-existent room.');
        }

        // --- Test 3: getAllRooms ---
        console.log('\nTest 3: getAllRooms');
        const allRooms = await roomRepo.getAllRooms();
        console.log('  All Rooms:', allRooms);
        // Expecting at least the number of rooms we inserted for testing
        if (Array.isArray(allRooms) && allRooms.length >= testRooms.length && allRooms.some(r => r.id === '505-A4')) {
            console.log('  PASSED: getAllRooms successfully fetched all rooms.');
        } else {
            console.error('  FAILED: getAllRooms failed or returned incorrect data/count.');
        }

        // --- Test 4: updateRemainingSeats - Successful Booking (EMPTY, 3 seats) ---
        console.log('\nTest 4: updateRemainingSeats - Successful Booking (EMPTY, 3 seats)');
        const initialRemainingEMPTY = testRooms.find(r => r.id === '505-A4').remaining; // Should be 5
        const seatsToBook = -3;
        const updatedRoomEMPTY = await roomRepo.updateRemainingSeats('505-A4', seatsToBook);
        console.log('  Updated 505-A4:', updatedRoomEMPTY);
        if (updatedRoomEMPTY && updatedRoomEMPTY.id === 'EMPTY' && updatedRoomEMPTY.remaining === (initialRemainingEMPTY - seatsToBook) && updatedRoomEMPTY.condition === true) {
            console.log('  PASSED: updateRemainingSeats successfully booked seats.');
        } else {
            console.error('  FAILED: updateRemainingSeats failed to book seats correctly.');
        }

        // --- Test 5: updateRemainingSeats - Room becomes Full (SINGLE, 1 seat) ---
        console.log('\nTest 5: updateRemainingSeats - Room becomes Full (SINGLE, 1 seat)');
        const updatedRoomSINGLE = await roomRepo.updateRemainingSeats('SINGLE', 1);
        console.log('  Updated SINGLE (full):', updatedRoomSINGLE);
        if (updatedRoomSINGLE && updatedRoomSINGLE.id === 'SINGLE' && updatedRoomSINGLE.remaining === 0 && updatedRoomSINGLE.condition === false) {
            console.log('  PASSED: updateRemainingSeats correctly made room full and updated condition.');
        } else {
            console.error('  FAILED: updateRemainingSeats failed to make room full or update condition.');
        }

        // --- Test 6: updateRemainingSeats - Not Enough Seats (EMPTY, try to book 100) ---
        console.log('\nTest 6: updateRemainingSeats - Not Enough Seats (EMPTY, try to book 100)');
        try {
            await roomRepo.updateRemainingSeats('EMPTY', 100);
            console.error('  FAILED: Did not throw error for not enough seats.');
        } catch (error) {
            if (error.message.includes('Not enough seats or room not found')) {
                console.log('  PASSED: Correctly threw error for not enough seats.');
            } else {
                console.error('  FAILED: Threw wrong error for not enough seats:', error.message);
            }
        }

        // --- Test 7: updateRemainingSeats - Invalid Number of Seats (0) ---
        console.log('\nTest 7: updateRemainingSeats - Invalid Number of Seats (0)');
        try {
            await roomRepo.updateRemainingSeats('RM101', 0);
            console.error('  FAILED: Did not throw error for 0 seats.');
        } catch (error) {
            if (error.message.includes('Number of seats to book must be positive.')) {
                console.log('  PASSED: Correctly threw error for 0 seats.');
            } else {
                console.error('  FAILED: Threw wrong error for 0 seats:', error.message);
            }
        }

        // --- Test 8: updateRemainingSeats - Non-existent Room ---
        console.log('\nTest 8: updateRemainingSeats - Non-existent Room (NONEXST, book 1)');
        try {
            await roomRepo.updateRemainingSeats('NONEXST', 1);
            console.error('  FAILED: Did not throw error for non-existent room update.');
        } catch (error) {
            if (error.message.includes('Not enough seats or room not found')) {
                console.log('  PASSED: Correctly threw error for non-existent room update.');
            } else {
                console.error('  FAILED: Threw wrong error for non-existent room update:', error.message);
            }
        }

        // --- Test 9: changeCondition - Verify it throws error as expected ---
        console.log('\nTest 9: changeCondition - Verify throws planned error');
        try {
            await roomRepo.changeCondition('RM101');
            console.error('  FAILED: Did not throw expected error for changeCondition.');
        } catch (error) {
            if (error.message.includes('`changeCondition` method should be re-evaluated.')) {
                console.log('  PASSED: Correctly threw expected error for changeCondition.');
            } else {
                console.error('  FAILED: Threw wrong error for changeCondition:', error.message);
            }
        }

        // --- Test 10: setRoomUnavailable - Successfully make room unavailable (EMPTY) ---
        console.log('\nTest 10: setRoomUnavailable - Successfully make room unavailable (EMPTY)');
        const updatedRoomEMPTYUnavailable = await roomRepo.setRoomUnavailable('EMPTY');
        console.log('  Updated EMPTY (unavailable):', updatedRoomEMPTYUnavailable);
        if (updatedRoomEMPTYUnavailable && updatedRoomEMPTYUnavailable.id === 'EMPTY' && updatedRoomEMPTYUnavailable.remaining === 0 && updatedRoomEMPTYUnavailable.condition === false) {
            console.log('  PASSED: setRoomUnavailable correctly made room unavailable.');
        } else {
            console.error('  FAILED: setRoomUnavailable failed to make room unavailable.');
        }

        // --- Test 11: setRoomUnavailable - Non-existent Room ---
        console.log('\nTest 11: setRoomUnavailable - Non-existent Room (NONEXST)');
        try {
            await roomRepo.setRoomUnavailable('NONEXST');
            console.error('  FAILED: Did not throw error for non-existent room set unavailable.');
        } catch (error) {
            if (error.message.includes('Room with ID NONEXST not found.')) {
                console.log('  PASSED: Correctly threw error for non-existent room set unavailable.');
            } else {
                console.error('  FAILED: Threw wrong error for non-existent room set unavailable:', error.message);
            }
        }


    } catch (unhandledError) {
        console.error('\nAn unhandled error occurred during tests execution:', unhandledError);
    } finally {
        // --- Final Cleanup ---


        // --- Close the database connection pool ---
        await pool.end();
        console.log('Database connection pool closed.');
        console.log('--- Room Repository Persistence Layer Tests Finished ---');
    }
}

// Run the tests
runRoomRepositoryTests();