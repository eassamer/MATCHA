cloudinary = require('cloudinary').v2;
imageDao = require('@lib/dao/images/images');
errMessagePrefix = 'imagesService: ';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

function validateImage(img) {
  if (!img || !img.data || !img.data.startsWith('data:image'))
    throw new Error('invalid image data');
  const idx = parseInt(img.idx);
  if (idx < 0)
    throw new Error('invalid image index');
}

/**
 * Creates an image entry in the database and uploads the image to Cloudinary.
 * If an image with the same index already exists for the user, it will be deleted from Cloudinary.
 *
 * @param {Object} body - The request body containing user and image data.
 * @param {Object} body.user - The user object.
 * @param {string} body.user.id - The ID of the user.
 * @param {Object} body.img - The image object.
 * @param {string} body.img.idx - The index of the image.
 * @param {string} body.img.data - The image data to be uploaded.
 * @returns {Promise<string>} - The URL of the uploaded image.
 * @throws {Error} - Throws an error if the image upload or database operation fails.
 */
async function create(body) {
  try {
    validateImage(body.img);
    imageDao.findByOwnerAndIdx(body.user.id, body.img.idx)
      .then(async (imageAtIdx) => {
        if (imageAtIdx.length > 0) {
          await cloudinary.uploader.destroy(imageAtIdx.ownerId + imageAtIdx[0].idx, {
            invalidate: true,
          });
        }
      });
    const result = await cloudinary.uploader.upload(
      body.img.data,
      {
        folder: body.user.id,
        type: 'authenticated',
        public_id: body.img.idx,
      }
    );
    await imageDao.create({
      locationUrl: result.url,
      ownerId: body.user.id,
      idx: body.img.idx,
    });
    return result.url;
  } catch (error) {
    throw new Error(errMessagePrefix + error.message);
  }
}

/**
 * Deletes an image based on the provided user and image index.
 *
 * @param {Object} body - The request body containing user and image information.
 * @param {Object} body.user - The user object.
 * @param {string} body.user.id - The ID of the user.
 * @param {Object} body.img - The image object.
 * @param {number} body.img.idx - The index of the image.
 * @returns {Promise<void>} - A promise that resolves when the image is deleted.
 * @throws {Error} - Throws an error if the image deletion fails.
 */
async function deleteImage(body) {
  try {
    const idx = parseInt(body.idx);
    const image = await imageDao.findByOwnerAndIdx(body.user.id, idx);
    if (image.length > 0) {
      await cloudinary.uploader.destroy(image[0].ownerId + image[0].idx, {
        invalidate: true,
      });
      return await imageDao.deleteImage(image[0].imageId);
    }
  } catch (error) {
    throw new Error(errMessagePrefix + error.message);
  }
}

async function getImagesByUser(userId) {
  try {
    const images = await imageDao.findByOwner(userId);
    images.forEach((image) => { image.locationUrl = cloudinary.url(image.locationUrl); });
    return images;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  create,
  deleteImage,
  getImagesByUser,
};