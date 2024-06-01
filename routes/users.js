var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');
const userController = require('../controllers/Users');
const lihatProfile = require('../controllers/lihatProfile');
const ubahPassword = require('../controllers/ubahPassword');

router.get('/home', userController.renderUserDashboard);
router.get('/profile', verifyToken, lihatProfile.viewProfile);
router.get('/edit-profile', function(req, res, next) {
  res.render('editprofil');
});
router.get('/change-password', verifyToken, userController.formUbahPassword);  
router.post('/change-password', verifyToken, ubahPassword.changePassword);

module.exports = router;
