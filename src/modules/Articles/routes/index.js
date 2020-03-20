const express = require('express');

const ctrlArticles = require('../index');

const router = express.Router();

const { checkTokenExists, verifyToken } = require('../../../helpers');

router.post('/', checkTokenExists, verifyToken, ctrlArticles.createArticle);
router.patch(
  '/:articleId',
  checkTokenExists,
  verifyToken,
  ctrlArticles.updateArticle
);
router.delete(
  '/:articleId',
  checkTokenExists,
  verifyToken,
  ctrlArticles.deleteArticle
);
router.post(
  '/:articleId/comment',
  checkTokenExists,
  verifyToken,
  ctrlArticles.commentonArticle
);
router.get(
  '/:articleId',
  checkTokenExists,
  verifyToken,
  ctrlArticles.getArticle
);
module.exports = router;
