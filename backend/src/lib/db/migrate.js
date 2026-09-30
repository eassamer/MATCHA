// Applies db/schema.sql to the configured database. Idempotent: the schema
// only uses CREATE ... IF NOT EXISTS. Usage:
//   node src/lib/db/migrate.js          # create DB if missing + apply schema
//   node src/lib/db/migrate.js --reset  # drop and recreate the DB first
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const SCHEMA_PATH = path.join(__dirname, "../../../db/schema.sql");
const DB_NAME_PATTERN = /^[A-Za-z0-9_]+$/;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function serverConfig() {
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true,
  };
}

async function connectWithRetry(
  config = serverConfig(),
  { maxRetries = 15, retryDelayMs = 2000, log = () => {} } = {}
) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await mysql.createConnection(config);
    } catch (error) {
      if (attempt >= maxRetries) throw error;
      log(`MySQL not ready (${error.code || error.message}), retry ${attempt}/${maxRetries}`);
      await sleep(retryDelayMs);
    }
  }
}

function loadSchema() {
  return fs
    .readFileSync(SCHEMA_PATH, "utf8")
    .replace(/^\s*USE\s+`?\w+`?\s*;\s*$/gim, ""); // the target DB is chosen at runtime
}

async function migrate({
  database = process.env.DB_NAME,
  reset = false,
  log = console.log,
} = {}) {
  if (!database || !DB_NAME_PATTERN.test(database)) {
    throw new Error("DB_NAME must be set to a valid database name");
  }
  const connection = await connectWithRetry(serverConfig(), { log });
  try {
    if (reset) {
      await connection.query(`DROP DATABASE IF EXISTS \`${database}\``);
    }
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.query(`USE \`${database}\``);
    await connection.query(loadSchema());
    log(`Schema applied to database "${database}"`);
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  require("dotenv").config();
  migrate({ reset: process.argv.includes("--reset") })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Migration failed:", error.message);
      process.exit(1);
    });
}

module.exports = { migrate, connectWithRetry, serverConfig, loadSchema };
