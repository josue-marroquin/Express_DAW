var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goalsRouter = require('./routes/goals');
var tasksRouter = require('./routes/tasks');
// Router
const router = express.Router();
// CORS
var cors = require("cors");
// Mongoose - MongoDb Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/desarrolloweb');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Instanciando CORS
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',router);

// Middleware de autorizacion
router.use((req, res, next)=>{
  if(req.headers.authorization && req.headers.authorization === '12345'){
    next();
  } else {
    res.status(401).json({'error': 'API Key no es Valido!'});
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goals', goalsRouter);
app.use('/tasks', tasksRouter);

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