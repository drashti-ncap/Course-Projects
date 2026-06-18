const ApiError = require('../../utils/apiError');
const cartRepository = require('../cart/cart.repository');
const orderRepository = require('./order.repository');
const paymentService = require('../../services/payment.service');
const { ORDER_STATUS, PAYMENT_STATUS } = require('../../config/constants');

const getOrders = async (userId) => {
  return orderRepository.getOrdersByUser(userId);
};

const getOrderById = async (userId, orderId) => {
  const order = await orderRepository.getOrderByIdForUser(userId, orderId);

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  return order;
};

const checkout = async (userId, orderData) => {
  const { shippingAddress, paymentMethod = 'card' } = orderData;

  if (!shippingAddress) {
    throw new ApiError(400, 'Shipping address is required');
  }

  const cart = await cartRepository.getCartByUser(userId);

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  const order = await orderRepository.createOrder({
    user: userId,
    items: cart.items.map((item) => ({
      product: item.product,
      variant: item.variant,
      quantity: item.quantity,
      price: item.price,
    })),
    subtotal,
    tax,
    total,
    shippingAddress,
    status: ORDER_STATUS.PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
  });

  const payment = await paymentService.processPayment({
    orderId: order._id,
    amount: total,
    currency: 'USD',
    provider: paymentMethod,
  });

  const updatedOrder = await orderRepository.updateOrder(order._id, {
    payment: payment._id,
    paymentStatus: payment.status,
    status: payment.status === PAYMENT_STATUS.PAID ? ORDER_STATUS.CONFIRMED : ORDER_STATUS.PENDING,
  });

  await cartRepository.clearCart(userId);

  return updatedOrder;
};

module.exports = {
  getOrders,
  getOrderById,
  checkout,
};
