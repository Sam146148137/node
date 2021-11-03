const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const { signUpValidation, loginValidation } = require('../../validations/validation');
const { errorHandler } = require('../../middleware/errorHandler');

router.post('/register', signUpValidation, errorHandler, authController.signUp);

router.post('/login' , loginValidation, errorHandler, authController.login);

module.exports = router;