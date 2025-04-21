const StaffService = require('../business/StaffService');

const StaffController = {
    // Create a new staff
    createStaff: async (req, res) => {
        try {
            const newStaff = await StaffService.createStaff(req.body);
            res.status(201).json(newStaff);
        } catch (err) {
            console.error("Error creating staff:", err);
            res.status(500).json({ error: "Failed to create staff" });
        }
    },

    // Get staff by ID
    getStaffID: async (req, res) => {
        try {
            const staff = await StaffService.getStaffID(req.params.id);
            if (!staff) return res.status(404).json({ error: "Staff not found" });
            res.json(staff);
        } catch (err) {
            console.error("Error fetching staff:", err);
            res.status(500).json({ error: "Failed to get staff" });
        }
    },

    // List all staff
    listStaff: async (req, res) => {
        try {
            const staffList = await StaffService.listStaff();
            res.json(staffList);
        } catch (err) {
            console.error("Error listing staff:", err);
            res.status(500).json({ error: "Failed to list staff" });
        }
    },

    // Update staff by ID
    updateStaff: async (req, res) => {
        try {
            const updatedStaff = await StaffService.updateStaff(req.params.id, req.body);
            res.json(updatedStaff);
        } catch (err) {
            console.error("Error updating staff:", err);
            res.status(500).json({ error: "Failed to update staff" });
        }
    },

    // Delete staff by ID
    deleteStaff: async (req, res) => {
        try {
            await StaffService.deleteStaff(req.params.id);
            res.status(204).send();
        } catch (err) {
            console.error("Error deleting staff:", err);
            res.status(500).json({ error: "Failed to delete staff" });
        }
    }
};

module.exports = StaffController;