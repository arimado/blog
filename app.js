var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var vhost = require('vhost');
var methodOverride = require('method-override'); //allows you to use HTTP verbs such as PUT or DELETE in places where the client does not support it
var passport = require('passport'); // ***
var LocalStrategy = require('passport-local');

var db = require('./db');
// var config = require('./config.js');
// var funct = require('./functions.js')

var app = express();


// WHAT EVEN IS THIS -------------------------------------

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('X-HTTP-Method-Override'));                              // ***
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true})); // ***
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
// U WOT M8?

app.use(function(req, res, next) {
    var err = req.session.error;
    var msg = req.session.notice;
    var success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

// CONNECT TO DB -------------------------------------

db.connect('mongodb://localhost:27017/blog', function(err) {
    if (err) {
        console.log('sumthing happend maaate!');
    } else {
        console.log('connected to DB');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// ROUTES  ------------------------------------

var admin = require('./routes/admin');
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
