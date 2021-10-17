const CreateUser = require('../models/user');

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

