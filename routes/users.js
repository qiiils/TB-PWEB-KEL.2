var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken= require ('../middleware/auth');
const controller = require('../controllers/Users');
const { changePassword } = require('../controllers/users');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/user', function(req, res, next) {
  res.render('userDashboard');
})
router.get('/user/dashboard', function(req, res, next) {
  res.render('profile');
});

router.get('/user/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/user/edit-profile', function(req, res, next) {
  res.render('editprofil');
});

router.post('/user/ubah-password', controller.changePassword)
router.get('/user/change-password', controller.formUbahPassword)

module.exports = router;


