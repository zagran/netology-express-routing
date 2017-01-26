'use strict';

let v = require('validator');

let validator = function(obj, schema) {
    Object.keys(schema).forEach(key => {
        let value = obj[key];

        if (isRequired(key, obj, schema) && isEmpty(value)) {
            throw new Error(`The [${key}] parameter is required.`);
        }

        if (value === undefined) {
            return;
        }

        if (!validateType(value, schema[key].type)) {
            throw new Error(incorrectTypeErrorMessage(key, schema[key].type));
        }

        if (!validateLength(value, schema[key])) {
            throw new Error(incorrectLengthErrorMessage(key, schema[key]));
        }

        if (!validateConstraints(value, schema[key])) {
            throw new Error(`The [${key}] parameter must be valid ${schema[key].constraints.join(', ')}.`);
        }

        if (isArray(value)) {
            return value.forEach(value => validator(value, schema[key].schema));
        }

        if (isObject(value)) {
            return validator(value, schema[key].schema);
        }
    });
};

let isArray = function(value) {
    return Array.isArray(value);
};

let isObject = function(value) {
    return value !== null && typeof value === 'object';
};

let isEmpty = function(value) {
    return (value !== 0 && !value) || (isArray(value) && value.length === 0);
};

let isRequired = function(key, obj, schema) {
    let required = schema[key].required;
    let requiredWithout = schema[key].requiredWithout;

    if (requiredWithout) {
        if (typeof requiredWithout === 'string') {
            return !obj[requiredWithout];
        }

        return !requiredWithout.some(key => obj[key] !== undefined);
    }

    return schema[key].required;
};

let validateType = function(value, expectedType) {
    if (typeof expectedType === 'string') {
        return hasExpectedType(value, expectedType);
    }

    return expectedType.some(expectedType => hasExpectedType(value, expectedType));
};

let hasExpectedType = function(value, expectedType) {
    return expectedType === 'array' && isArray(value)
        || expectedType === 'object' && isObject(value)
        || value !== null && typeof value === expectedType;
};

let validateConstraints = function(value, schema) {
    let constraints = schema.constraints;

    if (constraints === undefined) {
        return true;
    }

    value = String(value);

    return constraints.every(constraint => {
        if (constraint === 'integer' || constraint === 'unixTimestamp') {
            return v.isInt(value);
        }

        if (constraint === 'positive') {
            return value > 0;
        }

        if (constraint === 'uuid') {
            return v.isUUID(value);
        }

        if (constraint === 'phone') {
            return v.isMobilePhone(value, 'en-US');
        }

        if (constraint === 'url') {
            return v.isURL(value);
        }

        throw new Error(`Unsupported constraint [${constraint}].`);
    });
};

let validateLength = function(value, schema) {
    if (typeof value !== 'string'
        || (schema.minLength === undefined && schema.maxLength === undefined)) {
        return true;
    }

    let hasCorrectLength = true;

    if (schema.minLength !== undefined && value.length < schema.minLength) {
        hasCorrectLength = false;
    }

    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
        hasCorrectLength = false;
    }

    return hasCorrectLength;
};

let incorrectTypeErrorMessage = function(key, expectedType) {
    let typeMessage = typeof expectedType === 'string' ? expectedType : expectedType.join(' or ');

    return `The [${key}] parameter has incorrect type. It must be type of ${typeMessage}.`;
};

let incorrectLengthErrorMessage = function(key, schema) {
    let minLengthMessage = schema.minLength ? 'greater than or equal to ' + schema.minLength : '';
    let maxLengthMessage = schema.maxLength ? 'less than or equal to ' + schema.maxLength : '';
    let lengthMessage = 'It must be ' + minLengthMessage + (minLengthMessage && maxLengthMessage ? ' and ' : '') +  maxLengthMessage;

    return `The [${key}] parameter has incorrect length. ${lengthMessage}.`;
};

module.exports = validator;