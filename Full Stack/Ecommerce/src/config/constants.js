module.exports = {
  ROLES: {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
  },
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },
  SHIPMENT_STATUS: {
    PENDING: 'pending',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    RETURNED: 'returned',
  },
};
