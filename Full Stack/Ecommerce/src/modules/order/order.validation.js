const { body, param } = require('express-validator');

const checkoutValidation = [
  body('shippingAddress').trim().notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').optional().isString().withMessage('Payment method must be a string'),
];

const orderIdValidation = [
  param('id').notEmpty().withMessage('Order id is required').isMongoId().withMessage('Valid order id is required'),
];

module.exports = {
  checkoutValidation,
  orderIdValidation,
};
