var express = require('express');
var router = express.Router();
var study = require('../models/life/study');
var live = require('../models/life/live');
var play = require('../models/life/play');
var food = require('../models/life/food');
var time = require('../models/life/time');
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
var storage2 = multer.diskStorage({
  destination: "public/life/subPicture/",
  filename   : function(req, file, cb){
    var rdm = '';
    for(var i=0 ; i<10 ; i++) rdm += Math.floor((Math.random() * 10));
    var fileName = req.body.modifyStudyTitle + ".png";
    cb(null, fileName);
  }
})

var upload = multer({ storage: storage });
var upload2 = multer({ storage: storage2 });

var match_num = {
  'lit'         : 0,
  'science'     : 1,
  'ec'          : 2,
  'mgt'         : 3,
  'ceecs'       : 4,
  'escollege'   : 5,
  'hakka'       : 6,
  'chst'        : 7
};

/* ---------------------網頁版---------------------*/
router.get('/', function(req, res, next) {
  res.render('life/index', {user: req.user});
});

router.get('/study', function(req, res, next) {
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/study', { data1: data1, data2: data2, user: req.user});
    })
  })
});

router.get('/food', function(req, res, next) {
  food.find({}, function(err, data) {
    res.render('life/food', { data: data, user: req.user});
  })
});

router.get('/play', function(req, res, next) {
  play.find({}, function(err, data) {
    res.render('life/play', { data: data, user: req.user});
  })
});

router.get('/live', function(req, res, next) {
  live.find({}, function(err, data) {
    res.render('life/live', { data: data, user: req.user});
  });
  
});

//文學院
router.get('/study/lit', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//理學院
router.get('/study/science', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//工學院
router.get('/study/ec', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//管理學院
router.get('/study/mgt', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//資電學院
router.get('/study/ceecs', function(req, res,next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//地球科學學院
router.get('/study/escollege', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//客家學院
router.get('/study/hakka',function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});
//生醫理工學院
router.get('/study/chst', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/subStudy', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

/*----------------------手機版-----------------------*/

router.get('/index_phone', function(req, res, next) {
  res.render('life/phone/index_phone',{user: req.user})
});

router.get('/study_phone', function(req, res, next) {
  study.find({}, function(err, data) {
    res.render('life/phone/study_phone',{data: data, user: req.user})
  })
});
router.get('/food_phone', function(req, res, next) {
  food.find({}, function(err, data) {
    res.render('life/phone/food_phone',{data: data, user: req.user})
  })
});
router.get('/live_phone', function(req, res, next) {
  live.find({}, function(err, data) {
    res.render('life/phone/live_phone',{data: data, user: req.user})
  })
});
router.get('/play_phone', function(req, res, next) {
  play.find({}, function(err, data) {
    res.render('life/phone/play_phone',{data: data, user: req.user})
  })
});

//文學院
router.get('/study_phone/lit', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/science', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/ec', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/ceecs', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/excollege', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/hakka', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/mgt', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
  })
});

router.get('/study_phone/chst', function(req, res, next) {
  var page= req.url;
  page = page.split('/');
  console.log("page= " + page[2]);
  console.log("num= " + match_num[page[2]]);
  study.find({}, function(err, data1) {
    time.find({}, function(err, data2) {
      res.render('life/phone/subStudy_phone', { data1: data1, data2: data2, page: page[2], num: match_num[page[2]], user: req.user });
    })
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
      if (req.body.picture) {
        play.updateOne({ mainTitle: req.body.modifyMainTitle }, {picture: req.body.picture}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update picture");
      });
      };
    } else {
      new play({
        mainTitle: req.body.mainTitle,
        subTitle: req.body.subTitle,
        picture: req.body.picture,
        content: req.body.content
      }).save(function(err) {
        if (err) console.log('FAIL');
        else console.log('SUCCESS');
      });
    };
  res.redirect('back');
  });
});

router.post('/addStudyContent', upload2.single('picture'), function(req, res, next) {
  if (req.file) {
    var cuted = req.file.path.split('/');
    var pathed = cuted[2] + "/" + cuted[3];
  }
  study.findOne({type: req.body.modifyStudyTitle}).exec(function(err, result) {
    console.log("enter!!!!");
    if (result !== null) {
      if (req.body.mainTitle) {
        study.updateOne({ type: req.body.modifyStudyTitle }, {mainTitle: req.body.mainTitle}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update mainTitle");
        });
      };
      if (req.body.name) {
        study.updateOne({ type: req.body.modifyStudyTitle }, {name: req.body.name}, function(err) {
            if (err) console.log("Fail to update");
            else console.log("success to update name");
        });
      };
      if (req.body.subTitle) {
        study.updateOne({ type: req.body.modifyStudyTitle }, {subTitle: req.body.subTitle}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update subTitle");
        });
      };
      if (req.body.content) {
        study.updateOne({ type: req.body.modifyStudyTitle }, {content: req.body.content}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update content");
        });
      };
      if (req.file) {
        study.updateOne({ type: req.body.modifyStudyTitle }, {picture: pathed}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update picture");
        });
      };
    } else {
      console.log("mainTitle" + req.body.mainTitle);
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

router.post('/addTimeline', function(req, res, next) {
  time.findOne({type: req.body.type, time: req.body.time}).exec(function(err, result) {
    if (result !== null) {
      if (req.body.event) {
        time.updateOne({ type: req.body.type, time: req.body.time}, {event: req.body.event}, function(err) {
          if (err) console.log("Fail to update");
          else console.log("success to update content");
      });
      };
    } else {
      new time({
        type: req.body.type,
        time: req.body.time,
        event: req.body.event
      }).save(function(err) {
        if (err) console.log('FAIL');
        else console.log('SUCCESS');
      });
    };
  res.redirect('back');
  });
});




router.get('/foodModal', function (req, res, next) {
  food.findById(req.query.id, {
      _id: 0,
      mainTitle: 1,
      content: 1
    }).exec(function(err, result) {
      if (err) {
        return next(err);
      }
      res.send(result);
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
