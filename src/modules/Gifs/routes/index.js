const express = require('express');

const ctrlGif = require('../index');

const router = express.Router();

const upload = require('../../../middlewares/uploadMiddleware');

router.post('/', upload.single('image'), ctrlGif.createGif);

module.exports = router;
