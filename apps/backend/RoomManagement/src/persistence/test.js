const {
    save,
    findAvailable,
    findAll,
    filterByEquipment,
    findByID,
    update
} = require('./roomRepository');

// Example Room Data
const testRoom = {
    room_id: '604-A1',
    capacity: 8,
    status: 'available',
    has_private_space: true,
    condition: 'ready',
    seat_remaining: 8,
    equipments: {
        projector: 1,
        whiteboard: 1,
        mini_monitor: 2
    }
};

(async () => {
    try {
        console.log('Saving room...');
        await save(testRoom);

        console.log('Finding all rooms:');
        const allRooms = await findAll();
        console.log(allRooms);

        console.log('Finding available rooms:');
        const available = await findAvailable();
        console.log(available);

        console.log('Filtering rooms with ≥1 projector:');
        const withProjector = await filterByEquipment('projector');
        console.log(withProjector);

        console.log('Finding room by ID:');
        const found = await findByID('601-A1');
        console.log(found);

        console.log('Updating room...');
        testRoom.capacity = 10;
        testRoom.seat_remaining = 10;
        testRoom.equipments.whiteboard = 2;
        await update(testRoom);

        const updated = await findByID('601-A1');
        console.log('Updated room:', updated);

    } catch (err) {
        console.error('❌ ERROR:', err.message);
    } finally {
        console.log("SUCCEED");
        process.exit();
    }
})();