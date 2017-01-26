'use strict';

let express = require('express');
let api = express.Router();
const _ = require('lodash');

api.get('/', (req, res) => {
    res.withSuccess('Hello stranger !');
});

api.get('/:name', (req, res) => {
    let name = req.param('name');
    res.withSuccess('Hello, '+name);
});
module.exports = api;