'use strict';

let NotFoundError = function(message) {
    this.name = 'ResourceNotFoundError';
    this.code = 902;
    this.message = message || 'Resource not found.';
    this.stack = (new Error()).stack;
};

module.exports = NotFoundError;
