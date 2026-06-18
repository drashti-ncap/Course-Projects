const { body, param, query } = require('express-validator');

const createProductValidation = [
  body('name').notEmpty().withMessage('Product name is required').trim(),
  body('description').notEmpty().withMessage('Product description is required').trim(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('salePrice').optional().isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
  body('brand').isMongoId().withMessage('Valid brand id is required'),
  body('category').isMongoId().withMessage('Valid category id is required'),
  body('sku').optional().trim(),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const updateProductValidation = [
  body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Product description cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('salePrice').optional().isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
  body('brand').optional().isMongoId().withMessage('Valid brand id is required'),
  body('category').optional().isMongoId().withMessage('Valid category id is required'),
  body('sku').optional().trim(),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const createVariantValidation = [
  body('sku').notEmpty().withMessage('Variant SKU is required').trim(),
  body('color').optional().trim(),
  body('size').optional().trim(),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const updateVariantValidation = [
  body('sku').optional().trim().notEmpty().withMessage('SKU cannot be empty'),
  body('color').optional().trim(),
  body('size').optional().trim(),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

const productIdValidation = [
  param('productId').isMongoId().withMessage('Invalid product id'),
];

const variantIdValidation = [
  param('variantId').isMongoId().withMessage('Invalid variant id'),
];

const listProductsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  query('brand').optional().isMongoId().withMessage('Invalid brand id'),
  query('category').optional().isMongoId().withMessage('Invalid category id'),
];

const brandCategoryValidation = (type) => [
  body('name').notEmpty().withMessage(`${type} name is required`).trim(),
  body('description').optional().trim(),
  body(type === 'Brand' ? 'logo' : 'image').optional().trim(),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  createVariantValidation,
  updateVariantValidation,
  productIdValidation,
  variantIdValidation,
  listProductsValidation,
  brandCategoryValidation,
};
