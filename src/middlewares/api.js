'use strict';

let InputParameterError = require('../errors/InputParameterError');
let validate = require('../validation/validator');

let apiHelpersMiddleware = function(req, res, next) {

    res.withSuccess = function(data, dataNamespace) {
        if (dataNamespace !== undefined) {
            res.json({ [dataNamespace]: data });
            return;
        }

        res.json(data);
    };

    res.withError = function(err) {
        next(err);
    };

    req.validate = function(schema, params) {
        params = params || req.body;

        try {
            validate(params, schema);
        } catch(err) {
            throw new InputParameterError(err.message);
        }
    };

    next();
};

module.exports = apiHelpersMiddleware;