const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "NotificationDao: "; //for better debugging

async function create(notification) {
  const queryInput = [
    notification.userId,
    notification.type,
    notification.content,
    new Date(),
  ];
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.ADD_NEW_NOTIFICATION, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.create: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function findByUserId(userId, take = 0, limit = 10) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.GET_NOTIFICATIONS, [userId, limit, take], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findByUserId: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function markAsRead(notificationId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.MARK_NOTIFICATION_AS_READ, [notificationId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.markAsRead: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function deleteNotification(notificationId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.DELETE_NOTIFICATION, [notificationId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.deleteNotification: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  create,
  findByUserId,
  markAsRead,
  deleteNotification,
};