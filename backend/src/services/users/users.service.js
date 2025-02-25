// Description: This file contains the service layer functions for the users table.

const userDao = require("@dao/users/users");
const oauthUserDao = require("@dao/users/oauth.users");
const errMessagePrefix = "UserService: ";
const fetch = require("node-fetch");

function isValidDate(date) {
  const dateRegex = /\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])/; // yyyy-mm-dd
  return dateRegex.test(date);
}

/**
 * @description validates a user email
 * @param {*} email the email to validate
 * @returns true if the email is valid, false otherwise
 */
function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

/**
 * @description validates a password
 * @param {*} password the password to validate
 * @returns true if the password is strong, false otherwise
 */
function isPasswordStrong(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

/**
 * @description validates a name
 * @param {*} name the name to validate
 * @returns true if the name is valid, false otherwise
 */
function isNameValid(name) {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
}

/**
 * Validates if the given sex is either 'male' or 'female'.
 *
 * @param {string} sex - The sex to validate.
 * @returns {boolean} - Returns true if the sex is valid, otherwise false.
 */
function isValidSex(sex) {
  const sexRegex = /^(male|female)$/;
  return sexRegex.test(sex);
}

/**
 * @description validates a user object
 * @param {*} user the user object to validate
 * @throws an error if the user object is invalid
 * @returns nothing
 * @note this function does not check if the email already exists in the database
 */
function validateUser(user) {
  requiredFields = [
    "firstName",
    "lastName",
    "displayName",
    "birthDate",
    "email",
    "password",
    "sex",
  ];

  for (const field of requiredFields) {
    if (!user[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!isValidEmail(user.email)) {
    throw new Error(`Invalid email`);
  }

  if (!isPasswordStrong(user.password)) {
    throw new Error(
      `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, one number`
    );
  }

  if (
    !isNameValid(user.firstName) ||
    !isNameValid(user.lastName) ||
    !isNameValid(user.displayName)
  ) {
    throw new Error(`Invalid first name`);
  }

  if (
    !isValidDate(user.birthDate) ||
    new Date().getFullYear() - new Date(user.birthDate).getFullYear() < 18
  ) {
    throw new Error(`User must be at least 18 years old`);
  }

  if (!isValidSex(user.sex)) {
    throw new Error(`Invalid sex`);
  }
}

function validateOauthUser(user) {
  if (!user.providerId) {
    throw new Error("Missing required field: providerId");
  }
  if (!user.provider) {
    throw new Error("Missing required field: provider");
  }
  if (!user.email || !isValidEmail(user.email)) {
    throw new Error("Invalid email");
  }
}

/**
 * @description creates a new user
 * @param {*} user the user object to create
 * @throws if the email already exists in the database
 * @returns the id of the new user
 * @throws if the user object is invalid
 */
async function create(user) {
  try {
    validateUser(user);
    const oauthUser = await oauthUserDao.findByEmail(user.email);
    if (oauthUser.length > 0) {
      await oauthUserDao.remove(user.email);
    }
    const queryOutput = await userDao.create(user);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not created");
    }
    const newUser = await findByEmail(user.email);
    delete newUser.password;
    return newUser;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.create: ${error.message}`);
  }
}

/**
 * Finds an existing user by email or creates a new OAuth user.
 *
 * @param {Object} user - The user object.
 * @returns {Promise<Object>} The existing user if found, otherwise the newly created user.
 * @throws {Error} If the email is invalid or any other error occurs during the process.
 * @note this function should only be called during oauth
 */
async function findOrCreate(user) {
  try {
    if (!user.email || !isValidEmail(user.email))
      throw new Error("Invalid email");
    const existingUser = await userDao.findByEmail(user.email);
    if (existingUser.length > 0) {
      return existingUser;
    }
    validateOauthUser(user);
    const oauthUser = await oauthUserDao.findByEmail(user.email);
    if (oauthUser.length > 0) {
      return oauthUser;
    }
    const newOauthUser = await oauthUserDao.create(user);
    if (newOauthUser.affectedRows === 0) {
      throw new Error("User not created");
    }
    return await oauthUserDao.findByEmail(user.email);
  } catch (error) {
    throw new Error(`${errMessagePrefix}.findOrCreate: ${error.message}`);
  }
}


/**
 * @description finds all users
 * @returns an array of all users
 * @throws if database query fails
 */
async function remove(userId) {
  try {
    const user = await findById(userId);
    if (!user) {
      throw new Error(`User with Id: ${userId} not found`);
    }
    const queryOutput = await userDao.remove(userId);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not removed");
    }
    return queryOutput;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.remove: ${error.message}`);
  }
}

/**
 * @description finds a user by their id
 * @param {*} userId the id of the user to find
 * @returns the user object
 * @throws if the user does not exist
 */
async function findById(userId) {
  try {
    const user = await userDao.findById(userId);
    if (!user || user.length === 0) {
      throw new Error(`User with Id: ${userId} not found`);
    }
    return user[0];
  } catch (error) {
    throw new Error(`${errMessagePrefix}.findById: ${error.message}`);
  }
}

/**
 * @description finds a user by their email
 * @param {*} email the email of the user to find
 * @returns the user object
 * @throws if the user does not exist
 */
async function findByEmail(email) {
  try {
    if (!isValidEmail(email)) return await userDao.findByEmail(email);
    const user = await userDao.findByEmail(email);
    if (!user || user.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }
    return user[0];
  } catch (error) {
    throw new Error(`${errMessagePrefix}.findByEmail: ${error.message}`);
  }
}

/**
 * @description finds users by name
 * @param {*} name the name to search for
 * @param {*} limit the maximum number of results to return
 * @param {*} offset the number of results to skip
 * @returns an array of users
 * @throws if the name is invalid
 * @throws if the limit is invalid
 * @throws if the offset is invalid
 * @throws if the limit is too large
 * @throws if database query fails
 */
async function findUsersByName({ name, limit, offset }) {
  try {
    if (!isNameValid(name)) {
      throw new Error("Invalid name");
    }
    if (!limit || limit < 1) {
      throw new Error("Invalid limit");
    }
    if (!offset || offset < 0) {
      throw new Error("Invalid offset");
    }
    if (limit > 100) {
      throw new Error("Limit too large");
    }
    const users = await userDao.findUsersByName(name, limit, offset);
    return users;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.findUsersByName: ${error.message}`);
  }
}

/**
 * @description Retrieves the geographical location of a user based on their IP address and updates their last location in the database.
 * @param {number} id - The ID of the user whose location is being retrieved.
 * @param {string} ip - The IP address used to determine the user's location.
 * @returns {Object|null} An object containing the location data (latitude, longitude, city, country, region), or null if the location could not be retrieved.
 * @throws Will log an error message if the HTTP request fails or if the location data retrieval fails.
 */

async function getLocationByIP(id, ip) {
  try {
    const response = await fetch("http://ip-api.com/json/" + ip);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    // Build and return the location object
    const location = {
      latitude: data.lat,
      longitude: data.lon,
      city: data.city,
      country: data.country,
      region: data.regionName,
    };
    userDao.updateLastLocation(id, location.longitude, location.latitude);
    return location;
  } catch (error) {
    console.error(`Failed to get location: ${error.message}`);
    return null; // Or throw the error based on your needs
  }
}

/**
 * @description Retrieves all users from the database.
 * @returns {Array} An array of user objects.
 * @throws Will throw an error if the database query fails.
 */
async function findAll() {
  try {
    const users = await userDao.findAll();
    return users;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.findAll: ${error.message}`);
  }
}

async function update(user) {
  try {
    validateUser(user);
    const {
      userId,
      firstName,
      lastName,
      email,
      password,
      latitude,
      longitude,
    } = user;
    if (!userId) {
      throw new Error("User ID is required");
    }

    return await userDao.update(
      userId,
      firstName,
      lastName,
      email,
      password,
      latitude,
      longitude
    );
  } catch (error) {
    throw new Error(`${errMessagePrefix}.update: ${error.message}`);
  }
}

module.exports = {
  create,
  remove,
  findById,
  findByEmail,
  findUsersByName,
  findOrCreate,
  getLocationByIP,
  findAll,
  update,
};
