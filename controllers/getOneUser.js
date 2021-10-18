const CreateUser = require('../models/user');

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


