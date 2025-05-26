// test/test-student-services.js

import 'dotenv/config';

import { Student } from '../Persistence/Student.js'; // Adjust path and class name (now 'Student')
import { StudentServices } from './StudentServices.js'; // Adjust path
import pool from '../Database/connection/postgres.js';

async function runStudentServicesTests() {
    console.log('--- Starting StudentServices Business Layer Tests ---');

    // Create an instance of the actual Student (Repository) for setup/teardown
    const studentRepoForSetup = new Student();

    // Create an instance of StudentServices, injecting a mock if desired, or the actual repo for integration test
    // For a strict unit test of StudentServices, you'd use a mock.
    // For a test that involves the actual repository but mocks external services, use actual repo.
    // Let's use the actual repo for now, as it involves interaction verification with the "persistence" layer.
    const studentService = new StudentServices(studentRepoForSetup);


    // --- ADJUST TEST DATA TO MATCH SCREENSHOT SCHEMA ---
    const testStudents = [
        { id: 2252304, name: 'Nguyen Tien Khang', email: 'khang@hcmut.edu.vn', year: '3' }, // ID is number, name single, year is string
        { id: 2252302, name: 'Bob Johnson', email: 'bob.j@example.com', year: '2' },
        { id: 2252303, name: 'Charlie Brown', email: 'charlie.b@example.com', year: '3' }
    ];

    try {
        // --- Setup: Insert test data using the repository's test method ---
        // Clean up first using direct pool query for multiple IDs


        // --- Test 1: Get a specific student by ID ---
        console.log('\nTest 1: getStudent - Student Found (ID: 2252304)');
        const fetchedStudent1 = await studentService.getStudent(testStudents[0].id);
        console.log('  Fetched Student 1:', fetchedStudent1);
        if (fetchedStudent1 && fetchedStudent1.id === testStudents[0].id && fetchedStudent1.name === testStudents[0].name) {
            console.log('  PASSED: Specific student fetched successfully.');
        } else {
            console.error('  FAILED: Specific student fetch failed or data mismatch.');
        }

        // --- Test 2: Get all students ---
        console.log('\nTest 2: getAllStudents - Returns Data');
        const allStudents = await studentService.getAllStudents();
        console.log('  All Students:', allStudents);
        if (Array.isArray(allStudents) && allStudents.length >= testStudents.length &&
            testStudents.every(ts => allStudents.some(s => s.id === ts.id))) {
            console.log('  PASSED: All students fetched successfully and include test data.');
        } else {
            console.error('  FAILED: All students fetch failed or incorrect count/data.');
        }

        // --- Test 3: Get a non-existent student ---
        console.log('\nTest 3: getStudent - Student Not Found (ID: 9999999)');
        const nonExistentId = 9999999; // Ensure it's a number
        try {
            await studentService.getStudent(nonExistentId);
            console.error('  FAILED: Did not throw error for non-existent student.');
        } catch (error) {
            if (error.message.includes('not found')) {
                console.log('  PASSED: Correctly threw "not found" error.');
            } else {
                console.error('  FAILED: Threw wrong error:', error.message);
            }
        }

        // --- Test 4: getStudent - Invalid ID Input ---
        console.log('\nTest 4: getStudent - Invalid ID Input (null)');
        try {
            await studentService.getStudent(null);
            console.error('  FAILED: Did not throw error for invalid ID.');
        } catch (error) {
            if (error.message.includes('Invalid student ID')) {
                console.log('  PASSED: Correctly threw "invalid ID" error.');
            } else {
                console.error('  FAILED: Threw wrong error:', error.message);
            }
        }

        console.log('\n--- StudentServices Business Layer Tests Finished ---');

    } catch (error) {
        console.error('\nAn unhandled error occurred during tests:', error);
    } finally {
        // --- Teardown: Clean up test data ---
        console.log('\n--- Teardown: Deleting test students from the database ---');
        const idsToDelete = testStudents.map(s => s.id);
        //await pool.query(`DELETE FROM Student WHERE id = ANY($1::int[]);`, [idsToDelete]);
        console.log('Teardown complete.');

        // --- Close the database connection pool ---
        await pool.end();
        console.log('Database connection pool closed.');
    }
}

// Run the tests
runStudentServicesTests();