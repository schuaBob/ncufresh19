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
  res.redirect('/life/study');
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
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/science', function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/ec', function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/mgt', function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/ceecs', function(req, res,next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/escollege', function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/hakka',function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});
router.get('/study/chst', function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/subStudy', { data: data, user: req.user });
  })
});

/*-----------------------------後台------------------------------*/

/* update live page content */
router.post('/addLiveContent', upload.single('picture'), function(req, res, next) {
  if (req.file) {
    var cuted = req.file.path.split('/');
    var pathed = cuted[2] + "/" + cuted[3];
  }
  live.findOne({mainTitle: req.body.modifyMainTitle}).exec(function(err, result) {
    if (result !== null) {
      if (req.body.mainTitle) {
        live.updateOne({ mainTitle: req.body.modifyMainTitle }, {mainTitle: req.body.mainTitle}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update mainTitle");
        });
      };
      if (req.body.subTitle) {
        live.updateOne({ mainTitle: req.body.modifyMainTitle }, {subTitle: req.body.subTitle}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update subTitle");
      });
      };
      if (req.body.content) {
        live.updateOne({ mainTitle: req.body.modifyMainTitle }, {content: req.body.content}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update content");
      });
      };
      if (req.file) {
        live.updateOne({ mainTitle: req.body.modifyMainTitle }, {picture: pathed}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update picture");
      });
      };
    } else {
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
    };
  res.redirect('back');
  });
});


router.post('/addPlayContent', upload.single('picture'), function(req, res, next) {
  if (req.file) {
    var cuted = req.file.path.split('/');
    var pathed = cuted[2] + "/" + cuted[3];
  }
  play.findOne({mainTitle: req.body.modifyMainTitle}).exec(function(err, result) {
    if (result !== null) {
      if (req.body.mainTitle) {
        play.updateOne({ mainTitle: req.body.modifyMainTitle }, {mainTitle: req.body.mainTitle}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update mainTitle");
        });
      };
      if (req.body.subTitle) {
        play.updateOne({ mainTitle: req.body.modifyMainTitle }, {subTitle: req.body.subTitle}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update subTitle");
      });
      };
      if (req.body.content) {
        play.updateOne({ mainTitle: req.body.modifyMainTitle }, {content: req.body.content}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update content");
      });
      };
      if (req.file) {
        play.updateOne({ mainTitle: req.body.modifyMainTitle }, {picture: pathed}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update picture");
      });
      };
    } else {
      new play({
        mainTitle: req.body.mainTitle,
        subTitle: req.body.subTitle,
        picture: pathed,
        content: req.body.content
      }).save(function(err) {
        if (err) console.log('FAIL');
        else console.log('SUCCESS');
      });
    };
  res.redirect('back');
  });
});

router.post('/addStudyContent', upload.single('picture'), function(req, res, next) {
  if (req.file) {
    var cuted = req.file.path.split('/');
    var pathed = cuted[2] + "/" + cuted[3];
  }
  study.findOne({mainTitle: req.body.modifyMainTitle}).exec(function(err, result) {
    if (result !== null) {
      if (req.body.mainTitle) {
        study.updateOne({ mainTitle: req.body.modifyMainTitle }, {mainTitle: req.body.mainTitle}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update mainTitle");
        });
      };
      if (req.body.name) {
        study.updateOne({ mainTitle: req.body.modifyMainTitle }, {name: req.body.name}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update name");
        });
      };
      if (req.body.subTitle) {
        study.updateOne({ mainTitle: req.body.modifyMainTitle }, {subTitle: req.body.subTitle}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update subTitle");
        });
      };
      if (req.body.content) {
        study.updateOne({ mainTitle: req.body.modifyMainTitle }, {content: req.body.content}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update content");
        });
      };
      if (req.file) {
        study.updateOne({ mainTitle: req.body.modifyMainTitle }, {picture: pathed}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update picture");
        });
      };
    } else {
      new study({
        mainTitle: req.body.mainTitle,
        name: req.body.name,
        subTitle: req.body.subTitle,
        picture: pathed,
        content: req.body.content
      }).save(function(err) {
        if (err) console.log('FAIL');
        else console.log('SUCCESS');
      });
    };
  res.redirect('back');
  });
});

router.post('/addFoodContent', function(req, res, next) {
  food.findOne({mainTitle: req.body.modifyFoodTitle}).exec(function(err, result) {
    if (result !== null) {
      if (req.body.foodTitle) {
        food.updateOne({ mainTitle: req.body.modifyFoodTitle }, {mainTitle: req.body.foodTitle}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update mainTitle");
        });
      };
      if (req.body.foodDetail) {
        food.updateOne({ mainTitle: req.body.modifyFoodTitle }, {content: req.body.foodDetail}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update content");
      });
      };
    } else {
      new food({
        mainTitle: req.body.foodTitle,
        content: req.body.foodDetail
      }).save(function(err) {
        if (err) console.log('FAIL');
        else console.log('SUCCESS');
      });
    };
  res.redirect('back');
  });
});






router.post('/deleteLiveContent', function(req, res, next) {
  live.deleteOne({ mainTitle: req.body.mainTitle }, function(err) {
    if(err) console.log('Fail');
    else console.log('success to delete');
  });
  res.redirect('back');
});

router.post('/deletePlayContent', function(req, res, next) {
  play.deleteOne({ mainTitle: req.body.mainTitle }, function(err) {
    if(err) console.log('Fail');
    else console.log('success to delete');
  });
  res.redirect('back');
});




module.exports = router;
