'use strict';

let express = require('express');
let router = express.Router();
let hello = require('./hello');
let sub = require('./sub');
let post = require('./post');
let main = require('./main');
let NotFoundError = require('../errors/NotFoundError');
let apiMiddleware = require('../middlewares/api');
let headerMiddleware = require('../middlewares/header');

router.use(apiMiddleware);
router.use(headerMiddleware);

router.use('/', main);
router.use('/hello', hello);
router.use('/sub', sub);
router.use('/post', post);


router.all('*', (req, res) => {
    res.withError(new NotFoundError());
});

module.exports = router;