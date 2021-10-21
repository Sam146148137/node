const express = require('express');
const router = express.Router();

const authController = require('../auth/auth.controller');
const { signUpValidation, loginValidation } = require('../validations/validation');

router.post('/register', signUpValidation, authController.signUp);

router.post('/login', loginValidation, authController.login);

module.exports = router;