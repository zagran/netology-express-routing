'use strict';

let configurator = function(config) {
    if (!config) {
        throw new Error(`Configuration is missing.`);
    }

    if (typeof config === 'string') {
        try {
            config = JSON.parse(config);
        } catch(err) {
            throw new Error(`Parsing configuration failed.`);
        }
    }

    return {
        get: function(str, defaultValue) {
            return str.split('.').reduce((a, b) => {
                if (a[b] === undefined) {
                    if (defaultValue !== undefined) {
                        return defaultValue;
                    }

                    throw new Error(`Config [${str}] is not found.`);
                }

                return a[b];
            }, config);
        }
    };
};

module.exports = configurator;