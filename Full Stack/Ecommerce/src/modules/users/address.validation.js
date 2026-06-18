const { body, param } = require('express-validator');

const addressFields = [
  body('street')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Street is required'),
  body('city')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('state')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('postalCode')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Postal code is required'),
  body('country')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('phone')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Phone is required'),
  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean'),
];

const createAddressValidation = [
  body('street').exists().withMessage('Street is required'),
  body('city').exists().withMessage('City is required'),
  body('state').exists().withMessage('State is required'),
  body('postalCode').exists().withMessage('Postal code is required'),
  body('country').exists().withMessage('Country is required'),
  body('phone').exists().withMessage('Phone is required'),
  body('isDefault').optional().isBoolean().withMessage('isDefault must be a boolean'),
];

const updateAddressValidation = [
  ...addressFields,
  body().custom((value) => {
    if (!Object.keys(value).length) {
      throw new Error('At least one field is required to update');
    }
    return true;
  }),
];

const addressIdValidation = [
  param('id').isMongoId().withMessage('Invalid address id'),
];

module.exports = {
  createAddressValidation,
  updateAddressValidation,
  addressIdValidation,
};
