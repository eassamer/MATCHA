const viewsService = require("@services/views/views.service");
const { ForbiddenException } = require("@lib/utils/exceptions");

async function addView(req, res) {
  try {
    const { id } = req.body;
    const view = await viewsService.addView(req.user.id, id);
    res.status(view.created ? 201 : 200).json(view);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function getMyViews(req, res) {
  try {
    const views = await viewsService.getViewsByUserId(req.user.id);
    res.status(200).json(views);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function getViewsByUserId(req, res) {
  try {
    if (req.params.userId !== req.user.id) {
      throw new ForbiddenException("You can only list who viewed your own profile");
    }
    const views = await viewsService.getViewsByUserId(req.user.id);
    res.status(200).json(views);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

module.exports = {
  addView,
  getMyViews,
  getViewsByUserId,
};
