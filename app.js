var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash  = require('req-flash');

const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var session = require('express-session');
mongoose.connect('mongodb://localhost/articles');
var bodyParser = require('body-parser')
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require("./routes/articles");
var passport = require("passport");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: "Shh, its a secret!"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
app.use(fileUpload());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/article",articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
