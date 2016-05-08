var express = require('express');
var router = express.Router();
var db = require('../db');
var vhost = require('vhost');

// ADMIN AREA --------------------------------
router.use(vhost('admin.*', router));
    router.get('/', function(req, res) {
    res.render('admin', {title: 'The Admin Area'})
});

module.exports = router;
