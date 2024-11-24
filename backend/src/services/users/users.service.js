// Description: This file contains the service layer functions for the users table.

const userDao = require("@dao/users/users");
const oauthUserDao = require("@dao/users/oauth.users");
const errMessagePrefix = "UserService: ";

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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
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
		"age",
    "email",
    "password",
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
      `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number`
    );
  }

  if (!isNameValid(user.firstName)) {
    throw new Error(`Invalid first name`);
  }

	if (user.age < 18) {
		throw new Error(`User must be at least 18 years old`);
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
    return await oauthUserDao.create(user);
  } catch (error) {
    throw new Error(`${errMessagePrefix}.findOrCreate: ${error.message}`);
  }
}

/**
 * @description updates the user's first name
 * @param {*} userId the id of the user to update
 * @param {*} firstName the new first name
 * @returns the updated user object
 * @throws if the user does not exist
 * @throws if the new first name is invalid
 * @throws if database query fails
 */
async function updateFirstName(userId, firstName) {
  try {
    if (!isNameValid(firstName)) {
      throw new Error("Invalid first name");
    }
    const user = await findById(userId);
    const queryOutput = await userDao.updateFirstName(userId, firstName);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not updated");
    }
    user.firstName = firstName;
    return user;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.updateFirstName: ${error.message}`);
  }
}

/**
 * @description updates the user's last name
 * @param {*} userId the id of the user to update
 * @param {*} lastName the new last name
 * @returns the updated user object
 * @throws if the user does not exist
 * @throws if the new last name is invalid
 * @throws if database query fails
 */
async function updateLastName(userId, lastName) {
  try {
    if (!isNameValid(lastName)) {
      throw new Error("Invalid last name");
    }
    const user = await findById(userId);
    const queryOutput = await userDao.updateLastName(userId, lastName);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not updated");
    }
    user.lastName = lastName;
    return user;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.updateLastName: ${error.message}`);
  }
}

/**
 * @description updates the user's email
 * @param {*} userId the id of the user to update
 * @param {*} email the new email
 * @returns the updated user object
 * @throws if the user does not exist
 * @throws if the new email is invalid
 * @throws if the email already exists in the database
 * @throws if database query fails
 */
async function updateEmail(userId, email) {
  try {
    if (!isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    const user = await findById(userId);
    const queryOutput = await userDao.updateEmail(userId, email);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not updated");
    }
    user.email = email;
    return user;
  } catch (error) {
    throw new Error(`${errMessagePrefix}.updateEmail: ${error.message}`);
  }
}

/**
 * @description updates the user's last location
 * @param {*} userId the id of the user to update
 * @param {*} lastLocation the new last location
 * @returns the updated user object
 * @throws if the user does not exist
 * @throws if database query fails
 */
async function updateLastLocation(userId, longitude, latitude) {
  try {
    const user = await findById(userId);
    const queryOutput = await userDao.updateLastLocation(userId, longitude, latitude);
    if (queryOutput.affectedRows === 0) {
      throw new Error("User not updated");
    }
    user.longitude = longitude;
		user.latitude = latitude;
    return user;
  } catch (e) {
    throw new Error(`${errMessagePrefix}.updateLastLocation: ${error.message}`);
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
    if (!isPasswordStrong(password)) {
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
    throw new Error(`${errMessagePrefix}.updatePassword: ${error.message}`);
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

module.exports = {
  create,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateLastLocation,
  updatePassword,
  remove,
  findById,
  findByEmail,
  findUsersByName,
  findOrCreate,
};
