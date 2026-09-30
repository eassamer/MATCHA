// Database client: a lazily-created mysql2 connection pool.
//
// Every DAO does `(await client).execute(sql, params, cb)`; awaiting this module
// (a plain object) returns the object itself, so the DAOs keep working unchanged
// while the underlying connection is now a pool instead of a single connection.
const mysql = require("mysql2");

const DB_NAME_PATTERN = /^[A-Za-z0-9_]+$/;

function buildConfig() {
  const database = process.env.DB_NAME;
  if (!database || !DB_NAME_PATTERN.test(database)) {
    throw new Error("DB_NAME must be set to a valid database name");
  }
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_SIZE) || 10,
    enableKeepAlive: true,
  };
}

let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(buildConfig());
  }
  return pool;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Verifies the database is reachable, retrying while MySQL boots.
 * @returns {Promise<import("mysql2").Pool>}
 */
async function ready({ maxRetries = 10, retryDelayMs = 3000, log = console.log } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      await getPool().promise().query("SELECT 1");
      log("Database connection established");
      return getPool();
    } catch (error) {
      if (attempt >= maxRetries) {
        throw new Error(
          `Could not connect to the database after ${attempt} attempts: ${error.message}`
        );
      }
      log(`Database not reachable (${error.message}), retrying in ${retryDelayMs / 1000}s...`);
      await sleep(retryDelayMs);
    }
  }
}

async function close() {
  if (pool) {
    const p = pool;
    pool = null;
    await p.promise().end();
  }
}

module.exports = {
  getPool,
  ready,
  close,
  execute: (...args) => getPool().execute(...args),
  query: (...args) => getPool().query(...args),
  promise: () => getPool().promise(),
};
