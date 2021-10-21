const express = require('express');
const router = express.Router();

const userController = require('../user/user.controller');
const { loginValidation } = require('../validations/validation');

router.get('/user/:id', userController.getUser);

router.get('/user', userController.getAllUsers);

router.put('/user/:id', loginValidation, userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

module.exports = router;