const express = require('express');
const catalogController = require('./catalog.controller');
const validationMiddleware = require('../../middlewares/validation.middleware');
const {
  createProductValidation,
  updateProductValidation,
  createVariantValidation,
  updateVariantValidation,
  productIdValidation,
  variantIdValidation,
  listProductsValidation,
  brandCategoryValidation,
} = require('./catalog.validation');

const router = express.Router();

// Brand routes
router.post('/brands', brandCategoryValidation('Brand'), validationMiddleware, catalogController.createBrand);
router.get('/brands', catalogController.getBrands);
router.get('/brands/:id', catalogController.getBrandById);
router.put('/brands/:id', brandCategoryValidation('Brand'), validationMiddleware, catalogController.updateBrand);
router.delete('/brands/:id', catalogController.deleteBrand);

// Category routes
router.post('/categories', brandCategoryValidation('Category'), validationMiddleware, catalogController.createCategory);
router.get('/categories', catalogController.getCategories);
router.get('/categories/:id', catalogController.getCategoryById);
router.put('/categories/:id', brandCategoryValidation('Category'), validationMiddleware, catalogController.updateCategory);
router.delete('/categories/:id', catalogController.deleteCategory);

// Product routes
router.post('/products', createProductValidation, validationMiddleware, catalogController.createProduct);
router.get('/products', listProductsValidation, validationMiddleware, catalogController.getProducts);
router.get('/products/:productId', productIdValidation, validationMiddleware, catalogController.getProductById);
router.put('/products/:productId', productIdValidation, updateProductValidation, validationMiddleware, catalogController.updateProduct);
router.delete('/products/:productId', productIdValidation, validationMiddleware, catalogController.deleteProduct);

// Product Variant routes
router.post('/products/:productId/variants', productIdValidation, createVariantValidation, validationMiddleware, catalogController.createVariant);
router.get('/products/:productId/variants', productIdValidation, validationMiddleware, catalogController.getVariantsByProduct);
router.get('/variants/:variantId', variantIdValidation, validationMiddleware, catalogController.getVariantById);
router.put('/variants/:variantId', variantIdValidation, updateVariantValidation, validationMiddleware, catalogController.updateVariant);
router.delete('/variants/:variantId', variantIdValidation, validationMiddleware, catalogController.deleteVariant);

module.exports = router;
