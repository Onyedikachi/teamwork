const express = require('express');

const ctrlArticles = require('../index');

const router = express.Router();

router.post('/', ctrlArticles.createArticle);
router.patch('/:articleId', ctrlArticles.updateArticle);
router.delete('/:articleId', ctrlArticles.deleteArticle);
module.exports = router;
