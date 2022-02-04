const Joi = require('joi');
const { User } = require('../models');
const { HTTP_BAD_REQUEST, HTTP_CONFLICT } = require('../utils/statusCodes');

const usersSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
  image: Joi.string(),
});

const validateUser = async (req, res, next) => {
  const user = req.body;
  const { error } = usersSchema.validate(user);

  if (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.details[0].message });
  } 

  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });

  if (existingEmail) {
    return res.status(HTTP_CONFLICT).json({ message: 'User already registered' });
  }
  return next();
};

module.exports = {
  validateUser,
  validateEmail,
};