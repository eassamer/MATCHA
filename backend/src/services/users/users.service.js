// Description: This file contains the service layer functions for the users table.

const userDao = require("@dao/users/users");
const oauthUserDao = require("@dao/users/oauth.users");
const errMessagePrefix = "UserService: ";
const fetch = require("node-fetch");
const argon2 = require("argon2");
const imagesService = require("@services/images/images.service");
const {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ServiceUnavailableException,
} = require("@lib/utils/exceptions");

/**
 * Hashes a given password using Argon2.
 *
 * @param {string} password - The password to hash.
 *
 * @returns {Promise<string>} The hashed password.
 */
async function hashPassword(password) {
  return await argon2.hash(password);
}

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
 * Validates if the given sex is either 'male' or 'female' or 'other'.
 *
 * @param {string} sex - The sex to validate.
 * @returns {boolean} - Returns true if the sex is valid, otherwise false.
 */
function isValidSex(sex) {
  const sexRegex = /^(male|female|other)$/;
  return sexRegex.test(sex);
}

/**
 * validates interest should be an integer representing all interest
 * each interest is represented by a bit
 * shift 1 by the interest code to get the interest value
 * shift to the left to set the interest
 * shift to the right to get the interest
 * the number of bits that should be shifted is the interest order
 * starting from the top left and going right on the UI
 *
 *
 *
 * @param {*} interest
 * @return {*}
 */
function isValidInterest(interest) {
  const interestRegex = new RegExp("^\\d+$");
  return interest === undefined || interestRegex.test(interest);
}

