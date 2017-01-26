'use strict';

let express = require('express');
let api = express.Router();
const _ = require('lodash');

api.all('/:param', (req, res) => {
    res.withSuccess('You requested ' + req.protocol + '://' + req.get('host') + req.originalUrl);
});
api.all('/:param/:next', (req, res) => {
    res.withSuccess('You requested ' + req.protocol + '://' + req.get('host') + req.originalUrl);
});

module.exports = api;