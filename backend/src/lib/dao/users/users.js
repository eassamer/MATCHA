// This file contains the functions that interact with the database for the users table

const queries = require("@lib/db/queries");
const client = require("@lib/db/dbconnect");
const errMessagePrefix = "UserDao: "; //for better debugging

/**
 * @description creates a new user in the database
 * @param {*} user object with the following fields: firstName, lastName, email, lastLocation, password
 * @throws if the email already exists in the database
 * @returns all the affected rows
 */
async function create(user) {
  const queryInput = [
    user.firstName,
    user.lastName,
    user.displayName,
    new Date(user.birthDate),
    user.email,
    user.password,
    user.sex,
    user.interests,
    new Date(),
  ];
  const userEmail = await findByEmail(user.email);
  if (userEmail.length > 0) {
    throw new Error(
      `${errMessagePrefix}.create: User with email ${user.email} already exists`
    );
  }
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.ADD_NEW_USER, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.create: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}


/**
 * @description updates the user's first name
 * @param {*} userId the id of the user to update
 * @param {*} firstName the new first name
 * @returns all the affected rows
 * @returns 0 affected rows if the user does not exist
 * @note this function does not check if the new first name is valid
 */
async function updatePassword(userId, password) {
  const queryInput = [password, userId];
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.UPDATE_USER_PASSWORD,
      queryInput,
      (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.updatePassword: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

/**
 * @description removes a user from the database
 * @param {*} userId the id of the user to remove
 * @returns all the affected rows
 * @returns 0 affected rows if the user does not exist
 */

async function remove(userId) {
  const queryInput = [userId];
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.DELETE_USER_QUERY,
      queryInput,
      (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.remove: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

/**
 * @description finds a user by their id
 * @param {*} userId the id of the user to find
 * @returns an array containing the user object
 * @returns empty array if the user does not exist
 */

async function findById(userId) {
  const queryInput = [userId];
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.FIND_USER_BY_ID,
      queryInput,
      (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.findById: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

/**
 * @description finds a user by their email
 * @param {*} email the email of the user to find
 * @returns an array containing the user object
 * @returns empty array if the user does not exist
 */

async function findByEmail(email) {
  const queryInput = [email];
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.FIND_USER_BY_EMAIL,
      queryInput,
      (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.findByEmail: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}


/**
 * Finds an authenticated user by email.
 *
 * @param {string} email - The email of the user to find.
 * @returns {Promise} A promise that resolves with the result of the query.
 */
async function findAuthUserByEmail(email) {
  const queryInput = [email];
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.FIND_AUTH_USER_BY_EMAIL,
      queryInput,
      (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.findAuthUserByEmail: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

/**
 * @description finds users by their name
 * @param {*} name the name of the user to find
 * @param {*} take the number of results to return
 * @param {*} skip the number of results to skip
 * @returns an array containing the user objects
 * @returns empty array if no users are found
 */
async function findUsersByName(name, take, skip) {
  const queryInput = [name, name, take, skip]; //name repeated twice to search in both first and last names
  return new Promise(async (resolve, reject) => {
    (await client).execute(
      queries.FIND_USERS_BY_NAME,
      queryInput,
      (err, result) => {
        if (err) {
          err.message = `${errMessagePrefix}.findUsersByName: ${err.message}`;
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

/**
 * @description Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws Will throw an error if the database query fails.
 */
async function findAll() {
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.FIND_ALL_USERS, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.findAll: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

/**
 * @description Updates a user in the database.
 * @param {number} userId the id of the user to update
 * @param {string} firstName the new first name
 * @param {string} lastName the new last name
 * @param {string} email the new email
 * @param {number} latitude the new latitude
 * @param {number} longitude the new longitude
 * @returns {Promise} a promise that resolves to an object containing the affected rows
 * @throws {Error} if the database query fails
 */
async function update(userId, firstName, lastName, email, latitude, longitude) {
  const queryInput = [firstName, lastName, email, latitude, longitude, userId];
  return new Promise(async (resolve, reject) => {
    (await client).execute(queries.UPDATE_USER, queryInput, (err, result) => {
      if (err) {
        err.message = `${errMessagePrefix}.update: ${err.message}`;
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  create,
  remove,
  findById,
  findByEmail,
  findAuthUserByEmail,
  findUsersByName,
  findAll,
  update,
  updatePassword,
};
