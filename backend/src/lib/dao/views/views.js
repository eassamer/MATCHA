const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "ViewsDAO: ";

/**
 * @description records that `viewerId` visited `viewedId`'s profile, once per pair
 * @returns the OkPacket; `affectedRows` is 0 when the pair already existed
 */
async function create(viewerId, viewedId) {
  const queryInput = [viewerId, viewedId, new Date(), viewerId, viewedId];
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.ADD_VIEW, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.create: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

/**
 * @description the users who viewed `userId`'s profile, most recent first
 */
async function findByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.GET_VIEWS, [userId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findByUserId: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function checkView(viewerId, viewedId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.CHECK_VIEW, [viewerId, viewedId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.checkView: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  create,
  findByUserId,
  checkView,
};
