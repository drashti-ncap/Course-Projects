const User = require('./user.model');
const ApiError = require('../../utils/apiError');

const formatUserResponse = (user) => ({
  id: user.id || user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.status(200).json({
      success: true,
      data: formatUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const { name, email, password } = req.body;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        throw new ApiError(409, 'Email already registered');
      }

      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: formatUserResponse(user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
