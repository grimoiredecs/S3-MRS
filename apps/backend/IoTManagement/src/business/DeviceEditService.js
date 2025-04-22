const DeviceRepo = require('../persistence/DeviceRepository');

const createDevice = async (data) => await DeviceRepo.createDevice(data);
const updateDeviceStatus = async (id, status) => await DeviceRepo.updateDevice(id, { status });
const deleteDevice = async (id) => await DeviceRepo.deleteDevice(id);
const reportIssue = async (device_id, timestamp, description) =>
    await DeviceRepo.logIssue(device_id, timestamp, description);

module.exports = { createDevice, updateDeviceStatus, deleteDevice, reportIssue };