var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('life/study');
});

router.get('/study', function(req, res, next) {
  res.render('life/study');
});

router.get('/food', function(req, res, next) {
  res.render('life/food');
});

router.get('/play', function(req, res, next) {
  res.render('life/play');
});

router.get('/live', function(req, res, next) {
  res.render('life/live');
});



module.exports = router;
