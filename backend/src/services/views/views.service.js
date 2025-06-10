var viewsDao = require('@lib/dao/views/views');
const { NotFoundException } = require('@lib/utils/exceptions');
var userService = require('@services/user/user.service');


const errMessagePrefix = 'ViewsService: '; //for better debugging

async function getViewsByUserId(userId) {
  try {
    const views = await viewsDao.findByUserId(userId);
    return views;
  } catch (err) {
    err.message = `${errMessagePrefix}.getViewsByUserId: ${err.message}`;
    throw err;
  }
}

async function addView(viewerId, viewedId) {
  try {
    const viewer = await userService.findById(viewerId);
    const viewed = await userService.findById(viewedId);
    if (!viewer || !viewed) {
      throw new NotFoundException('User does not exist');
    }
    const existingView = await viewsDao.checkView(viewerId, viewedId);
    if (existingView.length > 0) {
      return { message: 'View already exists' };
    }
    const result = await viewsDao.create(viewerId, viewedId);
    return result;
  } catch (err) {
    err.message = `${errMessagePrefix}.addView: ${err.message}`;
    throw err;
  }
}



moduke.exports = {
  getViewsByUserId,
  addView,
};