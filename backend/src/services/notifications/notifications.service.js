var notificatioDao = require('@lib/dao/notifications/notification');

const errMessagePrefix = 'NotificationsService: '; // for better debugging


async function createNotifcation(userId, type, content) {
  try {
    const notification = {
      userId,
      type,
      content,
      createdAt: new Date(),
    };
    const result = await notificatioDao.create(notification);
    return result;
  } catch (err) {
    err.message = `${errMessagePrefix}.createNotification: ${err.message}`;
    throw err;
  }
}


async function getNotificationsByUserId(userId, take = 0, limit = 10) {
  try {
    const notifications = await notificatioDao.findByUserId(userId, take, limit);
    return notifications;
  } catch (err) {
    err.message = `${errMessagePrefix}.getNotificationsByUserId: ${err.message}`;
    throw err;
  }
}

async function markNotificationAsRead(notificationId) {
  try {
    const result = await notificatioDao.markAsRead(notificationId);
    return result;
  } catch (err) {
    err.message = `${errMessagePrefix}.markNotificationAsRead: ${err.message}`;
    throw err;
  }
}

async function deleteNotification(notificationId) {
  try {
    const result = await notificatioDao.deleteNotification(notificationId);
    return result;
  } catch (err) {
    err.message = `${errMessagePrefix}.deleteNotification: ${err.message}`;
    throw err;
  }
}

module.exports = {
  createNotifcation,
  getNotificationsByUserId,
  markNotificationAsRead,
  deleteNotification,
};