function isValidLocation(latitude, longitude) {
  const latitudeRegex = /^-?([1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const longitudeRegex =
    /^-?((1[0-7]\d|0?\d?\d)(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
  return latitudeRegex.test(latitude) && longitudeRegex.test(longitude);
}

function isValidRadius(radius) {
  return radius > 0 && radius <= 100;
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
    "img",
    "sex",
  ];

  for (const field of requiredFields) {
    if (
      !user[field] ||
      user[field] === "" ||
      user[field] === null ||
      user[field] === undefined
    ) {
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

  if (user.interests && !isValidInterest(user.interests)) {
    throw new Error(`Invalid interests`);
  }

  if (!imagesService.validateImage(user.img)) {
    throw new Error("Invalid image data");
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

function validateUserUpdate(user) {
  const requiredFields = [
    "firstName",
    "lastName",
    "displayName",
    "email",
    "latitude",
    "longitude",
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
  if (
    !isNameValid(user.firstName) ||
    !isNameValid(user.lastName) ||
    !isNameValid(user.displayName)
  ) {
    throw new Error(`Invalid first name`);
  }

  if (!isValidSex(user.sex)) {
    throw new Error(`Invalid sex`);
  }

  if (!isValidLocation(user.latitude, user.longitude)) {
    throw new Error(`Invalid location`);
  }

  if (user.radiusInKm && !isValidRadius(user.radiusInKm)) {
    throw new Error(`Invalid radius`);
  }

  if (user.interests && !isValidInterest(user.interests)) {
    throw new Error(`Invalid interests`);
  }

  if (user.interests && !isValidInterest(user.interests)) {
    throw new Error(`Invalid interests`);
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
  let newUser = null,
    newImage = null;
  try {
    validateUser(user);
    user.password = await hashPassword(user.password);
    const oauthUser = await oauthUserDao.findByEmail(user.email);
    if (oauthUser.length > 0) {
      await oauthUserDao.remove(user.email);
    }
    if (user.interests == undefined) user.interests = 0;
    const queryOutput = await userDao.create(user);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not created");
    }
    newUser = await findByEmail(user.email);
    user.img.idx = 0; // force it to be a profile picture
    const image = await imagesService.create({ id: newUser.userId }, user.img);
    if (image.affectedRows === 0) {
      throw new Error("Image not created");
    }
    newImage = await imagesService.getImagesByUser(newUser.userId);
    delete newUser.password;
    return { newUser, newImage };
  } catch (error) {
    // cleanup on error
    if (newUser) remove(newUser.userId);
    if (newImage)
      imagesService.deleteImage({ user: { id: newUser.userId }, idx: 0 });
    console.error(`${errMessagePrefix}.create: ${error.message}`);
    throw new Error(error.message);
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
    console.error(`${errMessagePrefix}.findOrCreate: ${error.message}`);
    throw new Error(error.message);
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
    console.error(`${errMessagePrefix}.findById: ${error.message}`);
    if (error.message.includes("not found")) {
      throw new NotFoundException(error.message);
    }
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
    if (!isValidEmail(email)) throw new Error("Invalid email");
    const user = await userDao.findByEmail(email);
    if (!user || user.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }
    return user[0];
  } catch (error) {
    console.error(`${errMessagePrefix}.findByEmail: ${error.message}`);
    if (error.message.includes("Invalid")) {
      throw new BadRequestException(error.message);
    }
    if (error.message.includes("not found")) {
      throw new NotFoundException(error.message);
    }
    throw new Error(`${errMessagePrefix}.findByEmail: ${error.message}`);
  }
}

async function findAuthUserByEmail(email) {
  try {
    if (!isValidEmail(email)) throw new Error("Invalid email");
    const user = await userDao.findAuthUserByEmail(email);
    if (!user || user.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }
    return user[0];
  } catch (error) {
    console.error(`${errMessagePrefix}.findByEmail: ${error.message}`);
    if (error.message.includes("Invalid")) {
      throw new BadRequestException(error.message);
    }
    if (error.message.includes("not found")) {
      throw new NotFoundException(error.message);
    }
    throw new Error(`${errMessagePrefix}.findByEmail: ${error.message}`);
  }
}

async function updateLocation(email, longitude, latitude) {
  try {
    const user = await findByEmail(email);
    const queryOutput = await userDao.updateLastLocation(
      user.userId,
      longitude,
      latitude
    );
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not updated");
    }
    user.longitude = longitude;
    user.latitude = latitude;
    return user;
  } catch (error) {
    console.error(`${errMessagePrefix}.updateLocation: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
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
    if (
      error.message.includes("Invalid") ||
      error.message.includes("Limit too large")
    ) {
      throw new BadRequestException(error.message);
    }
    console.error(`${errMessagePrefix}.findUsersByName: ${error.message}`);
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

async function update(userId, user) {
  try {
    validateUserUpdate(user);
    const {
      firstName,
      lastName,
      displayName,
      email,
      latitude,
      longitude,
      radiusInKm,
      interests,
      sex,
      bio,
    } = user;
    const emailExists = await userDao.findByEmail(email);
    if (emailExists && emailExists.length && emailExists[0].userId !== userId) {
      throw new Error("Email already exists");
    }

    const result = userDao.update(
      userId,
      firstName,
      lastName,
      displayName,
      email,
      latitude,
      longitude,
      radiusInKm,
      interests,
      sex,
      bio
    );
    if (result.affectedRows === 0) {
      throw new Error("User not updated");
    }
    return await findById(userId);
  } catch (error) {
    console.error(`${errMessagePrefix}.update: ${error.message}`);
    if (error.message.includes("exists")) {
      throw new ForbiddenException("Email already exists");
    }
    if (error.message.includes("updated")) {
      throw new ServiceUnavailableException(error.message);
    }
    throw new BadRequestException("Invalid user object: " + error.message);
  }
}

/**
 * @description updates the user's password
 * @param {*} userId the id of the user to update
 * @param {*} password the new password
 * @returns the updated user object
 * @throws if the user does not exist
 * @throws if the new password is invalid
 * @throws if database query fails
 */
async function updatePassword(userId, password) {
  try {
    if (!password || !isPasswordStrong(password)) {
      throw new Error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }
    const user = await findById(userId);
    const queryOutput = await userDao.updatePassword(userId, password);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not updated");
    }
    return user;
  } catch (error) {
    if (error.message.includes("Password must be at least 8 characters long")) {
      throw new BadRequestException(error.message);
    }
    console.error(`${errMessagePrefix}.updatePassword: ${error.message}`);
    throw new Error(`${errMessagePrefix}.updatePassword: ${error.message}`);
  }
}

module.exports = {
  create,
  remove,
  findById,
  findByEmail,
  findAuthUserByEmail,
  findUsersByName,
  findOrCreate,
  getLocationByIP,
  findAll,
  update,
  updatePassword,
  updateLocation,
};
