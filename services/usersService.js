const { User } = require('../models');
const { createAuth } = require('../middlewares/authMiddleware');

const create = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });
  
  const token = await createAuth(email, password, newUser.id);
  
  return token;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async ({ id }) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = {
  create,
  getAll,
  getById,
};