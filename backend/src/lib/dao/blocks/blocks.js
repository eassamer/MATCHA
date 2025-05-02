const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "BlocksDAO: "; //for better debugging

async function create(block) {
  const queryInput = [block.blockerId, block.blockedId];
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.ADD_BLOCK, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.create: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function checkIfBlocked(blockerId, blockedId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.CHECK_BLOCK, [blockerId, blockedId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.checkIfBlocked: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function deleteBlock(blockerId, blockedId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.DELETE_BLOCK, [blockerId, blockedId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.deleteBlock: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

async function findByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.GET_BLOCKED_USERS, [userId], (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findByUserId: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  create,
  checkIfBlocked,
  deleteBlock,
  findByUserId,
};

