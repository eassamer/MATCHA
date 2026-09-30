const errMessagePrefix = "MessageService: "; // for better debugging
const messageDao = require("@lib/dao/messages/message");
const userService = require("@services/users/users.service");
const { getIO } = require("@lib/socketManager");
const {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} = require("@lib/utils/exceptions");

const MAX_CONTENT_LENGTH = 1000;

function toPageInt(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Number(value);
  return Number.isInteger(n) ? n : NaN;
}

async function createMessage(senderId, receiverId, content) {
  try {
    if (typeof content !== "string" || content.trim() === "") {
      throw new BadRequestException("Message content cannot be empty");
    }
    const trimmed = content.trim();
    if (trimmed.length > MAX_CONTENT_LENGTH) {
      throw new BadRequestException(`Message content cannot exceed ${MAX_CONTENT_LENGTH} characters`);
    }
    if (senderId === receiverId) {
      throw new ForbiddenException("Sender and receiver cannot be the same");
    }
    await userService.findById(senderId); // throws NotFoundException
    await userService.findById(receiverId);

    const message = await messageDao.create({ senderId, receiverId, content: trimmed });

    getIO().to(receiverId).emit("newMessage", message);
    return message;
  } catch (err) {
    err.message = `${errMessagePrefix}.createMessage: ${err.message}`;
    throw err;
  }
}

async function getMessagesBetweenUsers(senderId, receiverId, take = 0, limit = 10) {
  try {
    const offset = toPageInt(take, 0);
    const size = toPageInt(limit, 10);
    if (Number.isNaN(offset) || Number.isNaN(size) || offset < 0 || size <= 0 || size > 100) {
      throw new BadRequestException("Invalid pagination parameters");
    }
    if (senderId === receiverId) {
      throw new ForbiddenException("Sender and receiver cannot be the same");
    }
    await userService.findById(receiverId); // throws NotFoundException
    return await messageDao.findBySenderAndReceiver(senderId, receiverId, offset, size);
  } catch (err) {
    err.message = `${errMessagePrefix}.getMessagesBetweenUsers: ${err.message}`;
    throw err;
  }
}

async function deleteMessage(messageId) {
  try {
    const message = await messageDao.findById(messageId);
    if (!message) {
      throw new NotFoundException("Message not found");
    }
    const result = await messageDao.deleteMessage(messageId);
    const io = getIO();
    io.to(message.senderId).emit("messageDeleted", { messageId });
    io.to(message.receiverId).emit("messageDeleted", { messageId });
    return result;
  } catch (err) {
    err.message = `${errMessagePrefix}.deleteMessage: ${err.message}`;
    throw err;
  }
}

module.exports = {
  createMessage,
  getMessagesBetweenUsers,
  deleteMessage,
};
