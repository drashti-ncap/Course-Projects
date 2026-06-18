const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const catalogRoutes = require('../modules/catalog/catalog.routes');
const cartRoutes = require('../modules/cart/cart.routes');
const orderRoutes = require('../modules/order/order.routes');
const uploadRoutes = require('../modules/uploads/upload.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/catalog', catalogRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/uploads', uploadRoutes);

module.exports = router;
