'use strict';

let NotFoundError = require('../errors/NotFoundError');
let HeaderValidateError = require('../errors/HeaderValidateError');

let errorsHandlerMiddleware = function(err, req, res, next) {
    let httpCode, error = {
        type: err.name,
        code: err.code || 0,
        message: err.message
    };

    if (err instanceof NotFoundError) {
        httpCode = 404;
        error.message = "Body is empty";
        error.code = 404;
    } else if (err instanceof HeaderValidateError) {
        httpCode = 401;
        error.message = "Headers missing";
        error.code = 401;
    } else if (err instanceof Error && !(err instanceof SyntaxError)) {
        httpCode = 500;
        error.type = 'Error';
        error.message = 'Something went wrong.';
        error.code = 0;
    } else {
        httpCode = 400;
    }

    res.status(httpCode);

    if (req.method === 'GET') {
        res.render('error', { errorMessage: error.message });
        return;
    }

    res.json({ error: error });
};

module.exports = errorsHandlerMiddleware;