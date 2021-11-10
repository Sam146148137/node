const User = require('../../models/user');
const { BAD_REQUEST_CODE, CREATED_CODE } = require('../../util/status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {
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

       const user = await User.create({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           email: req.body.email,
           phone: req.body.phone,
           password: hashedPassword,
           money: req.body.money,
       })

        if (user) {
            return res.status(CREATED_CODE).json({
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
        //check if the email exist
        const emailExist = await User.findOne({where: {
                email: req.body.email
            }});
        if(!emailExist) {
            return res.status(BAD_REQUEST_CODE).json('Email doesn\'t exist');
        }

        // Checking if password is correct
        const validPassword = await bcrypt.compare(req.body.password, emailExist.password)
        if(!validPassword) {
            return res.status(BAD_REQUEST_CODE).send('Invalid Password');
        }

        // creating and assigning a token
        const token = jwt.sign({ id: emailExist.id }, process.env.SECRET_TOKEN,
            {
            expiresIn: "5m"
        })
        res.header('auth-token', token).send(token)

    } catch (e) {
        next(e);
    }
}