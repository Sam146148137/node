const UserController = require('../models/user');
const ErrorResponse = require('../util/errorResponse');
const { validationResult } = require('express-validator');
const CreateUser = require("../models/user");

exports.createUser = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array().filter((message) => {
            //     res.json(message.msg.message)
            //     }) });
           return next(new ErrorResponse("The name must be 3+ characters", 400));
        }

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json('400 Bad Request')
        }

       const user = await UserController.create(req.body)

        if (user) {
            return res.status(201).json({
                data: user,
                msg: 'User is created'
            })
        }
    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await CreateUser.findByPk(id)

        if(!user) {
            return res.status(404)
                .json(`Not found`)
        }

        if(user) {
            return res.status(200)
                .json( user )
        }
    } catch (err) {
        next(err);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const user =  await CreateUser.findAll()

        if (!user) {
            return res.status(404).json('Not found')
        }

        if (user) {
            return res.status(200).json( user )
        }
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400)
                .json('400 Bad request')
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().filter((message) => {
                    res.json(message.msg.message)
                }) });
        }

        const user = await CreateUser.update(req.body, {
            where: { id: id }
        })

        if(user == 1) {
            return res.status(200)
                .json(`User with id ${id} was updated successfully`)
        }

        if (id !== req.body.id){
            return res.status(404).json('Not found')
        }
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await CreateUser.destroy({
            where: { id: id }
        })

        if (user !== 1){
            return res.status(404).json(
                'Not found'
            )
        }

        if (user == 1) {
            return res.status(200).json(`User with id ${id} was deleted successfully`)
        }


    } catch (err) {
        next(err)
    }
}