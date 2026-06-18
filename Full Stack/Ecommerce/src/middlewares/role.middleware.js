const ApiError = require('../utils/apiError');

const roleMiddleware = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'Insufficient permissions'));
  }

  next();
};

module.exports = roleMiddleware;
