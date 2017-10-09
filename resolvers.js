const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const db = low(new FileSync('db.json'));

db.defaults({ gallery: [] }).write();

const saveFile = file =>
  db
    .get('gallery')
    .push({ id: file.path, ...file })
    .last()
    .write();

module.exports = {
  Query: {
    uploads: () => db.get('gallery').value(),
  },
  Mutation: {
    singleUpload: (_, { file }) => saveFile(file),
    multipleUpload: (_, { files }) => Promise.all(files.map(saveFile)),
  },
};

