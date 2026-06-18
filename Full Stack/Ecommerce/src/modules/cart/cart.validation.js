const { body, param } = require('express-validator');

const addToCartValidation = [
  body('product').notEmpty().withMessage('Product ID is required').isMongoId().withMessage('Valid product ID is required'),
  body('variant').optional().isMongoId().withMessage('Valid variant ID is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const updateCartItemValidation = [
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const itemIdValidation = [
  param('id').notEmpty().withMessage('Cart item id is required').isMongoId().withMessage('Valid cart item id is required'),
];

module.exports = {
  addToCartValidation,
  updateCartItemValidation,
  itemIdValidation,
};
