const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().filter((message) => {
                res.json(message.msg.message)
                }) });
           // return next(new ErrorResponse("The name must be 3+ characters", 400));
        }

        if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password || !req.body.phone) {
            return res.status(400).json('400 Bad Request')
        }

        //check if the user is already in the database
        const emailExist = await User.findOne({where: {
                email: req.body.email
            }});
        if(emailExist) {
            return res.status(400).json('Email already exist');
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

       const user = await User.create({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           email: req.body.email,
           password: hashedPassword,
           phone: req.body.phone,
       })

        if (user) {
            return res.status(201).json({
                data: user,
                message: 'User is created'
            })
        }
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        //express validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().filter((message) => {
                    res.json(message.msg.message)
                }) });
            // return next(new ErrorResponse("The name must be 3+ characters", 400));
        }

        //check if the email exist
        const user = await User.findOne({where: {
                email: req.body.email
            }});
        if(!user) {
            return res.status(400).json('Email doesn\'t exist');
        }

        // checking user's visual for developer
        console.log(77777777777777, user, 77777777777777)

        // Checking if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) {
            return res.status(400).send('Invalid Password');
        }

        // creating and assigning a token
        const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN)
        res.header('auth-token', token).send(token)

    } catch (e) {
        next(e);
    }
}