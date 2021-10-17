const CreateUser = require('../models/user');

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await CreateUser.destroy({
            where: { id: id }
        })

        if (user == 1) {
            return res.status(200).json(`User with id ${id} was deleted successfully`)
        }

        if (id !== req.body.id){
            return res.status(404).json(
             'Not found'
            )
        }
    } catch (err) {
        next()
    }
}
