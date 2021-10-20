const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
    })
};

module.exports = errorHandler;