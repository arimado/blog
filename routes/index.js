var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET posts page. */
router.get('/posts', function(req, res, next) {
    var collection = db.get().collection('posts');
    collection.find({}).toArray(function (err, docs) {
        res.render('posts', { title: 'Posts', posts: docs });
    })
});

/* GET create post page. */
router.get('/create', function(req, res, next) {
  res.render('create-post', { title: 'Create' });
});

// router.post('/addpost', function(req, res) {
//     var db = req.db;
// });


module.exports = router;
