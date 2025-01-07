const Joi = require("joi");

const registerSchema = Joi.object({

  name: Joi.string()
     .min(3)
     .max(50)
     .required()
     .messages({
     "string.empty": "Name is required.",
     "string.min": "Name must be at least 3 characters long.",
     "string.max": "Name cannot exceed 50 characters.",
  }),

  email: Joi.string()
     .email()
     .required()
     .messages({
     "string.empty": "Email is required.",
     "string.email": "Invalid email format.",
  }),

  mobile: Joi.string()
     .pattern(/^[0-9]{10}$/)
     .required()
     .messages({
     "string.empty": "Mobile number is required.",
     "string.pattern.base": "Mobile number must be 10 digits.",
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 20 characters.",
    "string.pattern.base":
    "Password must include uppercase, lowercase, number, and special character.",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
    "any.only": "Confirm Password must match Password.",
    "string.empty": "Confirm Password is required.",
  }),
});

module.exports = registerSchema;
