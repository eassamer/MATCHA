const errMessagePrefix = 'MessageController: '; // for better debugging
const messageService = require('@services/messages/message.service');

async function createMessage(req, res) {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
      return res.status(400).json({ error: 'Receiver ID and content are required' });
    }
    const message = await messageService.createMessage(req.user.id, receiverId, content);
    res.status(201).json(message);
  } catch (err) {
    err.message = `${errMessagePrefix}.createMessage: ${err.message}`;
    res.status(err.status || 400).json({ error: err.message });
  }
}
async function getMessagesBetweenUsers(req, res) {
  try {
    const { receiverId, take = 0, limit = 10 } = req.query;
    if (!receiverId) {
      return res.status(400).json({ error: 'Receiver ID is required' });
    }
    const messages = await messageService.getMessagesBetweenUsers(req.user.id, receiverId, take, limit);
    res.status(200).json(messages);
  } catch (err) {
    err.message = `${errMessagePrefix}.getMessagesBetweenUsers: ${err.message}`;
    res.status(err.status || 400).json({ error: err.message });
  }
}

async function deleteMessage(req, res) {
  try {
    const { messageId } = req.body;
    if (!messageId) {
      return res.status(400).json({ error: 'Message ID is required' });
    }
    const result = await messageService.deleteMessage(messageId);
    res.status(200).json(result);
  } catch (err) {
    err.message = `${errMessagePrefix}.deleteMessage: ${err.message}`;
    res.status(err.status || 400).json({ error: err.message });
  }
}
module.exports = {
  createMessage,
  getMessagesBetweenUsers,
  deleteMessage,
};