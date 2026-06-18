const ApiError = require('../../utils/apiError');
const cartRepository = require('./cart.repository');
const catalogRepository = require('../catalog/catalog.repository');

const getCart = async (userId) => {
  let cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    cart = await cartRepository.createCart(userId);
  }

  return cart;
};

const addToCart = async (userId, cartItem) => {
  const { product, variant, quantity = 1 } = cartItem;

  if (!product) {
    throw new ApiError(400, 'Product ID is required');
  }

  if (quantity < 1) {
    throw new ApiError(400, 'Quantity must be at least 1');
  }

  const productRecord = await catalogRepository.getProductById(product);

  if (!productRecord) {
    throw new ApiError(404, 'Product not found');
  }

  let price = productRecord.salePrice || productRecord.price;

  if (variant) {
    const variantRecord = await catalogRepository.getVariantById(variant);

    if (!variantRecord || variantRecord.product.toString() !== product.toString()) {
      throw new ApiError(400, 'Invalid product variant');
    }

    price = variantRecord.price;
  }

  let cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    cart = await cartRepository.createCart(userId);
  }

  const existingItem = cart.items.find((item) => {
    const sameProduct = item.product.toString() === product.toString();
    const sameVariant = item.variant
      ? variant && item.variant.toString() === variant.toString()
      : !variant;

    return sameProduct && sameVariant;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product,
      variant: variant || undefined,
      quantity,
      price,
    });
  }

  cart.calculateTotal();

  return cartRepository.updateCart(cart);
};

const updateCartItem = async (userId, itemId, updateData) => {
  const { quantity } = updateData;

  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, 'Cart item not found');
  }

  if (quantity !== undefined) {
    if (quantity < 1) {
      throw new ApiError(400, 'Quantity must be at least 1');
    }

    item.quantity = quantity;
  }

  cart.calculateTotal();

  return cartRepository.updateCart(cart);
};

const deleteCartItem = async (userId, itemId) => {
  const cart = await cartRepository.getCartByUser(userId);

  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, 'Cart item not found');
  }

  item.remove();
  cart.calculateTotal();

  await cartRepository.updateCart(cart);
};

const clearCart = async (userId) => {
  await cartRepository.clearCart(userId);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
