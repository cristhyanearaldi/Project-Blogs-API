const categoriesService = require('../services/categoriesService');
const { HTTP_CREATED } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { name } = req.body;

  try {
    const newCategory = await categoriesService.create({ name });
    return res.status(HTTP_CREATED).json(newCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};