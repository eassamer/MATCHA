const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "ViewsDAO: "; //for better debugging

async function create(view) {
  const queryInput = [view.viewerId, view.viewedId, new Date()];
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
