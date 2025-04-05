jest.mock("../../src/lib/dao/users/users", () => ({
  create: jest.fn(async (user) => ({
    userId: 1,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
  })),

  findAuthUserByEmail: jest.fn(async (email) => ({
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    email: email,
    password: "hashed_password",
  })),

  findByEmail: jest.fn(async () => []),

  updatePassword: jest.fn(async (userId, password) => ({
    userId: userId,
    password: password,
  })),

  remove: jest.fn(async (userId) => ({
    userId: userId,
  })),

  update: jest.fn(async (userId, user) => ({
    userId: userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })),

  updateLocation: jest.fn(async (userId, location) => ({
    userId: userId,
    location: location,
  })),

  updateInterests: jest.fn(async (userId, interests) => ({
    userId: userId,
    interests: interests,
  })),
}));


const usersDao = require("../../src/lib/dao/users/users");
module.exports = usersDao;
