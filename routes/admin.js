// admin.js

var express = require('express');
var router = express.Router();
const adminController = require('../controllers/Admin');

router.get('/home', adminController.renderAdminDashboard);
router.get('/admin/profile', adminController.viewProfile);


module.exports = router;
