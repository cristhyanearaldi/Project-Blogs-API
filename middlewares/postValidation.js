const Joi = require('joi');
const { Category, BlogPost } = require('../models');
const { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } = require('../utils/statusCodes');

const postsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.required(),
});

const validatePost = async (req, res, next) => {
  const post = req.body;
  const { error } = postsSchema.validate(post);

  if (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.details[0].message });
  }

  return next();
};

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
 
  const existingCategory = await Category.findAll({ where: { id: categoryIds } });
 
  if (existingCategory.length !== categoryIds.length) {
    return res.status(HTTP_BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  return next();
};

const validatePostExists = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Post does not exist' });
  }

  return next();
};

module.exports = {
  validatePost,
  validateCategory,
  validatePostExists,
};