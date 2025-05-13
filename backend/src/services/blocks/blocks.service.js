var blockDao = require('@lib/dao/blocks/blocks');
const userService = require('@services/users/users.service');

const {
  ServiceUnavailableException,
  NotFoundException,
  ForbiddenException,
} = require('@lib/utils/exceptions');

const errMessagePrefix = 'BlockService: ';

async function blockUser(blockerId, blockedId) {
  try {
    if (blockerId === blockedId) {
      throw new ForbiddenException('You cannot block yourself');
    }
    const user = await userService.findById(blockedId);
    if (!user) {
      throw new NotFoundException(`User with Id: ${blockedId} not found`);
    }
    const checkBlock = await blockDao.checkIfBlocked(blockerId, blockedId);
    if (checkBlock.length > 0) {
      throw new ForbiddenException('User already blocked');
    }
    const result = await blockDao.create(blockerId, blockedId);
    if (result.affectedRows === 0) {
      throw new ServiceUnavailableException('Failed to block user');
    }
    return user;
  } catch (error) {
    console.error(`${errMessagePrefix}.blockUser: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
  }
}

async function unblockUser(blockerId, blockedId) {
  try {
    const user = await userService.findById(blockedId);
    if (!user) {
      throw new NotFoundException(`User with Id: ${blockedId} not found`);
    }
    if (blockerId === blockedId) {
      throw new ForbiddenException('You cannot unblock yourself');
    }
    const checkBlock = await blockDao.checkIfBlocked(blockerId, blockedId);
    if (checkBlock.length === 0) {
      throw new ForbiddenException('User not blocked');
    }
    const result = await blockDao.deleteBlock(blockerId, blockedId);
    if (result.affectedRows === 0) {
      throw new ServiceUnavailableException('Failed to unblock user');
    }
    return user;
  } catch (error) {
    console.error(`${errMessagePrefix}.unblockUser: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
  }
}

async function getBlockedUsers(userId) {
  try {
    const blockedUsers = await blockDao.findByUserId(userId);
    return blockedUsers;
  } catch (error) {
    console.error(`${errMessagePrefix}.getBlockedUsers: ${error.message}`);
    throw new ServiceUnavailableException(error.message);
  }
}

module.exports = {
  blockUser,
  unblockUser,
  getBlockedUsers,
};
