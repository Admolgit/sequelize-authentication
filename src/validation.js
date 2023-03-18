const { celebrate, Joi } = require('celebrate');

const RegisterValidator = celebrate({
  body: {
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/)
  }
},
{ stripUnknown: true });

const LoginValidator = celebrate(
  {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  { stripUnknown: true },
);

module.exports = {
  RegisterValidator,
  LoginValidator
}