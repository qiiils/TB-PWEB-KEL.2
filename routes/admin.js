var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/auth');
const controller = require('../controllers/autentikasi');

router.use(verifyToken);

router.get('/',verifyToken,function(req, res, next) {
// res.renderstatus('admin/dashboard', {title: 'home'});
res.status(200).json({ message: 'jbjkdj' });
  });
  
  
  module.exports = router;