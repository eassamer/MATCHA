const { test, expect, beforeAll, afterAll, jest } = require("@jest/globals");
const GlobalDatabase = require("../db/global.database");
const { beforeEach } = require("node:test");


var DAO;
const userDao = jest.createMockFromModule("userDao");


beforeAll(() => {
  console.log("Starting global database tests...");
  DAO = new GlobalDatabase();
  userDao.
});

afterAll(() => {
  console.log("Cleaning up global database...");
  DAO = null;
  userDao = null;
});

beforeEach(() => {
  console.log("Cleaning up users...");
  DAO.clearUsers();
});

test("mock register", )



test("mock user", async () => {
  const user = await userDao.create({
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: "hashed_password",
  });
  console.log(user);
  expect(user).toBeDefined();
  return user;
}, 5000);

test("test global database", () => {
  expect(DAO).toBeDefined();
  expect(DAO.users).toBeDefined();
});
