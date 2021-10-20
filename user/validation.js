const { body } = require('express-validator');

exports.createUserValidation = [
    body('name').isLength({ min: 5 }).withMessage({message: 'The name must be 3+ chars long'}),
    body('email').isEmail().withMessage({message: 'invalid email'}),
    body('password').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ chars long'})
]

exports.updateUserValidation = [
    body('name').isLength({ min: 3 }).withMessage({message: 'The name must be 3+ chars long'}),
    body('email').isEmail().withMessage({message: 'invalid email'}),
    body('password').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ chars long'}),
]
