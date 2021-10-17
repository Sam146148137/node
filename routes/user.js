const express = require('express');
const router = express.Router();

const createUserController = require('../controllers/createUser');
const getAllUsersController = require('../controllers/getAllUsers');
const getUserController = require('../controllers/getUser');
const updateUserController = require('../controllers/updateUser');
const deleteUserController = require('../controllers/deleteUser');

router.post('/', createUserController.createUser);
router.get('/', getAllUsersController.getAllUsers);

router.get('/:id', getUserController.getUser);
router.put('/:id', updateUserController.updateUser);
router.delete('/:id', deleteUserController.deleteUser);

module.exports = router;