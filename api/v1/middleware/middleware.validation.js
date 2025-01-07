const Joi = require("joi");

// Generic Validation Middleware
const validate = (schema) => {
    
  return (req, res, next) => {

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message); // Extract all error messages
      return res.status(400).json({
        status: false,
        message: "Validation errors",
        errors, // Send array of error messages
      });
    }

    next(); // Proceed to the next middleware/controller if no errors
  };
};

module.exports = validate;
