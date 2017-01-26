'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let routes = require('./routes');
let config = require('./config');
let errorsHandlerMiddleware = require('./middlewares/errorsHandler');

app.use(bodyParser.json());

// Routes
app.use(routes);

// Middleware
app.use(errorsHandlerMiddleware);


app.listen(config.get('port'), () => console.log(`Started on port ${config.get('port')}!`));