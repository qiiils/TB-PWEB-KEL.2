var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));;
});

module.exports = router;