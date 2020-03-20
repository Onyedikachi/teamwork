const express = require('express');

const ctrlArticles = require('../index');

const router = express.Router();

router.post('/', ctrlArticles.createArticle);
router.patch('/:articleId', ctrlArticles.updateArticle);
router.delete('/:articleId', ctrlArticles.deleteArticle);
router.post('/:articleId/comment', ctrlArticles.commentonArticle);
router.get('/:articleId', ctrlArticles.getArticle);
module.exports = router;
