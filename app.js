"use strict"

const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// config
const config = require('./config');

// routes config
const user = require('./routes/user');
const note = require('./routes/note');
const skill = require('./routes/skill');
const explore = require('./routes/explore');
const cultivation = require('./routes/cultivation');

let app = express();
app.disabled('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// cookie && session
app.use(cookieParser(config.session_secret));
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
  }),
  resave: true,
  saveUninitialized: true
}));

// Cross-Domain Access
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// route
app.all('/sprout/v1/user*', user);
app.all('/sprout/v1/note*', note);
app.all('/sprout/v1/skill*', skill);
app.all('/sprout/v1/explore*', explore);
app.all('/sprout/v1/cultivation*', cultivation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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