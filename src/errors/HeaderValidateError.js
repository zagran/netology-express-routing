'use strict';

let HeaderValidateError = function(message) {
    this.name = 'HeaderValidateError';
    this.code = 101;
    this.message = message || 'Header is not passed or invalid.';
    this.stack = (new Error()).stack;
};

module.exports = HeaderValidateError;