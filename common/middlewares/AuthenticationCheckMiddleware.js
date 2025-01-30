const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../utils/config");

module.exports = {
  isAuthenticated: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Missing access token.'
        }
      });
    }

    if (!authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Missing access token.'
        }
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Missing access token.'
        }
      })
    }

    jwt.verify(token, jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({
          status: false,
          error: 'Invalid access token.'
        });
      }

      req.user = user;
      next();
    });
  }
}