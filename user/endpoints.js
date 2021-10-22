const express = require('express');
const router = express.Router();

const userController = require('../user/user.controller');
const { loginValidation } = require('../validations/validation');
const verify = require('../middleware/verifyToken');

router.get('/user/:id', verify, userController.getUser);

router.get('/user', verify, userController.getAllUsers);

router.put('/user/:id', verify, loginValidation, userController.updateUser);

router.delete('/user/:id', verify, userController.deleteUser);

module.exports = router;