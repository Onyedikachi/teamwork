const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudStore.cloudName,
  api_key: config.cloudStore.apiKey,
  api_secret: config.cloudStore.apiSecret
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'teamwork',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  },
  storage: storage
});

module.exports = upload;
