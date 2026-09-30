// Single process entrypoint: HTTP server + socket.io on PORT (default 3001).
require("dotenv").config();
require("module-alias/register");

const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const db = require("@lib/db/dbconnect");
const { setSocketInstance } = require("@lib/socketManager");
const socketAuthMiddleware = require("@middlewares/auth/socket.middleware");
const registerRelationEvents = require("@sockets/relations/relations.socket");

const PORT = Number(process.env.PORT) || 3001;

async function main() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set");
  }
  await db.ready();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_PUBLIC_URL || "http://localhost:3000",
      credentials: true,
    },
  });
  setSocketInstance(io);
  io.use(socketAuthMiddleware);
  io.on("connection", (socket) => {
    socket.join(String(socket.user.id));
    registerRelationEvents(socket);
  });

  server.listen(PORT, () => {
    console.log(`Matcha backend listening on port ${PORT}`);
  });

  const shutdown = async () => {
    io.close();
    server.close();
    await db.close();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
