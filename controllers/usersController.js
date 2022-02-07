const usersService = require('../services/usersService');
const { HTTP_CREATED, HTTP_OK } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  try {
    const newUser = await usersService.create({ displayName, email, password, image });
    
    return res.status(HTTP_CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    
    return res.status(HTTP_OK).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};