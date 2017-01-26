'use strict';

let HeaderValidateError = require('../errors/HeaderValidateError');

let headerMiddleware = function (req, res, next) {

    res.headerValidate = function () {
        if (req.header('Header') !== 'Key') {
            throw new HeaderValidateError();
        }
    };

    next();
};

module.exports = headerMiddleware;