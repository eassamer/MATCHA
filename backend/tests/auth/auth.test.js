const { test, expect } = require("@jest/globals");
const GlobalDatabase = require("../db/global.database");

const DAO = new GlobalDatabase();

let userDao = DAO.users;

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
