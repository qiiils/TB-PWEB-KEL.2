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
var loginRoute = require('./routes/login');
var app = express();

(async()=>{
  await db.sync();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views', )));

app.use('/', usersRouter);
app.use('/login', loginRoute)
app.set('view engine', 'ejs');

app.get('/public/stylesheets/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'stylesheets', 'style.css'));
  });

  app.get("/preline/preline.js", (req, res) => {
    res.sendFile(__dirname + "/node_modules/preline/dist/preline.js");
  });

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };

  // Check if user exists
  if (username === 'admin' && password === 'password') {
    // Hash password
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send('Error hashing password');
      } else {
        // Generate token
        jwt.sign({ user: { username, password: hash } }, 'secretKey', { expiresIn: '1h' }, (err, token) => {
          if (err) {
            res.status(500).send('Error generating token');
          } else {
            res.json({ token });
          }
        });
      }
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});



// Middleware untuk verifikasi token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (typeof token !== 'undefined') {
    jwt.verify(token.split(' ')[1], 'secretKey', (err, decoded) => {
      if (err) {
        res.status(403).send('Invalid token');
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
}



  app.listen(3001, ()=>{
    console.log('server http://localhost:3000')
  })

module.exports = app;