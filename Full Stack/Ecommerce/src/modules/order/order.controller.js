const orderService = require('./order.service');
const ApiError = require('../../utils/apiError');

const checkout = async (req, res, next) => {
  try {
    const order = await orderService.checkout(req.user.id, req.body);

    res.status(201).json({ success: true, message: 'Order created successfully', data: order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders(req.user.id);

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.user.id, req.params.id);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout, getOrders, getOrderById };
