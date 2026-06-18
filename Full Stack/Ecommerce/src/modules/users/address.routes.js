const express = require('express');
const addressController = require('./address.controller');
const validationMiddleware = require('../../middlewares/validation.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const {
  createAddressValidation,
  updateAddressValidation,
  addressIdValidation,
} = require('./address.validation');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createAddressValidation, validationMiddleware, addressController.createAddress);
router.get('/', addressController.getAddresses);
router.get('/:id', addressIdValidation, validationMiddleware, addressController.getAddressById);
router.put('/:id', addressIdValidation, updateAddressValidation, validationMiddleware, addressController.updateAddress);
router.delete('/:id', addressIdValidation, validationMiddleware, addressController.deleteAddress);
router.patch('/:id/default', addressIdValidation, validationMiddleware, addressController.setDefaultAddress);

module.exports = router;
