const Notification = require('../database/model');

const NotificationRepository = {
    save: async (notif) => await new Notification(notif).save(),
    findAll: async () => await Notification.find(),
    findByID: async (id) => await Notification.findOne({ ID: id }),
    update: async (id, data) => await Notification.updateOne({ ID: id }, { $set: data }),
    findByStatus: async (status) => await Notification.find({ status })
};

module.exports = NotificationRepository;