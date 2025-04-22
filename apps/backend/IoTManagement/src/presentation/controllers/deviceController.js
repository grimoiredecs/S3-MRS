const QueryService = require('../../business/DeviceQueryService');
const EditService = require('../../business/DeviceEditService');

module.exports = {
    getAllDevices: async (req, res) => {
        const devices = await QueryService.getAllDevices();
        res.json(devices);
    },
    getDeviceById: async (req, res) => {
        const device = await QueryService.getDeviceById(req.params.id);
        device ? res.json(device) : res.status(404).json({ error: 'Device not found' });
    },
    createDevice: async (req, res) => {
        const device = await EditService.createDevice(req.body);
        res.status(201).json(device);
    },
    updateDeviceStatus: async (req, res) => {
        const device = await EditService.updateDeviceStatus(req.params.id, req.body.status);
        res.json(device);
    },
    deleteDevice: async (req, res) => {
        await EditService.deleteDevice(req.params.id);
        res.status(204).send();
    },
    reportIssue: async (req, res) => {
        const { device_id, timestamp, issue_description } = req.body;
        const issue = await EditService.reportIssue(device_id, timestamp, issue_description);
        res.status(201).json(issue);
    },
    getIssues: async (req, res) => {
        const issues = await QueryService.getDeviceIssues(req.params.id);
        res.json(issues);
    }
};