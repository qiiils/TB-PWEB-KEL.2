var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
var db = require('./config/database');
dotenv.config();

var usersRouter = require('./routes/users');
var loginRoute = require('./routes/login');
var adminRouter = require('./routes/admin');
var app = express();

(async()=>{
  await db.sync();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./node_modules/preline/dist")));
app.use(express.static(path.join(__dirname, 'views', )));

app.use('/', usersRouter);
app.use('/login', loginRoute);
app.use('/admin', adminRouter);
app.set('view engine', 'ejs');

app.get('/public/stylesheets/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'stylesheets', 'style.css'));
  });

  app.get("/preline/preline.js", (req, res) => {
    res.sendFile(__dirname + "/node_modules/preline/dist/preline.js");
  });


// sequelize 


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db_datamining', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

//async function testDatabaseConnection() {
//  try {
//    await sequelize.authenticate();
//    console.log('Connection has been established successfully.');
//  } catch (error) {
//  console.error('Unable to connect to the database:', error);
//}
//}

// Panggil fungsi untuk menguji koneksi database
// testDatabaseConnection();


  app.listen(3001, ()=>{
    console.log('server http://localhost:3000')
  })

module.exports = app;