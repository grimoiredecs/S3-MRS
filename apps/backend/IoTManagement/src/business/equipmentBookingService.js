// === business/equipmentBookingService.js ===
const EquipmentBookingRepository = require('../persistence/equipmentBookingRepository');

const EquipmentBookingService = {
    async createBooking(bookingData) {
        // Conflict check
        const { equipment_id, start_time, end_time } = bookingData;
        const conflicts = await EquipmentBookingRepository.findConflicts(equipment_id, start_time, end_time);
        if (conflicts.length > 0) {
            throw new Error('Equipment already booked in this timeframe');
        }

        return await EquipmentBookingRepository.create(bookingData);
    }
};

module.exports = EquipmentBookingService;
