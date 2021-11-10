const { validationResult } = require("express-validator");

const { BAD_REQUEST_CODE } = require("../util/status-codes");
const sequelize = require('../util/db');

async function errorHandler (req,res, next) {
    const errors = validationResult(req);

    const transaction = await sequelize.transaction()

    console.log(errors);
    transaction.rollback();
    if (!errors.isEmpty()) {
        await transaction.rollback()
        return res.status(BAD_REQUEST_CODE).json({ errors: errors.array().filter((message) => {
                res.json(message.msg.message)
            }) });
        // return next(new ErrorResponse("The name must be 3+ characters", 400));
    }
    return next();
}

module.exports = { errorHandler };
