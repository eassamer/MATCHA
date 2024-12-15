const queries = require('@lib/db/queries');
const client = require('@lib/db/dbconnect');
const errMessagePrefix = 'OauthUserDao: '

async function create(user) {
  const queryInput = [
    user.providerId,
    user.provider,
    user.email,
    new Date(),
  ];

  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.ADD_OAUTH_USER,
        queryInput, (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.create: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

async function findByEmail(email) {
  const queryInput = [email];
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.FIND_OAUTH_USER_BY_EMAIL,
      queryInput, (err, result) => {
        if (err) {
          reject(`${errMessagePrefix}.findByEmail `, err);
        }
        resolve(result);
      });
  });
}

async function remove(email) {
  const queryInput = [email];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.DELETE_OAUTH_USER,
        queryInput, (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.remove: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

module.exports = {
  create,
  findByEmail,
  remove,
}