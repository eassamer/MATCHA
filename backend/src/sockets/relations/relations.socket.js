const relationService = require("@services/relations/relations.service");

/**
 * Registers relation-related events for the provided socket connection.
 *
 * @param {Object} socket - The socket connection object.
 *
 * Listens for:
 *  - "getLikes": Retrieves and emits the list of users who have liked the authenticated user.
 *
 * Emits:
 *  - "likesResponse": Contains the list of users who have liked the authenticated user.
 *  - "likesError": Contains the error message if there is an issue retrieving likes.
 */

module.exports = function registerRelationEvents(socket) {
  // getLikes
  socket.on("getLikes", async () => {
    try {
      const likes = await relationService.getLikes(socket.user.id);
      socket.emit("likesResponse", likes);
    } catch (err) {
      socket.emit("likesError", { error: err.message });
    }
  });
};
