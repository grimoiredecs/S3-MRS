const express = require('express');
const router = express.Router();
const NotificationService = require('../business/service');

router.post('/send', async (req, res) => {
    try {
        const sent = await NotificationService.sendNotification(req.body);
        res.json(sent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const notif = await NotificationService.createNotification(req.body);
        res.json(notif);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const notif = await NotificationService.queryNotificationByID(req.params.id);
        res.json(notif || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const all = await NotificationService.queryAllNotification();
        res.json(all);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;