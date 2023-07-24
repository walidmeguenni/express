const Joi = require("joi");

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmedPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const validateUeserSignup = (req, res, next) => {
  const { error } = UserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = validateUeserSignup;