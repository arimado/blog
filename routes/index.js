var express = require('express');
var router = express.Router();
var db = require('../db');
var slug = require('slug');

// ADMIN AREA --------------------------------

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

router.get('/post/:slug', function(req, res, next) {
    // the post links need to point to post/url
    // on this current handler get the url
    var slug = req.params.slug;
    // search for the document with data you want
    var posts = db.get().collection('posts');
    posts.findOne({slug: slug}, function (err, doc) {
        res.render('post', { title: doc.title, slug: slug, content: doc.content});
    })
});


// CREATE -------------------------------------

router.get('/create', function(req, res, next) {
  res.render('create-post', { title: 'Create' });
});

router.post('/addpost', function(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var date = new Date();
    var titleSlug = slug(title);
    console.log('titleSlug: ' + titleSlug);
    var posts = db.get().collection('posts');

    var isSlug = posts.findOne({slug: titleSlug}, function(err, match) {
        if(!match) {
            posts.insert({title: title, content: content, published: date, slug: titleSlug }, function(err, result) {
                res.redirect(303, '/posts');
            });
        } else {
            console.log('title already taken');
            res.redirect(303, '/create');
        }
    });
    console.log('isSlug method: ' + JSON.stringify(isSlug));
});


// Wow -----------------------------------

router.get('/foo',
    function(req,res, next){
        if(Math.random() < 0.33) return next();
        res.render('red', { title: 'Red' });
    },
    function(req,res, next){
        if(Math.random() < 0.5) return next();
        res.render('blue', { title: 'Blue' });
    },
    function(req,res){
        res.render('green', { title: 'Green' });
    }
);

module.exports = router;
