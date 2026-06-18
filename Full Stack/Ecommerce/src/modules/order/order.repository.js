const Order = require('./order.model');

const createOrder = (orderData) => Order.create(orderData);

const getOrdersByUser = (userId) =>
  Order.find({ user: userId })
    .populate('items.product')
    .populate('items.variant')
    .populate('payment')
    .sort({ createdAt: -1 });

const getOrderByIdForUser = (userId, orderId) =>
  Order.findOne({ _id: orderId, user: userId })
    .populate('items.product')
    .populate('items.variant')
    .populate('payment');

const updateOrder = (orderId, updateData) =>
  Order.findByIdAndUpdate(orderId, updateData, { new: true })
    .populate('items.product')
    .populate('items.variant')
    .populate('payment');

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderByIdForUser,
  updateOrder,
};
