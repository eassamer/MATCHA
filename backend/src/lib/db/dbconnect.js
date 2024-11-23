const mysql = require("mysql2/promise");

/**
 * Attempts to create a connection to the database with retry logic.
 *
 * @param {number} [retryCount=0] - The current retry attempt count.
 * @param {number} [maxRetries=5] - The maximum number of retry attempts.
 * @param {number} [retryDelay=5000] - The delay between retry attempts in milliseconds.
 * @returns {Promise<Object>} - A promise that resolves to the database connection object.
 * @throws {Error} - Throws an error if the connection could not be established after the maximum number of retries.
 */
async function createConnection(retryCount = 0, maxRetries = 5, retryDelay = 5000) {
  try {
    console.log(`Attempting to connect to the database (Attempt ${retryCount + 1}/${maxRetries})...`);
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("Successfully connected to the database!");
    return connection;
  } catch (error) {
    console.error(`Connection failed: ${error.message}`);

    if (retryCount < maxRetries) {
      console.warn(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait before retrying
      return createConnection(retryCount + 1, maxRetries, retryDelay);
    } else {
      console.error("All retries exhausted. Could not connect to the database.");
      throw new Error("Could not connect to the database after multiple attempts.");
    }
  }
}

module.exports = (async () => {
  try {
    return await createConnection();
  } catch (error) {
    console.error("Failed to initialize database connection:", error.message);
    process.exit(1);
  }
})();