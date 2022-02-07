const { BlogPost } = require('../models');

const create = async ({ title, content, id }) => {
  const newPost = await BlogPost.create({ title, content, userId: id });

  return newPost;
};

module.exports = {
  create,
};