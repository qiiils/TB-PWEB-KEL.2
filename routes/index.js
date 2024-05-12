var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
  res.status(200);
});

module.exports = router;