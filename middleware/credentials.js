const allowedOrigins = require('../config/allowedOrigins');

const credentilas = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentails', true);
    }
    next();
}

module.exports = credentilas;