const error = require(`debug`)(`ia:uploader:base64:error`);
const fs = require('fs');

// function to encode file data to base64 encoded string
function base64Encode (file) {
// read binary data
  return new Promise(function (resolve, reject) {
    fs.readFile(file, function (err, bitmap) {
      if (err) return reject(err);
      else return resolve(Buffer.from(bitmap).toString('base64'));
    });
  })
    .catch(function (err) {
      error(err);
    });
}

// function to create file from base64 encoded string
function base64Decode (base64str, file) {
// create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var bitmap = Buffer.from(base64str, 'base64');
  // write buffer to file
  return new Promise(function (resolve, reject) {
    fs.writeFile(file, bitmap, 'utf8', function (err) {
      if (err) return reject(err);
      else return resolve(bitmap);
    });
  })
    .catch(function (err) {
      error(err);
    });
}

module.exports = {
  base64Encode,
  base64Decode,
};