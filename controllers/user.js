const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
       const user = await User.create(req.body)

        res.status(201).json({
            success: true,
            data: user,
            msg: 'user is created'
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Content can not be empty!"
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;

        User.findByPk(id)
            .then(data => {
                if (data) {
                    return res.status(200)
                        .json({success: true, data})
                } else {
                    return res.status(400)
                        .json({success: false, message: `Cannot find User with id=${id}.`})
                }
            })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Cannot find User'
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        await User.findAll()
            .then(user => {
                return res.status(200)
                    .json({success: true, count: user.length, user })
            })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'users not found'
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;

       await User.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    return res.status(200).json({
                        success: true,
                        message: "User was updated successfully."
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Cannot update User with id=${id}. User was not found!`
                    });
                }
            })
    } catch (err) {
       return res.status(400).json({
            success: false,
            message: "Error updating Tutorial with id=" + id
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        User.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.status(200).json({
                        success: true,
                        message: `User ${id} was deleted successfully.`
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Cannot delete User with id=${id}. User was not found!`
                    });
                }
            })
    } catch (err) {
       return res.status(400).json({
            success: false,
            message: "Error deleting User with id=" + id
        });
    }
}
