const express = require('express');

const ctrlUser = require('../index');

const router = express.Router();

const {
  checkTokenExists,
  verifyToken,
  checkAdmin,
  catchErrors
} = require('../../../helpers');

router.post(
  '/',
  checkTokenExists,
  verifyToken,
  checkAdmin,
  catchErrors(ctrlUser.createUser)
);
router.post('/login', catchErrors(ctrlUser.login));
router.get(
  '/feeds',
  checkTokenExists,
  verifyToken,
  catchErrors(ctrlUser.getFeeds)
);

module.exports = router;
