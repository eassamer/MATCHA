const errMessagePrefix = 'MessageService: '; // for better debugging
const messageDao = require('@lib/dao/messages/message');
const userService = require('@services/users/users.service');
const { getIO } = require('@lib/socketManager');  
const { NotFoundException, ForbiddenException } = require('@lib/utils/exceptions');


async function createMessage(senderId, receiverId, content) {
  try {
    const sender = await userService.findById(senderId);
    const receiver = await userService.findById(receiverId);
    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver does not exist');
    }
    if (!content || content.trim() === '') {
      throw new ForbiddenException('Message content cannot be empty');
    }
    if (senderId === receiverId) {
      throw new ForbiddenException('Sender and receiver cannot be the same');
    }
    const message = {
      senderId,
      receiverId,
      content,
      createdAt: new Date(),
    };
    const result = await messageDao.create(message);
    
    // Emit the message to the receiver
    const io = getIO();
    io.to(receiverId).emit('newMessage', {
      ...message,
    });
    
    return result;
  } catch (err) {
    err.message = `${errMessagePrefix}.createMessage: ${err.message}`;
    throw err;
  }
}

async function getMessagesBetweenUsers(senderId, receiverId, take = 0, limit = 10) {
  try {
    const sender = await userService.findById(senderId);
    const receiver = await userService.findById(receiverId);
    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver does not exist');
    }
    if (senderId === receiverId) {
      throw new ForbiddenException('Sender and receiver cannot be the same');
    }
    if (take < 0 || limit <= 0) {
      throw new ForbiddenException('Invalid pagination parameters');
    }
    const messages = await messageDao.findBySenderAndReceiver(senderId, receiverId, take, limit);
    return messages;
  } catch (err) {
    err.message = `${errMessagePrefix}.getMessagesBetweenUsers: ${err.message}`;
    throw err;
  }
}

async function deleteMessage(messageId) {
  try {
    const result = await messageDao.deleteMessage(messageId);
    const io = getIO();
    io.emit('messageDeleted', { messageId });
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