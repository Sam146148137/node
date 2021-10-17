const CreateUser = require('../models/user');

exports.createUser = async (req, res, next) => {
    try {

        if (!req.body.name) {
            return res.status(400).json({message: '400 Bad Request'})
        }

        if (!req.body.email) {
            return res.status(400).json({message: '400 Bad Request'})
        }



        if (!req.body.password) {
            return res.status(400).json({message: '400 Bad Request'})
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