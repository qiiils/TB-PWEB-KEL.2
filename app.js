var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
var db = require('./models');

dotenv.config();

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var app = express();

(async()=>{
  await db.sequelize.sync();
})();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
/* app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true, 
})); */
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use('/preline', express.static(path.join(process.cwd(), '/node_modules/preline/dist')));

// Static files 
app.use(express.static(path.join(__dirname, "./node_modules/preline/dist")));
app.use(express.static(path.join(__dirname, 'views', )));
app.use('/admin', express.static(path.join(__dirname, 'views/admin')));
app.use('/users', express.static(path.join(__dirname, 'views/users')));
app.use('/layout', express.static(path.join(__dirname, 'views/layout')));

// View Engine 
app.set('view engine', 'ejs');

// Routes
app.use('/user', usersRouter);
app.use('/', loginRouter);
app.use('/admin', adminRouter);


app.get('/public/stylesheets/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'stylesheets', 'style.css'));
  });

  app.get("/preline/preline.js", (req, res) => {
    res.sendFile(__dirname + "/node_modules/preline/dist/preline.js");
  });



  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  app.listen(3001, () => {
    console.log('server http://localhost:3000');
  });

module.exports = app;