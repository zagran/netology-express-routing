'use strict';

let express = require('express');
let api = express.Router();
const _ = require('lodash');

api.get('/', (req, res) => {
    res.withSuccess('Hello Express.js');
});

module.exports = api;