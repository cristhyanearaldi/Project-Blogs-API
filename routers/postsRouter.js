const express = require('express');
const postsController = require('../controllers/postsController');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { validatePost, validateCategory } = require('../middlewares/postValidation');

const router = express.Router({ mergeParams: true });

router.post('/', verifyAuth, validatePost, validateCategory, postsController.create);

module.exports = router;