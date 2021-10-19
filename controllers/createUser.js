const CreateUser = require('../models/user');
const { validationResult } = require('express-validator');

exports.createUser =  async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().filter((message) => {
                res.json(message.msg.message)
                }) });
        }

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json('400 Bad Request')
        }

       const user = await CreateUser.create(req.body)

        if (user) {
            return res.status(201).json({
                data: user,
                msg: 'CreateUser is created'
            })
        }
    } catch (err) {
        next();
    }
}