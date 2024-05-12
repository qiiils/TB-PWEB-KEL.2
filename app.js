var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var passwordRouter = require('./routes/password');
var profileRouter = require('./routes/profile');
var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/password', passwordRouter);
app.use('/profile', profileRouter);
app.use('/login', loginRouter);

app.get('/public/stylesheets/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'stylesheets', 'style.css'));
  });

module.exports = app;