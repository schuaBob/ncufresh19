var express = require('express');
var router = express.Router();
var study = require('../models/life/study');
var live = require('../models/life/live');
var play = require('../models/life/play');

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
  play.find({}, function(err, data) {
    res.render('life/play', { data: data, user: req.user});
  })
});

router.get('/live', function(req, res, next) {
  live.find({}, function(err, data) {
    res.render('life/live', { data: data, user: req.user});
  })
  
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

/*-----------------------------後台------------------------------*/





module.exports = router;
