var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var dotenv = require('dotenv');
var db = require('./config/database');
dotenv.config();

var usersRouter = require('./routes/users');

var app = express();

(async()=>{
  awa
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views', )));

app.use('/', usersRouter);

app.set('view engine', 'ejs');

app.get('/public/stylesheets/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'stylesheets', 'style.css'));
  });

module.exports = app;