class ImagesTable {
  constructor() {
    this.name = "imagesTable";
    this.message = "Images Table";
    this.status = 200;
    this.client = null;
    this.isConnected = false;
    this.connection = null;
    this.images = [];
  }

  async findById(id) {
    return this.images.find((image) => image.imageId === id);
  }

  async findByOwner(ownerId) {
    return this.images.filter((image) => image.ownerId === ownerId);
  }

  async findByOwnerAndIdx(ownerId, idx) {
    return this.images.find(
      (image) => image.ownerId === ownerId && image.idx === idx
    );
  }

  async decrementImagesIndex(ownerId, idx) {
    const images = await this.findByOwner(ownerId);
    for (const image of images) {
      if (image.idx > idx) {
        image.idx--;
      }
    }
  }

  async create(image) {
    const queryInput = {
      ownerId: image.ownerId,
      idx: image.idx,
      publicId: image.publicId,
      locationUrl: image.locationUrl,
    };
    this.images.push(queryInput);
    return queryInput;
  }

  async swapImages(idx1, idx2, ownerId) {
    const images = await this.findByOwner(ownerId);
    const image1 = images.find((image) => image.idx === idx1);
    const image2 = images.find((image) => image.idx === idx2);
    if (image1 && image2) {
      const tempIdx = image1.idx;
      image1.idx = image2.idx;
      image2.idx = tempIdx;
    }
  }
  async deleteImage(imageId) {
    const image = await this.findById(imageId);
    if (!image) {
      throw new Error(`${this.name}.deleteImage: Image not found`);
    }

    const index = this.images.findIndex((image) => image.imageId === imageId);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
    this.decrementImagesIndex(
      image.ownerId,
      image.idx
    ).then(() => {
      console.log("Image index decremented successfully");
    });
    return image;
  }

}