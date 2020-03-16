const express = require('express');

const ctrlArticles = require('../index');

const router = express.Router();

router.post('/', ctrlArticles.createArticle);

module.exports = router;
