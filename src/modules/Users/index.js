const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

/**
 * Create users
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
module.exports.createUser = (req, res) => {
  const userData = req.body;

  // Verify is user email exists already
  // eslint-disable-next-line consistent-return
  User.emailExists(userData.userEmail)
    .then(result => {
      if (result.rows.length > 0)
        return res
          .status(400)
          .json({ message: 'Email already exists', status: 400 });
    })
    .catch(error => {
      if (error) {
        return res.status(400).end();
      }
    });

  User.saveUser(userData)
    .then(success => {
      if (success) {
        return res.status(200).end();
      }
      return res.status(400).end();
    })
    .catch(error => {
      if (error) {
        return res.status(400).end();
      }
    });
};

/**
 * User Login
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
module.exports.login = async (req, res) => {
  const userData = req.body;

  // eslint-disable-next-line consistent-return
  User.emailExists(userData.userEmail)
    .then(result => {
      if (result) {
        const user = result.rows[0];
        bcrypt.compare(userData.userPassword, user.user_password).then(ans => {
          if (ans) return res.status(200).end();
          return res.status(400).end();
        });
      }
    })
    .catch(error => {
      if (error) {
        return res.status(400).end();
      }
    });
};
