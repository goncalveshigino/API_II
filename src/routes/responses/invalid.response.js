module.exports = (res, httpStatus, message, error) => {
    return res.status(httpStatus).json({
        status: "INVALID",
        message: message,
        error: error.errors.map(err => {
            return {
                message: err.message,
                field: err.path,
                value: err.value
            }
        })
    })
}