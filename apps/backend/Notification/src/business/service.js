const NotificationRepository = require('../persistence/repository');

const NotificationService = {
    sendNotification: async (notification) => {
        // Send logic can be mocked
        notification.status = 'sent';
        notification.timeSent = new Date().toLocaleTimeString('en-GB') + ' - ' + new Date().toLocaleDateString('en-GB');
        return await NotificationRepository.save(notification);
    },
    createNotification: async (notif) => await NotificationRepository.save(notif),
    queryNotificationByID: async (id) => await NotificationRepository.findByID(id),
    queryAllNotification: async () => await NotificationRepository.findAll()
};

module.exports = NotificationService;