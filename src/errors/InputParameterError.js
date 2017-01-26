'use strict';

let InputParameterError = function(message) {
    this.name = 'InputParameterError';
    this.code = 101;
    this.message = message || 'Parameter is not passed or invalid.';
    this.stack = (new Error()).stack;
};

module.exports = InputParameterError;