const express = require('express');
const usersController = require('../controllers/usersController');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { 
  validateUser,
  validateEmail, 
  validateUserExists,
} = require('../middlewares/userValidation');

const router = express.Router({ mergeParams: true });

router.post('/', validateUser, validateEmail, usersController.create);
router.get('/', verifyAuth, usersController.getAll);
router.get('/:id', validateUserExists, verifyAuth, usersController.getById);

module.exports = router;