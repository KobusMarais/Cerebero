const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//const index = require('./routes/index');
const users = require('./routes/users');
const AI = require('./routes/AI');
const api = require('./routes/api');
const routes = require('./routes/routes');
const mainGame = require('./routes/mainGame');
const databasers = require('./routes/database.js');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /Public
//app.use(favicon(path.join(__dirname, 'Public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/AI', AI);
//app.use('/index', index);
app.use('/', routes);
app.use('/api', api);
app.use('/users', users);
app.use('/mainGame', mainGame);
app.use('/dbtest', databasers);
app.use(express.static(__dirname + '/Client/eCivix Election Simulator/Builds/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
