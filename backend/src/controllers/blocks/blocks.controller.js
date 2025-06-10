const { BadRequestException } = require("@lib/utils/exceptions");
const BlockService = require("@services/blocks/blocks.service");
const exp = require("constants");

async function blockUser(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestException("Blocked ID is required");
    }
    const result = await BlockService.blockUser(req.user.id, id);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function unblockUser(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestException("Blocked ID is required");
    }
    const result = await BlockService.unblockUser(req.user.id, id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function getBlockedUsers(req, res) {
  try {
    const blockedUsers = await BlockService.getBlockedUsers(req.user.id);
    res.status(200).json(blockedUsers);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

module.exports = {
  blockUser,
  unblockUser,
  getBlockedUsers,
};