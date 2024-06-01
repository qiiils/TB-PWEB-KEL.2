var express = require('express');
var router = express.Router();
const controller = require('../controllers/autentikasi');
const verifyToken= require ('../middleware/auth');

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login', controller.form);
router.post('/checklogin', controller.checklogin);
//router.post('/logout', verifyToken, controller.logout);


module.exports = router;