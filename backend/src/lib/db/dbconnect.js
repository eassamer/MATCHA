const mysql = require("mysql2/promise");

async function createConnection(retryCount = 0, maxRetries = 3, retryDelay = 5000) {
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