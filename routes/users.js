var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/user/change-password', (req, res) => {
  res.render('changepw');
});

router.get('/user/dashboard', function(req, res, next) {
  res.render('profile');
});

router.get('/user/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/user/edit-profile', function(req, res, next) {
  res.render('editprofil');
});

module.exports = router;
