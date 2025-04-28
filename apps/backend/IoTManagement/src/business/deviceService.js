const DeviceRepository = require('../persistence/DeviceRepository');

const DeviceService = {
    async getAllDevices() {
        return await DeviceRepository.findAllDevices();
    },

    async getDeviceById(id) {
        return await DeviceRepository.findDeviceById(id);
    },

    async turnOn(id) {
        return await DeviceRepository.turnDeviceOn(id);
    },

    async turnOff(id) {
        return await DeviceRepository.turnDeviceOff(id);
    }
};

module.exports = DeviceService;
