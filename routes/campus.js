var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('campus/index', { title: '校園地圖' });
});

module.exports = router;
