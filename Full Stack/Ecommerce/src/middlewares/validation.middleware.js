const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validationMiddleware = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ApiError(422, 'Validation failed', errors.array()));
  }

  next();
};

module.exports = validationMiddleware;
