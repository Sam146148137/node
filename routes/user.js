const express = require('express');
const router = express.Router();
const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/user');

router
    .route('/')
        .post(createUser)
        .get(getAllUsers)

router
    .route('/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser)

module.exports = router;