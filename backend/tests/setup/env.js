// Loads .env.test before any module is required. Existing env vars take precedence.
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env.test") });
