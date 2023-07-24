const Joi = require("joi");

const EmployeeSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().min(18).max(65).required(),
  salary: Joi.number().min(1200).max(2500).required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  employeeImage: Joi.string(),
});

const validateEmployee = (req, res, next) => {
  const { error } = EmployeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateEmployee;
