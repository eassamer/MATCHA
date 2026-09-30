const { v4: uuidv4 } = require("uuid");
const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "MessageDao: "; // for better debugging

/**
 * @description persists a message and returns it (id generated here so callers can echo it)
 */
async function create({ senderId, receiverId, content, createdAt = new Date() }) {
  const message = { id: uuidv4(), senderId, receiverId, content, createdAt };
  const queryInput = [message.id, senderId, receiverId, content, createdAt];
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.ADD_MESSAGE, queryInput, (err) => {
      if (err) {
        err.message = `${errMessagePrefix}.create: ${err.message}`;
        return reject(err);
      }
      resolve(message);
    });
  });
}

/**
 * @description one page of the conversation, oldest first. Pages are taken from the
 * newest end (offset 0 = latest messages) so a chat can load older history on scroll.
 */
async function findBySenderAndReceiver(senderId, receiverId, take = 0, limit = 10) {
  const queryInput = [senderId, receiverId, receiverId, senderId, Number(limit), Number(take)];
  return new Promise(async (resolve, reject) => {
    // `query` (not `execute`): MySQL 8 rejects LIMIT/OFFSET bound as prepared-statement params
    (await client).query(queries.FIND_MESSAGES_BETWEEN_USERS, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findBySenderAndReceiver: ${err.message}`;
        return reject(err);
      }
      resolve(result.reverse());
    });
  });
}

async function findById(messageId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.FIND_MESSAGE_BY_ID, [messageId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findById: ${err.message}`;
        return reject(err);
      }
      resolve(result[0]);
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

module.exports = { create, findBySenderAndReceiver, findById, deleteMessage };
