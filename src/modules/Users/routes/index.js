const express = require('express');

const ctrlUser = require('../index');

const router = express.Router();

router.post('/', ctrlUser.createUser);
router.post('/login', ctrlUser.login);

module.exports = router;
