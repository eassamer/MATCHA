const fs = require("fs");
const path = require("path");
const connection = require("./dbconnect");

const schemaPath = path.join(__dirname, "schema.sql");

fs.readFile(schemaPath, "utf8", (err, schema) => {
  if (err) {
    console.error("Error reading schema.sql file:", err);
    process.exit(1);
  }

  connection.query(schema, (error, results) => {
    if (error) {
      console.error("Error executing schema.sql:", error);
      process.exit(1);
    }
    console.log("Database schema executed successfully!");
    console.log(results);
    process.exit(0);
  });
});
