const express = require('express');
const router = express.Router();
const { body } = require('express-validator');


const createUserController = require('../controllers/createUser');
const getAllUsersController = require('../controllers/getAllUsers');
const getUserController = require('../controllers/getOneUser');
const updateUserController = require('../controllers/updateUser');
const deleteUserController = require('../controllers/deleteUser');

router.post('/',
    body('name').isLength({ min: 5 }).withMessage({message: 'The name must be 3+ chars long'}),
    body('email').isEmail().withMessage({message: 'invalid email'}),
    body('password').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ chars long'}),
    createUserController.createUser);

router.get('/', getAllUsersController.getAllUsers);


router.get('/:id', getUserController.getUser);

router.put('/:id',
    body('name').isLength({ min: 3 }).withMessage({message: 'The name must be 3+ chars long'}),
    body('email').isEmail().withMessage({message: 'invalid email'}),
    body('password').isLength({ min: 5 }).withMessage({message: 'The password must be 5+ chars long'}),
    updateUserController.updateUser);

router.delete('/:id', deleteUserController.deleteUser);

module.exports = router;