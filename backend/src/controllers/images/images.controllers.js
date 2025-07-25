const ImageService = require('@services/images/images.service');


async function create(req, res) {
  try {
    //TODO: check the user ID using a JWT middleware to inject the user object into the request body
    const image = await ImageService.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteImage(req, res) {
  try {
    const image = await ImageService.deleteImage(req.body);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getImagesByUser(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new Error('User ID is required');
    }
    const images = await ImageService.getImagesByUser(userId);
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  create,
  deleteImage,
  getImagesByUser,
}
