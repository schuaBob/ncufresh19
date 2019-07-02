var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區 | 新生知訊網' });
});

module.exports = router;
