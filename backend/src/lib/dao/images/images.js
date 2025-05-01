const client = require('@lib/db/dbconnect');
const queries = require('@lib/db/queries');
errMessagePrefix = 'ImageDao: ';

/**
 * Creates a new image entry in the database.
 * If an image with the same ownerId and idx already exists, it will be deleted before creating the new entry.
 *
 * @param {Object} image - The image object to be created.
 * @param {string} image.locationUrl - The URL location of the image.
 * @param {string} image.ownerId - The ID of the owner of the image.
 * @param {number} image.idx - The index of the image.
 * @returns {Promise<Object>} A promise that resolves to the result of the database operation.
 * @throws {Error} If there is an error during the database operation.
 */
async function create(image) {
  try {

    const images = await findByOwner(image.ownerId);
    if (images.length == 0 || image.idx > images.length)
      image.idx = images.length;
    if (images[image.idx]) {
      await deleteImage(images[image.idx].imageId);
    }
    const queryInput = [
      locationUrl = image.locationUrl,
      ownerId = image.ownerId,
      idx = image.idx,
      publicId = image.public_id,
    ];
    return new Promise(
      async (resolve, reject) => {
        (await client).execute(
          queries.ADD_IMAGE,
          queryInput,
          (err, result) => {
            if (err) {
              err.message = `${errMessagePrefix}.create: ${err.message}`;
              return reject(err);
            }
            resolve(result);
          }
        )
      }
    )
  } catch (error) {
    throw new Error(errMessagePrefix + error.message);
  }
}

async function swapImages(idx1, idx2, ownerId) {
  const queryInput = [idx1, idx2, idx2, idx1, ownerId, idx1, idx2];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.SWAP_IMAGES,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.swapImages: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

/**
 * Deletes an image from the database.
 *
 * @param {string} imageId - The ID of the image to be deleted.
 * @returns {Promise<Object>} A promise that resolves with the result of the deletion operation.
 * @throws {Error} If there is an error during the deletion process.
 */
async function deleteImage(imageId) {
  const queryInput = [imageId];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.DELETE_IMAGE,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.deleteImage: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

/**
 * Finds an image by the owner's ID and index.
 *
 * @param {string} ownerId - The ID of the owner.
 * @param {number} idx - The index of the image.
 * @returns {Promise<Object>} A promise that resolves to the result of the query.
 * @throws {Error} If there is an error executing the query.
 */
async function findByOwnerAndIdx(ownerId, idx) {
  const queryInput = [ownerId, idx];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.FIND_IMAGE_BY_OWNER_AND_IDX,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.findByOwnerAndIdx: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}


async function decrementImagesIndex(ownerId, idx) {
  const queryInput = [ownerId, idx];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.DECREMENT_IMAGES_INDEX,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.decrementImagesIndex: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

/**
 * Finds images by the owner's ID.
 *
 * @param {string} ownerId - The ID of the owner whose images are to be found.
 * @returns {Promise<Object>} A promise that resolves to the result of the query.
 * @throws {Error} If there is an error executing the query.
 */
async function findByOwner(ownerId) {
  const queryInput = [ownerId];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.FIND_IMAGES_BY_USER,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.findByOwner: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

/**
 * Finds an image by its ID.
 *
 * @param {string} imageId - The ID of the image to find.
 * @returns {Promise<Object>} A promise that resolves to the result of the query.
 * @throws {Error} If there is an error executing the query.
 */
async function findById(imageId) {
  const queryInput = [imageId];
  return new Promise(
    async (resolve, reject) => {
      (await client).execute(
        queries.FIND_IMAGE_BY_ID,
        queryInput,
        (err, result) => {
          if (err) {
            err.message = `${errMessagePrefix}.findById: ${err.message}`;
            return reject(err);
          }
          resolve(result);
        }
      );
    }
  );
}

module.exports = {
  create,
  deleteImage,
  swapImages,
  decrementImagesIndex,
  findByOwnerAndIdx,
  findByOwner,
  findById,
}
