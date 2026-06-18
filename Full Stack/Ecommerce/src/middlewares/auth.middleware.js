const jwt = require('jsonwebtoken');
const env = require('../config/env');
const ApiError = require('../utils/apiError');

const authMiddleware = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = authMiddleware;
