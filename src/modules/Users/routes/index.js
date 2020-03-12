const express = require('express');

const ctrlUser = require('../index');

const router = express.Router();

router.post('/', ctrlUser.createUser);

module.exports = router;
