const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const uuid = require('uuid');

const db = low(new FileSync('db.json'));

db.defaults({ gallery: [] }).write();

const getAllImages = () => db.get('gallery').value();

const saveFile = file =>
  db
    .get('gallery')
    .push({ id: uuid.v4(), ...file })
    .last()
    .write();

const processImage = image => {
  const fileTypeBuffer = readChunk.sync(image.path, 0, 4100);
  const type = fileType(fileTypeBuffer);

  if (!type) {
    // check
    throw new Error('Wrong file type.');
  }

  const newFileName = image.name.split(' ').join('-');
  const newPath = `public/uploads/${newFileName}`;

  // Rename file based on image name
  fs.rename(image.path, newPath, (err) => {
    if (err) {
      throw new Error('Cannot rename file', err);
    }

    // Change image path after rename file
    const newMetadata = {
      ...image,
      path: newPath,
    };

    // Save file to persistence
    saveFile(newMetadata);
  });
};

const delay = (t) => new Promise(((resolve) => {
  setTimeout(resolve, t);
}));

module.exports = {
  Query: {
    gallery: () => getAllImages(),
  },
  Mutation: {
    updateGallery: (_, { images }) => {
      console.log('New images for gallery:', images);

      // Because we use FileSync adapter,
      // all processed images won't be readable after write to db
      return Promise.all(images.map(processImage))
        .then(() => delay(0).then(() => getAllImages()));
    },
  },
};

