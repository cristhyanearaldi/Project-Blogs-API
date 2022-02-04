const express = require('express');
const usersController = require('../controllers/usersController');
const { validateUser, validateEmail } = require('../middlewares/userValidation');

const router = express.Router({ mergeParams: true });

router.post('/', validateUser, validateEmail, usersController.create);

module.exports = router;