const User = require('../users/user.model');

const findUserByEmail = (email, includePassword = false) => {
  const query = User.findOne({ email });

  if (includePassword) {
    return query.select('+password');
  }

  return query;
};

const createUser = (userData) => User.create(userData);

module.exports = {
  findUserByEmail,
  createUser,
};
