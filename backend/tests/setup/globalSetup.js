// Runs once before the whole test run: recreate the test database from db/schema.sql.
require("./env");
const { migrate } = require("../../src/lib/db/migrate");

module.exports = async () => {
  await migrate({ reset: true, log: () => {} });
};
