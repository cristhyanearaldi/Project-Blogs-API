const { User } = require('../models');
const { createAuth } = require('../middlewares/authMiddleware');

const create = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });

  if (!newUser) {
    return { message: 'User already exists' };
  }

  const token = await createAuth(email, password, newUser.id);

  return token;
};

module.exports = {
  create,
};