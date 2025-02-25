const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "RelationDao: "; //for better debugging

/**
 * @description Retrieves a list of users who are in close proximity to the user
 * @param {number} userId The id of the user whose nearby users are being retrieved
 * @param {number} userLat The latitude of the user's location
 * @param {number} userLon The longitude of the user's location
 * @returns A list of users who are in close proximity to the user
 * @throws If the user's location is not found
 * @throws If there is an error querying the database
 */
async function getNearbyUsers(userId, userLat, userLon) {
  try {
    if (!userLat || !userLon) {
      throw new Error("User location not found");
    }
    const queryInput = [userLat, userLon, userLat, userId]; // Ensure parameter order matches the query
    return new Promise(async (resolve, reject) => {
      (await client).execute(
        queries.GET_NEARBY_USERS,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.getNearbyUsers: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  } catch (err) {
    err.message = `Error in getNearbyUsers DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Retrieves a list of users who have liked the user with the given userId
 * @param {number} userId The id of the user whose likes are being retrieved
 * @returns A list of users who have liked the user
 * @throws If there is an error querying the database
 */
async function getLikes(userId) {
  try {
    const queryInput = [userId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.GET_LIKES, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.getLikes: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in getLikes DAO: ${err.message}`;
    throw err;
  }
}

/**
 * @description Records a like from the user with the given senderId to the user with the given receiverId
 * @param {number} senderId The id of the user who is giving the like
 * @param {number} receiverId The id of the user who is receiving the like
 * @returns The result of the database query
 * @throws If there is an error querying the database
 */
async function addLike(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.ADD_LIKE, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.addLike: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in addLike DAO: ${err.message}`;
    throw err;
  }
}

async function getMatches(userId) {
  try {
    const queryInput = [userId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.GET_MATCHES, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.getMatches: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in getMatches DAO: ${err.message}`;
    throw err;
  }
}

async function deleteMatch(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(
        queries.DELETE_MATCH,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.deleteMatch: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  } catch (err) {
    err.message = `Error in deleteMatch DAO: ${err.message}`;
    throw err;
  }
}

async function addMatch(senderId, receiverId) {
  try {
    const queryInput = [senderId, receiverId];
    return new Promise(async (resolve, reject) => {
      (await client).execute(queries.ADD_MATCH, queryInput, (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.addMatch: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    err.message = `Error in addMatch DAO: ${err.message}`;
    throw err;
  }
}

module.exports = {
  getNearbyUsers,
  getLikes,
  addLike,
  getMatches,
  deleteMatch,
  addMatch,
};
