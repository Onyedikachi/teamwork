const express = require('express');

const ctrlUser = require('../index');

const router = express.Router();

router.post('/', ctrlUser.createUser);
router.post('/login', ctrlUser.login);
router.get('/feeds', ctrlUser.getFeeds);

module.exports = router;
