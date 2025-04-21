const StaffRepository = require('./StaffRepository');

(async () => {
    // Test Save
    const newStaff = await StaffRepository.save({
        full_name: 'Lê Thị Thanh',
        role: 'Nurse',
        email: 'thanh.nurse@hospital.com',
        phone_number: '0911234567',
        password: 'plaintext123'
    });
    console.log('✅ Created:', newStaff);

    // Test findAll
    const allStaff = await StaffRepository.findAll();
    console.log('📋 All Staff:', allStaff);

    // Test findByID
    const staffById = await StaffRepository.findByID(newStaff.staff_id);
    console.log('🔍 Found by ID:', staffById);

    // Test updateData
    const updated = await StaffRepository.updateData(newStaff.staff_id, {
        full_name: 'Lê Thị Thanh Updated',
        role: 'Head Nurse',
        email: 'thanh.updated@hospital.com',
        phone_number: '0987654321',
        password: 'updatedpass'
    });
    console.log('✏️ Updated:', updated);

    // Test findByRole
    const nurses = await StaffRepository.findByRole('Head Nurse');
    console.log('🧑‍⚕️ Staff by Role:', nurses);

    // Test findByEmail
    const staffByEmail = await StaffRepository.findByEmail('thanh.updated@hospital.com');
    console.log('📧 Found by Email:', staffByEmail);

    // Test delete
    await StaffRepository.delete(newStaff.staff_id);
    console.log('🗑️ Deleted staff with ID:', newStaff.staff_id);
})();