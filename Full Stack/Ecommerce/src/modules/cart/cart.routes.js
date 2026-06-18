const express = require('express');
const cartController = require('./cart.controller');
const validationMiddleware = require('../../middlewares/validation.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const {
  addToCartValidation,
  updateCartItemValidation,
  itemIdValidation,
} = require('./cart.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', addToCartValidation, validationMiddleware, cartController.addToCart);
router.get('/', cartController.getCart);
router.patch('/:id', itemIdValidation, updateCartItemValidation, validationMiddleware, cartController.updateCartItem);
router.delete('/:id', itemIdValidation, validationMiddleware, cartController.deleteCartItem);
router.delete('/', cartController.clearCart);

module.exports = router;
