var express = require('express');
var router = express.Router();
var study = require('../models/life/study');
var live = require('../models/life/live');
var play = require('../models/life/play');
var food = require('../models/life/food');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: "public/life/subPicture/",
  filename   : function(req, file, cb){
    var rdm = '';
    for(var i=0 ; i<10 ; i++) rdm += Math.floor((Math.random() * 10));
    var fileName = req.body.mainTitle + "_" + req.body.subTitle + "_" + rdm + ".png";
    cb(null, fileName);
  }
})

var upload = multer({ storage: storage });


var match_num = {
  'study'         : 0,
  'food'          : 1,
  'play'          : 2,
  'live'          : 3,
};

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
  });
  
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
router.post('/addLiveContent', upload.single('picture'), function(req, res, next) {
  if (req.file) {
    var cuted = req.file.path.split('/');
    var pathed = cuted[2] + "/" + cuted[3];
  }
  new live({
    mainTitle: req.body.mainTitle,
    subTitle: req.body.subTitle,
    picture: pathed,
    content: req.body.content
  }).save(function(err) {
    if (err) {
      console.log('FAIL');
      return;
    }
    console.log('SUCCESS');
  });
  res.redirect('back');
});

router.post('/addPlayContent', upload.single('picture'), function(req, res, next) {
  if (req.file) {
    var cuted = req.file.path.split('/');
    var pathed = cuted[2] + "/" + cuted[3];
  }
  new play({
    mainTitle: req.body.mainTitle,
    subTitle: req.body.subTitle,
    picture: pathed,
    content: req.body.content
  }).save(function(err) {
    if (err) {
      console.log('FAIL');
      return;
    }
    console.log('SUCCESS');
  });
  res.redirect('back');
});

router.post('/deleteLiveContent', function(req, res, next) {
  console.log('Enter delete');
  /*var title = live.findOne({mainTitle: req.body.mainTitle}).exec(function(err, result) {
    console.log('mainTitle is ' + title);
  });
  */
  console.log(req.body);
  live.deleteOne({ mainTitle: req.body.mainTitle }, function(err) {
    if(err) console.log('Fail');
    else console.log('success to delete');
  });
  res.redirect('back');
});

router.post('/deletePlayContent', function(req, res, next) {
  console.log('Enter delete');
  /*var title = live.findOne({mainTitle: req.body.mainTitle}).exec(function(err, result) {
    console.log('mainTitle is ' + title);
  });
  */
  console.log(req.body);
  play.deleteOne({ mainTitle: req.body.mainTitle }, function(err) {
    if(err) console.log('Fail');
    else console.log('success to delete');
  });
  res.redirect('back');
});



module.exports = router;
