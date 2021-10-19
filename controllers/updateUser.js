const CreateUser = require('../models/user');
const { validationResult } = require('express-validator');


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
        next()
    }
}
