const Joi = require('joi');

const loginSchema = Joi.object({
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Invalid email format.',
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password cannot exceed 20 characters.',
        }),
        
});

module.exports = loginSchema;
