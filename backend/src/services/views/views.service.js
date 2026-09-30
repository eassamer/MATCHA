const viewsDao = require("@lib/dao/views/views");
const userService = require("@services/users/users.service");
const notificationsService = require("@services/notifications/notifications.service");
const { getIO } = require("@lib/socketManager");
const { BadRequestException } = require("@lib/utils/exceptions");

const errMessagePrefix = "ViewsService: "; //for better debugging

/**
 * @description users who viewed the given profile, most recent first
 */
async function getViewsByUserId(userId) {
  try {
    return await viewsDao.findByUserId(userId);
  } catch (err) {
    err.message = `${errMessagePrefix}.getViewsByUserId: ${err.message}`;
    throw err;
  }
}

/**
 * @description records a profile visit (once per viewer/viewed pair) and notifies the viewed user
 * @returns {{created: boolean, viewerId: string, viewedId: string}}
 */
async function addView(viewerId, viewedId) {
  try {
    if (!viewedId || typeof viewedId !== "string") {
      throw new BadRequestException("Viewed user id is required");
    }
    if (viewerId === viewedId) {
      return { created: false, viewerId, viewedId, message: "Own profile views are not recorded" };
    }
    const viewer = await userService.findById(viewerId); // throws NotFoundException
    await userService.findById(viewedId);

    const existing = await viewsDao.checkView(viewerId, viewedId);
    if (existing.length > 0) {
      return { created: false, viewerId, viewedId, message: "View already recorded" };
    }
    const result = await viewsDao.create(viewerId, viewedId);
    if (result.affectedRows === 0) {
      return { created: false, viewerId, viewedId, message: "View already recorded" };
    }

    getIO().to(viewedId).emit("view", {
      viewerId,
      displayName: viewer.displayName,
      createdAt: new Date(),
    });
    await notificationsService.createNotifcation(
      viewedId,
      "view",
      `${viewer.displayName} has viewed your profile`
    );
    return { created: true, viewerId, viewedId };
  } catch (err) {
    err.message = `${errMessagePrefix}.addView: ${err.message}`;
    throw err;
  }
}

module.exports = {
  getViewsByUserId,
  addView,
};
