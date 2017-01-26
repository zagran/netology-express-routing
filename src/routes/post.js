'use strict';

let express = require('express');
let api = express.Router();
let NotFoundError = require('../errors/NotFoundError');
let headerMiddleware = require('../middlewares/header');

const _ = require('lodash');

api.post('/', (req, res) => {
    res.headerValidate();
    if (!_.isEmpty(req.body)) {
        res.withSuccess(req.body);
    }
    else {
        res.withError(new NotFoundError());
    }
});

module.exports = api;