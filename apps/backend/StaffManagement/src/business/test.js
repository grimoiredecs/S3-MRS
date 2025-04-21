const StaffService = require('./StaffService');

(async () => {
    // 1. Create Staff
    const createdStaff = await StaffService.createStaff({
        full_name: "Phạm Ngọc Minh",
        role: "Doctor",
        email: "minh.pham@hospital.com",
        phone_number: "0911122233",
        password: "minhpass123"
    });
    console.log("✅ Created Staff:", createdStaff);

    const staffId = createdStaff.staff_id;

    // 2. Get Staff by ID
    const staffById = await StaffService.getStaffID(staffId);
    console.log("🔍 Found by ID:", staffById);

    // 3. List All Staff
    const staffList = await StaffService.listStaff();
    console.log("📋 All Staff:", staffList);

    // 4. Update Staff
    const updatedStaff = await StaffService.updateStaff(staffId, {
        full_name: "Phạm Ngọc Minh Updated",
        role: "Admin",
        email: "minh.updated@hospital.com",
        phone_number: "0999988877",
        password: "updated123"
    });
    console.log("✏️ Updated Staff:", updatedStaff);

    // 5. Delete Staff
    await StaffService.deleteStaff(staffId);
    console.log("🗑️ Deleted staff with ID:", staffId);
})();