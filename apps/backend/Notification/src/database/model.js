const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    ID: { type: String, required: true, unique: true },
    status: { type: String, enum: ['sent', 'pending', 'failed'], default: 'pending' },
    meansOfSend: { type: String, enum: ['email', 'web'], required: true },
    timeSent: { type: String } // e.g., "13:45:21 - 23/04/2025"
});

module.exports = mongoose.model('Notification', notificationSchema);