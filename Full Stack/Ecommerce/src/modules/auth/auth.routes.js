const express = require('express');
const authController = require('./auth.controller');
const { registerValidation, loginValidation } = require('./auth.validation');
const validationMiddleware = require('../../middlewares/validation.middleware');

const router = express.Router();

router.post('/register', registerValidation, validationMiddleware, authController.register);
router.post('/login', loginValidation, validationMiddleware, authController.login);

module.exports = router;
