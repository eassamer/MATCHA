const { BadRequestException } = require("@lib/utils/exceptions");
const ImageService = require("@services/images/images.service");

async function create(req, res) {
  try {
    const image = await ImageService.create(req.user, req.body?.img);
    res.status(201).json(image);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function deleteImage(req, res) {
  try {
    const image = await ImageService.deleteImage(req.user, req.query?.idx);
    res.status(200).json(image);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

async function swapImages(req, res) {
  try {
    const { idx1, idx2 } = req.body;
    if (isNaN(idx1) || isNaN(idx2)) {
      throw new BadRequestException("Invalid image index");
    }
    const image = await ImageService.swapImages(idx1, idx2, req.user.id);
    res.status(200).json(image);
  } catch (error) {
    res.status(error?.status || 400).json({ error: error?.message });
  }
}

async function getImagesByUser(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) {
      throw new BadRequestException("User ID is required");
    }
    const images = await ImageService.getImagesByUser(userId);
    res.status(200).json(images);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
}

module.exports = {
  create,
  deleteImage,
  swapImages,
  getImagesByUser,
};
