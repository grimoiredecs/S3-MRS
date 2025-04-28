const DeviceService = require('../../business/deviceService');

const DeviceController = {
    async getAll(req, res) {
        try {
            const devices = await DeviceService.getAllDevices();
            res.json(devices);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const device = await DeviceService.getDeviceById(req.params.id);
            if (!device) return res.status(404).json({ error: 'Device not found' });
            res.json(device);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async turnOn(req, res) {
        try {
            const updated = await DeviceService.turnOn(req.params.id);
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async turnOff(req, res) {
        try {
            const updated = await DeviceService.turnOff(req.params.id);
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = DeviceController;
