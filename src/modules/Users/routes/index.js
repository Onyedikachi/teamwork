const express = require('express');

const ctrlUser = require('../index');

const router = express.Router();

const {
  checkTokenExists,
  verifyToken,
  checkAdmin
} = require('../../../helpers');

router.post(
  '/',
  checkTokenExists,
  verifyToken,
  checkAdmin,
  ctrlUser.createUser
);
router.post('/login', ctrlUser.login);
router.get('/feeds', checkTokenExists, verifyToken, ctrlUser.getFeeds);

module.exports = router;
