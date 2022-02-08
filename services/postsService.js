const { BlogPost, User, Category } = require('../models');

const create = async ({ title, content, id }) => {
  const newPost = await BlogPost.create({ title, content, userId: id });

  return newPost;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getById = async ({ id }) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  
  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};