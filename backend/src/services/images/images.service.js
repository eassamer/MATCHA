const {
  UnsupportedMediaTypeException,
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} = require("@lib/utils/exceptions");

cloudinary = require("cloudinary").v2;
imageDao = require("@lib/dao/images/images");
const { v4: uuidv4 } = require("uuid");
errMessagePrefix = "imagesService: ";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

function validateImage(img) {
  if (!img || !img.data || !img.data.startsWith("data:image")) {
    throw new Error("invalid image data");
  }
  const idx = parseInt(img.idx);
  if (idx < 0 || idx > 4) throw new Error("invalid image index");
  return true;
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
async function create(user, img) {
  try {
    validateImage(img);
    imageDao.findByOwnerAndIdx(user.id, img.idx).then(async (imageAtIdx) => {
      try {
        if (imageAtIdx.length > 0) {
          console.log(imageAtIdx[0].publicId);
          const result = await cloudinary.api.delete_resources(
            [imageAtIdx[0].ownerId + '/' + imageAtIdx[0].publicId],
            {
              type: "authenticated",
              resource_type: "image",
            }
          );
          console.log(result);
        }
      } catch (error) {
        console.error(errMessagePrefix + error.message);
      }
    });
    const public_id = uuidv4();
    const result = await cloudinary.uploader.upload(img.data, {
      folder: user.id,
      type: "authenticated",
      public_id: public_id,
    });
    await imageDao.create({
      locationUrl: result.url,
      ownerId: user.id,
      idx: img.idx,
      public_id: public_id,
    });
    return result.url;
  } catch (error) {
    console.error(errMessagePrefix, error);
    throw new UnsupportedMediaTypeException(errMessagePrefix + error.message);
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
async function deleteImage(user, idx) {
  try {
    const index = parseInt(idx);
    if (isNaN(index) || index < 0 || index > 4)
      throw new Error("Invalid image index");
    const image = await imageDao.findByOwnerAndIdx(user.id, index);
    console.log(image);
    if (image.length > 0) {
      console.log(image[0].public_id);
      console.log(
        await cloudinary.api.delete_resources([image[0].ownerId + '/' + image[0].public_id], {
          type: "authenticated",
          resource_type: "image",
        })
      );
      await decrementImagesIndex(user.id, index);
      console.log("decrementImagesIndex");
      return await imageDao.deleteImage(image[0].imageId);
    }
  } catch (error) {
    console.error(errMessagePrefix + error.message);
    if (error.message === "Invalid image index")
      throw new BadRequestException(error.message);
    throw new NotFoundException(errMessagePrefix + error.message);
  }
}

async function decrementImagesIndex(ownerId, idx) {
  try {
    const image = await imageDao.decrementImagesIndex(ownerId, idx);
  } catch (error) {
    console.error(`${errMessagePrefix} .decrementImagesIndex: ${error.message}`)
  } 
}


async function swapImages(idx1, idx2, ownerId) {
  try {
    if (idx1 === idx2) return;
    if (isNaN(idx1) || isNaN(idx2)) throw new Error("Invalid image index");
    if (idx1 < 0 || idx1 > 4 || idx2 < 0 || idx2 > 4)
      throw new Error("Invalid image index");
    const currentImages = await imageDao.findByOwner(ownerId);
    if (currentImages.length === 0) throw new Error("No images found");
    const imageAtIdx1 = currentImages.find((img) => img.idx === idx1);
    const imageAtIdx2 = currentImages.find((img) => img.idx === idx2);
    if (!imageAtIdx1 || !imageAtIdx2) throw new Error("Image not found");
    return await imageDao.swapImages(idx1, idx2, ownerId);
  } catch (error) {
    console.error(`${errMessagePrefix} .swapImages: ${error.message}`);
    if (error.message === "Invalid image index")
      throw new BadRequestException(error.message);
    if (error.message === "No images found")
      throw new NotFoundException(error.message);
    if (error.message === "Image not found")
      throw new NotFoundException(error.message);
    throw ServiceUnavailableException(error.message);
  }
}

async function getImagesByUser(userId) {
  try {
    if (!userId || userId === "") throw new Error("User ID is required");
    const images = await imageDao.findByOwner(userId);
    images.forEach((image) => {
      image.locationUrl = cloudinary.url(image.locationUrl);
    });
    return images;
  } catch (error) {
    console.error(errMessagePrefix + error.message);
    if (error.message === "User ID is required")
      throw new BadRequestException(error.message);
    throw new NotFoundException(errMessagePrefix + error.message);
  }
}

module.exports = {
  create,
  validateImage,
  deleteImage,
  swapImages,
  getImagesByUser,
};
