const queries = require('@lib/db/queries');
const client = require('@lib/db/dbconnect');
const errMessagePrefix = 'MessageDao: '; // for better debugging

async function create(message) {
  const queryInput = [
    message.senderId,
    message.receiverId,
    message.content,
    new Date(),
  ];
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.ADD_MESSAGE, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.create: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function findBySenderAndReceiver(senderId, receiverId, take = 0, limit = 10) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.FIND_MESSAGES_BETWEEN_USERS, [senderId, receiverId, limit, take], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findBySenderAndReceiver: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function deleteMessage(messageId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.DELETE_MESSAGE, [messageId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.deleteMessage: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}