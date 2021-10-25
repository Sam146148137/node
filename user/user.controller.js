const { validationResult } = require('express-validator');
const { SUCCESS_CODE, NOT_FOUND_CODE, BAD_REQUEST_CODE } = require('../util/status-codes');
const CreateUser = require("../models/user");
const User = require("../models/user");


exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await CreateUser.findByPk(id)

        if(!user) {
            return res.status(NOT_FOUND_CODE)
                .json(`Not found`)
        }

        if(user) {
            return res.status(SUCCESS_CODE)
                .json( user )
        }
    } catch (e) {
        next(e);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const user =  await CreateUser.findAll()

        if (!user) {
            return res.status(NOT_FOUND_CODE).json('Not found')
        }

        if (user) {
            return res.status(SUCCESS_CODE).json( user )
        }
    } catch (e) {
        next(e);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.phone) {
            return res.status(BAD_REQUEST_CODE).json('400 Bad Request')
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(BAD_REQUEST_CODE).json({ errors: errors.array().filter((message) => {
                    res.json(message.msg.message)
                }) });
        }

        //check if the user is already in the database
        const emailExist = await User.findOne({where: {
                email: req.body.email
            }});
        if(emailExist) {
            return res.status(BAD_REQUEST_CODE).json('Email already exist');
        }


        const user = await CreateUser.update(req.body, {
            where: { id: id }
        })

        if(user == 1) {
            return res.status(SUCCESS_CODE)
                .json(`User with id ${id} was updated successfully`)
        }

        if (id !== req.body.id){
            return res.status(NOT_FOUND_CODE).json('Not found')
        }
    } catch (e) {
        next(e)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await CreateUser.destroy({
            where: { id: id }
        })

        if (user !== 1){
            return res.status(NOT_FOUND_CODE).json(
                'Not found'
            )
        }

        if (user == 1) {
            return res.status(SUCCESS_CODE).json(`User with id ${id} was deleted successfully`)
        }


    } catch (e) {
        next(e)
    }
}