/* eslint-disable radix */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../config');

const Article = require('../../models/Article');

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
          .json({ message: 'Email already exists', status: 'error' });

      User.saveUser(userData)
        .then(user => {
          if (user) {
            const token = jwt.sign(user, config.jwtsecret);
            return res.status(200).json({
              data: {
                token: token,
                userId: parseInt(user.user_id),
                message: 'User account successfully created'
              },
              status: 'success'
            });
          }
          return res.status(400).json({
            message: 'Error encountered while creating employee',
            status: 'error'
          });
        })
        .catch(error => {
          if (error) {
            return res.status(400).json({
              message: 'Error encountered while creating employee',
              status: 'errpr'
            });
          }
        });
    })
    .catch(error => {
      if (error) {
        return res
          .status(400)
          .json({ message: 'Email does not exist', status: 'error' });
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
          delete user.user_password;
          const token = jwt.sign(user, config.jwtsecret);
          if (ans)
            return res.status(200).json({
              data: {
                token: token,
                userId: parseInt(user.user_id),
                message: 'Sigin successful'
              },
              status: 'success'
            });
          return res
            .status(400)
            .json({ message: 'Invalid Credentials', status: 'error' });
        });
      }
    })
    .catch(error => {
      if (error) {
        return res
          .status(400)
          .json({ message: 'Invalid Credentials', status: 'error' });
      }
    });
};

module.exports.getFeeds = (req, res) => {
  Article.getArticles().then(result => {
    return res.status(200).json({
      data: result,
      status: 'success'
    });
  });
};
