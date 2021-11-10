const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const { loginValidation, productValidation } = require('../../validations/validation');
const verify = require('../../middleware/verifyToken');
const { errorHandler } = require('../../middleware/errorHandler');

router.get('/user/:id', verify, userController.getUser);

router.get('/user', verify, userController.getAllUsers);

router.put('/user/:id', verify, loginValidation, errorHandler, userController.updateUser);

router.delete('/user/:id', verify, userController.deleteUser);


router.post('/addProduct', verify, productValidation, errorHandler, userController.addProduct);

router.post('/buy',  verify, errorHandler, userController.buy);

module.exports = router;
