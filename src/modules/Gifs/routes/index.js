const express = require('express');

const ctrlGif = require('../index');

const router = express.Router();

const upload = require('../../../middlewares/uploadMiddleware');

const {
  checkTokenExists,
  verifyToken,
  catchErrors
} = require('../../../helpers');

router.post(
  '/',
  checkTokenExists,
  verifyToken,
  upload.single('image'),
  catchErrors(ctrlGif.createGif)
);
router.delete('/:gifId', checkTokenExists, verifyToken, ctrlGif.deleteGif);
router.get(
  '/:gifId',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlGif.getGif)
);
router.post(
  '/:gifId/comment',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlGif.commentOnGif)
);
module.exports = router;
