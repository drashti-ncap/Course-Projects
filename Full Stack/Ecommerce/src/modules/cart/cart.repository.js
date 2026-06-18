const Cart = require('./cart.model');

const getCartByUser = (userId) =>
  Cart.findOne({ user: userId }).populate('items.product items.variant');

const createCart = (userId) => Cart.create({ user: userId, items: [], total: 0 });

const updateCart = (cart) => cart.save();

const clearCart = (userId) =>
  Cart.findOneAndUpdate(
    { user: userId },
    { items: [], total: 0 },
    { new: true }
  ).populate('items.product items.variant');

module.exports = {
  getCartByUser,
  createCart,
  updateCart,
  clearCart,
};
