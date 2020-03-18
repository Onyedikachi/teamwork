const express = require('express');

const ctrlGif = require('../index');

const router = express.Router();

const upload = require('../../../middlewares/uploadMiddleware');

router.post('/', upload.single('image'), ctrlGif.createGif);
router.delete('/:gifId', ctrlGif.deleteGif);
router.post('/:gifId/comment', ctrlGif.commentOnGif);
module.exports = router;
