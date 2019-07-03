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

router.get('/study/lit', function(req, res, next) {
  res.render('life/subStudy');
});
router.get('/study/science', function(req, res, next) {
  res.render('life/subStudy');
});
router.get('/study/ec', function(req, res, next) {
  res.render('life/subStudy');
});
router.get('/study/mgt', function(req, res, next) {
  res.render('life/subStudy');
});
router.get('/study/ceecs', function(req, res,next) {
  res.render('life/subStudy');
});
router.get('/study/escollege', function(req, res, next) {
  res.render('life/subStudy');
});
router.get('/study/hakka',function(req, res, next) {
  res.render('life/subStudy');
});
router.get('/study/chst', function(req, res, next) {
  res.render('life/subStudy');
});



module.exports = router;
