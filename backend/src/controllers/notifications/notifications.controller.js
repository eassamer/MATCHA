const errMessagePrefix = 'NotificationsController: '; // for better debugging
const notificationsService = require('@services/notifications/notifications.service');

async function getNotifications(req, res) {
  try {
    console.log(req.query);
    const { take = 0, limit = 10 } = req.query;
    const notifications = await notificationsService.getNotificationsByUserId(req.user.id, take, limit);
    res.status(200).json(notifications);
  } catch (err) {
    err.message = `${errMessagePrefix}.getNotifications: ${err.message}`;
    res.status(err.status || 400).json({ error: err.message });
  }
}

async function markNotificationAsRead(req, res) {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ error: 'Notification ID is required' });
    }
    const result = await notificationsService.markNotificationAsRead(notificationId);
    res.status(200).json(result);
  } catch (err) {
    err.message = `${errMessagePrefix}.markNotificationAsRead: ${err.message}`;
    res.status(err.status || 400).json({ error: err.message });
  }
}

async function deleteNotification(req, res) {
  try {
    const { notificationId } = req.body;
    if (!notificationId) {
      return res.status(400).json({ error: 'Notification ID is required' });
    }
    const result = await notificationsService.deleteNotification(notificationId);
    res.status(200).json(result);
  } catch (err) {
    err.message = `${errMessagePrefix}.deleteNotification: ${err.message}`;
    res.status(err.status || 400).json({ error: err.message });
  }
}

module.exports = {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
};