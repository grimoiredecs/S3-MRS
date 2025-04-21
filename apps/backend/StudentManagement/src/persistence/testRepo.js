const StudentRepository = require('./studentRepository');

// 🔁 Async test wrapper
(async () => {
    console.log('\n✅ [TEST] Fetching all students:');
    const allStudents = await StudentRepository.getAll();
    console.log(allStudents.slice(0, 5)); // show first 5 only

    if (allStudents.length > 0) {
        const testId = allStudents[0].id;

        console.log(`\n✅ [TEST] Fetching student by ID: ${testId}`);
        const student = await StudentRepository.getById(testId);
        console.log(student);

        console.log(`\n✅ [TEST] Updating student email: ${testId}`);
        await StudentRepository.update(testId, { email: 'updated@example.com' });

        const updated = await StudentRepository.getById(testId);
        console.log(updated);

        console.log(`\n✅ [TEST] Deleting student: ${testId}`);
        await StudentRepository.delete(testId);

        const afterDelete = await StudentRepository.getById(testId);
        console.log(afterDelete); // should be undefined or null
    } else {
        console.log('❌ No students in database to test with.');
    }
})();