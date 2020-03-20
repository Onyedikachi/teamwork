const jwt = require('jsonwebtoken');
const { jwtsecret } = require('../config');

module.exports = {
  catchErrors(fn) {
    const caught = (req, res, next) => fn(req, res, next).catch(next);
    return caught;
  },
  getCurrentTimeStamp() {
    return Math.floor(new Date().getTime() / 1000);
  },

  // check if token is valid,
  verifyToken(req, res, next) {
    const { token } = req.headers;
    const { userId } = req.params;

    try {
      const decoded = jwt.verify(token, jwtsecret);

      if (decoded.id === userId) {
        req.id = decoded.id;
        return next();
      }
      return res.status(401).json({
        status: 'error',
        data: {
          message: 'Unauthorized User'
        }
      });

      //
    } catch (e) {
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'Unauthorized User'
        }
      });
    }
  },

  // check if token exists,
  // passing an empty token to jwt throws errors
  checkTokenExists(req, res, next) {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'No token available'
        }
      });
    }

    return next();
  },

  // decode token
  decodeToken(req, res) {
    const { token } = req.headers;
    return jwt.decode(token);
  },

  // decode admin token and return it
  checkAdmin(req, res, next) {
    const { token } = req.headers;

    const decoded = jwt.decode(token);
    if (decoded.admin) {
      return next();
    }

    return res.status(401).json({
      status: 'error',
      data: {
        message: 'Only Admin Access'
      }
    });
  }
};
