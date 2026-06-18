const Payment = require('../modules/order/payment.model');
const ApiError = require('../utils/apiError');
const { PAYMENT_STATUS } = require('../config/constants');

const processPayment = async ({ orderId, amount, currency = 'USD', provider = 'card' }) => {
  if (!orderId || amount == null) {
    throw new ApiError(400, 'Payment information is required');
  }

  if (amount < 0) {
    throw new ApiError(400, 'Payment amount must be valid');
  }

  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  const payment = await Payment.create({
    order: orderId,
    provider,
    amount,
    currency,
    status: PAYMENT_STATUS.PAID,
    transactionId,
  });

  return payment;
};

module.exports = {
  processPayment,
};
