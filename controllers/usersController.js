const usersService = require('../services/usersService');
const { HTTP_CREATED } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  try {
    const newUser = await usersService.create({ displayName, email, password, image });
    
    return res.status(HTTP_CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};