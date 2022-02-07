const postsService = require('../services/postsService');
const { HTTP_CREATED } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  try {
    const newPost = await postsService.create({ title, content, id });
    return res.status(HTTP_CREATED).json(newPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};