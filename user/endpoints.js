const express = require('express');
const router = express.Router();

const userController = require('../user/user.controller');
const { createUserValidation, updateUserValidation } = require('./validation');

router.post('/', createUserValidation, userController.createUser);

router.get('/', userController.getAllUsers);


router.get('/:id', userController.getUser);

router.put('/:id', updateUserValidation, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;