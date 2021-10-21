const { body } = require('express-validator');

exports.signUpValidation = [
    body('first_name').isLength({ min: 3 }).withMessage({message: 'The first_name must be 3+ characters long'}),
    body('last_name').isLength({ min: 6 }).withMessage({message: 'The name must be 6+ characters long'}),
    body('email').isEmail().withMessage({message: 'invalid email'}),
    body('password').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ characters long'}),
    body('phone').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ characters long'})
]

exports.loginValidation = [
    body('email').isEmail().withMessage({message: 'invalid email'}),
    body('password').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ characters long'}),
]