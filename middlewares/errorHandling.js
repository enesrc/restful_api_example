module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode;
    res.status(statusCode).json(err)
}