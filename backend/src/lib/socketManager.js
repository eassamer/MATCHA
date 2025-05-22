let io = null;

function setSocketInstance(socketInstance) {
  io = socketInstance;
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

module.exports = { setSocketInstance, getIO };
