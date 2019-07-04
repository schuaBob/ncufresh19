var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('link/index', { title: '常用連結' });
});

module.exports = router;
