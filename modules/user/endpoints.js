const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const { loginValidation } = require('../../validations/validation');
const verify = require('../../middleware/verifyToken');
const { errorHandler } = require('../../middleware/errorHandler');

router.get('/user/:id', verify, userController.getUser);

router.get('/user', verify, userController.getAllUsers);

router.put('/user/:id', verify, loginValidation, errorHandler, userController.updateUser);

router.delete('/user/:id', verify, userController.deleteUser);

module.exports = router;