const { body } = require('express-validator');

const updateProfileValidation = [
  body('name')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Name must be a non-empty string'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  updateProfileValidation,
};
