const express = require('express');
const userRoutes = require('../modules/Users/routes');
const gifRoutes = require('../modules/Gifs/routes');
const articleRoutes = require('../modules/Articles/routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/gifs', gifRoutes);
router.use('/articles', articleRoutes);

module.exports = router;
