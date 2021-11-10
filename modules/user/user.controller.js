const { SUCCESS_CODE, NOT_FOUND_CODE, BAD_REQUEST_CODE, CREATED_CODE } = require('../../util/status-codes');
const CreateUser = require("../../models/user");
const User = require("../../models/user");
const Product = require('../../models/product');
const bcrypt = require("bcryptjs");
const sequelize = require('../../util/db');

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

        //check if the user is already in the database
        const emailExist = await User.findOne({where: {
                email: req.body.email
            }});
        if(emailExist) {
            return res.status(BAD_REQUEST_CODE).json('Email already exist');
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await CreateUser.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword
            }, {
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

        if (user === 1) {
            return res.status(SUCCESS_CODE).json(`User with id ${id} was deleted successfully`)
        }

    } catch (e) {
        next(e)
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        //check if the user is already in the database
        const productExist = await Product.findOne({where: {
                name: req.body.name
            }});
        if(productExist) {
            return res.status(BAD_REQUEST_CODE).json('Product already exist');
        }

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
        })

        if (product) {
            return res.status(CREATED_CODE).json({
                data: product,
                message: 'Product is created',
            })
        }
    } catch (e) {
        next(e);
    }
}


exports.buy = async (req, res, next) => {

    const transaction = await sequelize.transaction();

    try {
        //check if the user is already in the database
        const userExist = await User.findOne({where: {
                email: req.body.email
            }});
        if(!userExist) {
            transaction.rollback();
            return res.status(NOT_FOUND_CODE).json('User is Not Found');
        }

        //check if the product is already in the database
        const productExist = await Product.findOne({where: {
                name: req.body.name
            }});
        if(!productExist) {
            transaction.rollback();
            return res.status(NOT_FOUND_CODE).json('Product is Not Found');
        }

        // const buy = await userExist.money - productExist.price

        if(userExist.money < productExist.price) {
            transaction.rollback();
            return res.status(BAD_REQUEST_CODE).json('You have not enough money');
        }

        await User.update({
            money: userExist.money - productExist.price
        }, {where: { email: req.body.email }
        }, { transaction });

        await transaction.commit();
        return res.status(SUCCESS_CODE).json({
            message: 'you are bought product'
        })

    } catch (e) {
        transaction.rollback();
        next(e);
    }
}


