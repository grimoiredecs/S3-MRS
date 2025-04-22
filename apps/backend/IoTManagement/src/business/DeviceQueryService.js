const DeviceRepo = require('../persistence/DeviceRepository');

const getAllDevices = async () => await DeviceRepo.findAllDevices();
const getDeviceById = async (id) => await DeviceRepo.findDeviceById(id);
const getDeviceIssues = async (id) => await DeviceRepo.getIssuesByDevice(id);

module.exports = { getAllDevices, getDeviceById, getDeviceIssues };