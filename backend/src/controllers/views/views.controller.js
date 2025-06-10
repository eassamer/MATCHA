async function addView(req, res) {
  try {
    const { id } = req.body;
    const view = await viewsService.addView(req.user.id, id);
    res.status(201).json(view);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

async function getViewsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const views = await viewsService.getViewsByUserId(userId);
    res.status(200).json(views);
  } catch (error) {
    res.status(error.status || 400).json({ error: error.message });
  }
}

module.exports = {
  addView,
  getViewsByUserId,
};