const express = require('express');

const ctrlArticles = require('../index');

const router = express.Router();

const {
  checkTokenExists,
  verifyToken,
  catchErrors
} = require('../../../helpers');

router.post(
  '/',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlArticles.createArticle)
);
router.patch(
  '/:articleId',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlArticles.updateArticle)
);
router.delete(
  '/:articleId',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlArticles.deleteArticle)
);
router.post(
  '/:articleId/comment',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlArticles.commentonArticle)
);
router.get(
  '/:articleId',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlArticles.getArticle)
);
module.exports = router;
