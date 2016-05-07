var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// LOGIN/SIGNUP -------------------------------

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Welcome' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Join us' });
});

// POSTS -------------------------------------

router.get('/posts', function(req, res, next) {
    var collection = db.get().collection('posts');
    collection.find({}).sort({published: -1}).toArray(function (err, docs) {
        res.render('posts', { title: 'Posts', posts: docs });
    }); 
});

// POST ---------------------------------------

router.get('/post/:url', function(req, res, next) {
  res.render('create-post', { title: 'Create' });
});

// CREATE -------------------------------------

router.get('/create', function(req, res, next) {
  res.render('create-post', { title: 'Create' });
});

router.post('/addpost', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var date = new Date();
    var posts = db.get().collection('posts');
    posts.insert({title: title, content: content, published: date }, function(err, result) {
        res.redirect(303, '/posts');
    });
});

module.exports = router;
