const { validationResult } = require("express-validator");
const { BAD_REQUEST_CODE } = require("../util/status-codes");

async function errorHandler (req,res, next) {
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST_CODE).json({ errors: errors.array().filter((message) => {
                res.json(message.msg.message)
            }) });
        // return next(new ErrorResponse("The name must be 3+ characters", 400));
    }
    return next();
}

module.exports = { errorHandler };
