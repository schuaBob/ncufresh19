var express = require('express');
var router = express.Router();
var study = require('../models/life/study');
var live = require('../models/life/live');
var play = require('../models/life/play');
var food = require('../models/life/food');





var match_num = {
  'study'         : 0,
  'food'          : 1,
  'play'          : 2,
  'live'          : 3,
}

/* GET home page. */
router.get('/', function(req, res, next) {
  play.find({}, function(err, data) {
    res.render('life/study', { data: data, page: 'study', num: match_num['study'], user: req.user});
  })
});

router.get('/study', function(req, res, next) {
  var type = req.url;
  type = type.substr(1);
  study.find({}, function(err, data) {
    res.render('life/study', { data: data, page: type, num: match_num[type], user: req.user});
  })
});

router.get('/food', function(req, res, next) {
  var type = req.url;
  type = type.substr(1);
  food.find({}, function(err, data) {
    res.render('life/food', { data: data, page: type, num: match_num[type], user: req.user});
  })
});

router.get('/play', function(req, res, next) {
  var type = req.url;
  type = type.substr(1);
  play.find({}, function(err, data) {
    res.render('life/play', { data: data, page: type, num: match_num[type], user: req.user});
  })
});

router.get('/live', function(req, res, next) {
  var type = req.url;
  type = type.substr(1);
  live.find({}, function(err, data) {
    res.render('life/live', { data: data, page: type, num: match_num[type], user: req.user});
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

/* update live page content */
router.post('/addLiveContent', function(req, res, next) {
  var cuted = req.file.path.split("/"),
      pathed = cuted[2] + "/" + cuted[3];
  var newlive = new live({
    mainTitle: req.body.maintitle,
    subTitle: req.body.subtitle,
    picture: pathed,
    content: req.body.content
  }).save(function(err) {
    if (err) {
      console.log('FAIL');
      return;
    }
    console.log('SUCCESS');
  });
  res.redirect('/live');
});




module.exports = router;
