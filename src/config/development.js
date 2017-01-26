'use strict';

module.exports = {
    baseUrl: 'http://localhost:3000/',

    port: 3000,

    db: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'root',
            database: 'elafris'
        },
        debug: false
    }
};