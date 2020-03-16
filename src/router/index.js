const express = require('express');
const userRoutes = require('../modules/Users/routes');
const gifRoutes = require('../modules/Gifs/routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/gifs', gifRoutes);

module.exports = router;
