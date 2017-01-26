'use strict';
let configurator = require('../utils/configurator');

let environments = {
    development: require('./development'),
};

let globalConfig = {
    timezone: 'Europe/Sofia'
};

let config = Object.assign(globalConfig, environments[process.env.NODE_ENV || 'development']);

module.exports = configurator(config);