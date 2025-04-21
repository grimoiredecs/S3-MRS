const EditService = require('./StudentEditService');

(async () => {
    // Test 1: Provide your own password
    const studentA = {
        id: '2451001',
        first_name: 'Alice',
        last_name: 'Nguyen',
        email: 'alice.nguyen@example.com',
        year: 1,
        password: 'abcde', // manually given
    };

    const createdA = await EditService.createStudent(studentA);
    console.log('✅ Created with own password:', createdA);

    // Test 2: No password → generate random
    const studentB = {
        id: '2451002',
        first_name: 'Bob',
        last_name: 'Tran',
        email: 'bob.tran@example.com',
        year: 1,
        // no password
    };

    const createdB = await EditService.createStudent(studentB);
    console.log('✅ Created with random password:', createdB);
})();