const express = require('express');
const postsController = require('../controllers/postsController');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { 
  validatePost, 
  validateCategory, 
  validatePostExists, 
  validateUpdatedPost,
  validateUpdatedCategory,
  validateAuthorizedUser,
} = require('../middlewares/postValidation');

const router = express.Router({ mergeParams: true });

router.post('/', verifyAuth, validatePost, validateCategory, postsController.create);
router.get('/', verifyAuth, postsController.getAll);
router.get('/:id', validatePostExists, verifyAuth, postsController.getById);
router.put('/:id', 
  verifyAuth, 
  validateUpdatedCategory, 
  validateUpdatedPost, 
  validateAuthorizedUser, 
  postsController.update);

module.exports = router;