const StaffRepository = require('../persistence/StaffRepository');

const StaffService = {
    createStaff: async (staffData) => {
        return await StaffRepository.save(staffData);
    },

    getStaffID: async (id) => {
        return await StaffRepository.findByID(id);
    },

    listStaff: async () => {
        return await StaffRepository.findAll();
    },

    updateStaff: async (id, updatedData) => {
        return await StaffRepository.updateData(id, updatedData);
    },

    deleteStaff: async (id) => {
        return await StaffRepository.delete(id);
    }
};

module.exports = StaffService;