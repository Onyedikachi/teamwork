const express = require('express');

const ctrlGif = require('../index');

const router = express.Router();

const upload = require('../../../middlewares/uploadMiddleware');

const { checkTokenExists, verifyToken } = require('../../../helpers');

router.post(
  '/',
  checkTokenExists,
  verifyToken,
  upload.single('image'),
  ctrlGif.createGif
);
router.delete('/:gifId', checkTokenExists, verifyToken, ctrlGif.deleteGif);
router.get('/:gifId', checkTokenExists, verifyToken, ctrlGif.getGif);
router.post(
  '/:gifId/comment',
  checkTokenExists,
  verifyToken,
  ctrlGif.commentOnGif
);
module.exports = router;
