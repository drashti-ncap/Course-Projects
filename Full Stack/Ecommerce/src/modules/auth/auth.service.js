const ApiError = require('../../utils/apiError');
const { generateToken } = require('../../utils/token');
const authRepository = require('./auth.repository');

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const register = async ({ name, email, password }) => {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  try {
    const user = await authRepository.createUser({ name, email, password });
    const token = generateToken({ id: user._id, role: user.role });

    return { user: formatUserResponse(user), token };
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, 'Email already registered');
    }

    throw error;
  }
};

const login = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email, true);

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: user._id, role: user.role });

  return { user: formatUserResponse(user), token };
};

module.exports = {
  register,
  login,
};
