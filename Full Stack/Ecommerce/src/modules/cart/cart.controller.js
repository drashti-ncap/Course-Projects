const cartService = require('./cart.service');
const ApiError = require('../../utils/apiError');

const addToCart = async (req, res, next) => {
  try {
    const cart = await cartService.addToCart(req.user.id, req.body);

    res.status(200).json({ success: true, message: 'Product added to cart', data: cart });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const cart = await cartService.updateCartItem(req.user.id, req.params.id, req.body);

    res.status(200).json({ success: true, message: 'Cart item updated', data: cart });
  } catch (error) {
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    await cartService.deleteCartItem(req.user.id, req.params.id);

    res.status(200).json({ success: true, message: 'Cart item removed' });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await cartService.clearCart(req.user.id);

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart, getCart, updateCartItem, deleteCartItem, clearCart };
