const express = require('express');
const userController = require('./user.controller');
const { updateProfileValidation } = require('./user.validation');
const validationMiddleware = require('../../middlewares/validation.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const addressRoutes = require('./address.routes');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, updateProfileValidation, validationMiddleware, userController.updateProfile);

router.use('/addresses', addressRoutes);

module.exports = router;
