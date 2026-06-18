const express = require('express');
const orderController = require('./order.controller');
const validationMiddleware = require('../../middlewares/validation.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const { checkoutValidation, orderIdValidation } = require('./order.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', checkoutValidation, validationMiddleware, orderController.checkout);
router.get('/', orderController.getOrders);
router.get('/:id', orderIdValidation, validationMiddleware, orderController.getOrderById);

module.exports = router;
