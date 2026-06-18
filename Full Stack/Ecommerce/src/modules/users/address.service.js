const Address = require('./address.model');
const ApiError = require('../../utils/apiError');

const createAddress = async (userId, addressData) => {
  if (addressData.isDefault) {
    await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });
  }

  const address = await Address.create({ user: userId, ...addressData });
  return address;
};

const getAddresses = async (userId) =>
  Address.find({ user: userId }).sort({ updatedAt: -1 });

const getAddressById = async (userId, addressId) => {
  const address = await Address.findOne({ _id: addressId, user: userId });

  if (!address) {
    throw new ApiError(404, 'Address not found');
  }

  return address;
};

const updateAddress = async (userId, addressId, updateData) => {
  const address = await Address.findOne({ _id: addressId, user: userId });

  if (!address) {
    throw new ApiError(404, 'Address not found');
  }

  if (updateData.isDefault) {
    await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });
  }

  Object.assign(address, updateData);
  await address.save();

  return address;
};

const deleteAddress = async (userId, addressId) => {
  const address = await Address.findOneAndDelete({ _id: addressId, user: userId });

  if (!address) {
    throw new ApiError(404, 'Address not found');
  }

  if (address.isDefault) {
    const fallbackAddress = await Address.findOne({ user: userId }).sort({ updatedAt: -1 });

    if (fallbackAddress) {
      fallbackAddress.isDefault = true;
      await fallbackAddress.save();
    }
  }
};

const setDefaultAddress = async (userId, addressId) => {
  const address = await Address.findOne({ _id: addressId, user: userId });

  if (!address) {
    throw new ApiError(404, 'Address not found');
  }

  await Address.updateMany({ user: userId, isDefault: true }, { isDefault: false });

  address.isDefault = true;
  await address.save();

  return address;
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
