var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordController = require('../controllers/authpassword');
const authMiddleware = require('../middleware/auth');

import {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    changePassword
} from "../controllers/Users.js"

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/user/change-password', changePassword) => {
  res.render('changepw');
});

router.post('/user/update-password', auth.authenticate, authpassword.updatePassword);

router.get('/user/dashboard', function(req, res, next) {
  res.status(200).send('profile');
});

router.get('/user/profile', function(req, res, next) {
  res.status(200).send('profile');
});

router.get('/user/edit-profile', function(req, res, next) {
  res.render('editprofil');
});

module.exports = router;