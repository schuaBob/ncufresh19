var express = require('express');
var router = express.Router();
var Users = require("../models/index/user");
var checkUser = require('./check-user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var docNews = require('../models/index/news');
var docCalender = require('../models/index/calender');
var docCommercial = require('../models/index/commercial');
var multer = require('multer');
var uploadHandler = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/index/commercial');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
})
var fs = require('fs');

// for oauth
var url = require('url');
var request = require('request');
const CLIENT_ID = "Nzc3NzY0MmYtMDM2Ny00MjJhLWIxZTAtYTJmYzFlMDQyYzY4";
const CLIENT_SECRET = "5e7a8fbddb8f00a3c4c46defd331d412733f08bf893a8194a236fe915c57d11255e1b6c21567fe0c60647e1996a64cf1e6bd302163f18f978c23f0008356c5e7";

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, id, password, done) {
  Users.findOne({
    id: id
  }, function (err, user) {
    if (err) done(err);
    if (!user) {
      console.log(id + "不存在");
      //euqual to req.flash('error', "使用者名稱或密碼錯誤");
      return done(null, false, {
        message: "使用者名稱或密碼錯誤"
      });
    }
    user.comparePassword(password, user.password, function (err, isMatch) {
      if (err)
        return done(err);
      if (isMatch)
        return done(null, user, console.log(user.id + " login Successfully"));
      else {
        console.log(id + '密碼錯誤');
        return done(null, false, {
          message: "使用者名稱或密碼錯誤"
        });
      }
    });
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get('/', (req, res, next) => {
  Promise.all([
    docNews.find({}, {
      _id: 0,
      __v: 0
    }).exec(),
    docCommercial.find({}, {
      _id: 0,
      __v: 0
    }).exec(),
    docCalender.find({
      month: "8"
    }, {
      _id: 0,
      __v: 0
    }).exec()
  ]).then((result) => {
    var news = result[0],
        commercial = result[1],
        calender = result[2];
    var newsDocs = news.filter((item) => {
      var TimeNow = new Date().getTime() + 28800000;
      var pass = (TimeNow - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24)
      if (pass > 0) {
        //item.screenTime = `${Math.abs(pass.toFixed(0))}天前`;
        item.screenTime = item.date.getFullYear() + "/" + (item.date.getMonth()+1) + "/" + item.date.getDate();
      }
      return pass > 0
    })

    newsDocs.sort(function(a, b) {
      return a.date > b.date ? -1 : 1;
    });

    var catePicArr = ["重要通知", "重要通知", "學校活動", "課業相關", "生活日常", "網站問題", "學生組織"];

    calender = calender.sort(function (a, b) {
      if (a.month !== b.month) {
        return Number(a.month) > Number(b.month) ? 1 : -1;
      } else {
        return Number(a.date) > Number(b.date) ? 1 : -1;
      }
    });

    res.render('index/index', {
      title: "新生知訊網 | 首頁",
      News: newsDocs,
      commercial: commercial,
      icon: catePicArr,
      calender: calender,
      user: req.user
    })
  }).catch((error) => {
    if (error) return next(error);
  })
});

router.get('/index-edit', checkUser.isAdmin, (req, res, next) => {
  Promise.all([
    docNews.find({}, {
      _id: 0,
      pk: 1,
      title: 1,
      date: 1,
      category: 1
    }).exec(),
    docCalender.find({}, {
      _id: 0,
      pk: 1,
      month: 1,
      date: 1
    }).exec(),
    docCommercial.find({}, {
      _id: 0,
      pk: 1,
      picPath: 1,
      picLink: 1
    }).exec()
  ]).then((doc) => {
    var news = doc[0],
      calender = doc[1],
      commercial = doc[2];
    try {
      for (let i in news) {
        var TimeNow = new Date().getTime() + 28800000;
        var pass = (TimeNow - new Date(news[i].date).getTime()) / (1000 * 60 * 60 * 24)
        if (pass > 0) {
          news[i]['screenTime'] = `${Math.abs(pass.toFixed(2))}天前`;
        } else {
          news[i]['screenTime'] = `${Math.abs(pass.toFixed(2))}天後`;
        }
      }
    } catch (error) {
      return next(error);
    }
    var catePicArr = ["重要通知", "重要通知", "學校活動", "課業相關", "生活日常", "網站問題", "學生組織"];
    res.render('index/edit', {
      title: '新生知訊網 | 編輯首頁',
      news: news,
      icon: catePicArr,
      calender: calender,
      commercial: commercial,
      user: req.user
    });
  }).catch((err) => {
    return next(err);
  })
});

router.post('/adpic', uploadHandler.array('commercialpic', 6), checkUser.isAdmin, (req, res, next) => {
  var picArray = req.files.map((item) => {
    var desTemp = item.destination.split('/');
    var temp = {};
    temp['picPath'] = `/${desTemp[1]}/${desTemp[2]}/${item.originalname}`;
    temp['picLink'] = "";
    return temp;
  })
  docCommercial.countDocuments((err, number) => {
    if (err) {
      return next(err)
    };
    if (number == 0) {
      for (let i in picArray) {
        picArray[i]['pk'] = i;
      }
      docCommercial.create(picArray).then(() => {
        res.redirect('/index-edit');
      }).catch((error) => {
        console.log(error);
        return next(error);
      })
    } else {
      docCommercial.find().sort({
        pk: -1
      }).limit(1).exec((err, maxPkDoc) => {
        console.log(maxPkDoc);
        if (err) {
          return next(err)
        }
        for (let i in picArray) {
          picArray[i]['pk'] = i + maxPkDoc[0].pk + 1;
        }
        docCommercial.create(picArray, (err) => {
          if (err) {
            return next(err)
          };
          res.redirect('/index-edit');
        })
      })
    }
  })
})
router.get('/adpic/delete', checkUser.isAdmin, (req, res, next) => {
  if (req.query.pk) {
    docCommercial.findOneAndDelete({
      pk: req.query.pk
    }).exec((err, doc) => {
      if (err) return next(err);
      console.log(doc)
      fs.unlink(`./public${doc.picPath}`, (err) => {
        if (err) {
          return next(err)
        };
        res.redirect('/index-edit');
      })
    })
  } else {
    res.redirect('/index-edit');
  }
})
router.post('/adpic/editUrl', checkUser.isAdmin, (req, res, next) => {
  docCommercial.findOneAndUpdate({
    pk: req.body.pk
  }, {
    $set: {
      picLink: req.body.comPic
    }
  }, (err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/index-edit');
  })
})
router.get('/schedule/delete', (req, res, next) => {
  docNews.findOneAndDelete({
    pk: req.query.pk
  }, (err) => {
    if (err) {
      return next(err)
    }
    var resMes = {
      message: "Data deleted successfully!"
    }
    res.json(resMes)
  });
});
router.get('/schedule/read', (req, res, next) => {
  docNews.findOne({
    pk: req.query.pk
  }).exec((err, doc) => {
    console.log(doc)
    if (err) {
      return next(err)
    }
    res.json(doc)
  });
});

router.post('/schedule/:method', checkUser.isAdmin, (req, res, next) => {
  switch (req.params.method) {
    case "create":
      var temp = new docNews({
        title: req.body.title,
        date: new Date(`${req.body.time} GMT`),
        category: req.body.category,
        content: req.body.content
      });
      docNews.countDocuments((err, number) => {
        if (err) {
          return next(err)
        }
        if (number > 0) {
          docNews.find().sort({
            pk: -1
          }).limit(1).exec((err, doc) => {
            if (err) {
              return next(err)
            }
            temp.pk = doc[0].pk + 1;
            temp.save((err, doc) => {
              if (err) {
                return next(err)
              };
              var resMes = {
                message: "Data saved successfully!"
              }
              res.json(resMes)
            })
          })
        } else {
          temp.save((err, doc) => {
            if (err) {
              return next(err)
            };
            var resMes = {
              message: "Data saved successfully!"
            }
            res.json(resMes)
          })
        }
      })
      break;
    case "update":
      docNews.findOneAndUpdate({
        pk: req.body.pk
      }, {
        title: req.body.title,
        date: new Date(`${req.body.time} GMT`),
        category: req.body.category,
        content: req.body.content
      }).exec((err, doc) => {
        console.log(doc)
        if (err) {
          return next(err)
        }
        var resMes = {
          message: "Data changed successfully!"
        }
        res.json(resMes)
      })
      break;
    default:
      res.status(404).send('Wrong Page');
      break;
  }
})
router.get('/calender/read', (req, res, next) => {
  docCalender.findOne({
    pk: req.query.pk
  }, {
    _id: 0,
    __v: 0
  }).exec((err, doc) => {
    console.log(doc)
    if (err) {
      return next(err)
    }
    res.json(doc)
  })
});
router.get('/calender/delete', checkUser.isAdmin, (req, res, next) => {
  docCalender.findOneAndDelete({
    pk: req.query.pk
  }).exec((err, doc) => {
    if (err) {
      return next(err)
    }
    var resMes = {
      message: "Data deleted successfully!"
    }
    res.json(resMes);
  })
});

router.post('/calender/:method', checkUser.isAdmin, (req, res, next) => {
  switch (req.params.method) {
    case "create":
      var temp = new docCalender({
        month: req.body.month,
        date: req.body.date,
        board_content: req.body.boardContent
      });
      docCalender.countDocuments((err, number) => {
        if (err) {
          return next(err)
        }
        if (number > 0) {
          docCalender.find().sort({
            pk: -1
          }).limit(1).exec((err, doc) => {
            if (err) {
              return next(err)
            }
            temp.pk = doc[0].pk + 1;
            temp.save((err, doc) => {
              if (err) {
                return next(err)
              };
              var resMes = {
                message: "Data saved successfully!"
              }
              res.json(resMes);
            })
          })
        } else {
          temp.save((err, doc) => {
            if (err) {
              return next(err)
            };
            var resMes = {
              message: "Data saved successfully!"
            }
            res.json(resMes)
          })
        }
      })
      break;
    case "update":
      docCalender.findOneAndUpdate({
        pk: req.body.pk
      }, {
        month: req.body.month,
        date: req.body.date,
        board_content: req.body.boardContent
      }).exec((err, doc) => {
        if (err) {
          return next(err)
        }
        var resMes = {
          message: "Data edited successfully!"
        }
        res.json(resMes)
      })
      break;
    default:
      res.status(404).send('Wrong Page');
      break;
  }
});

router.post('/calender_get_data', function (req, res, next) {
  if (req.body.id == "aug") {
    docCalender.find({
      month: "8"
    }, function (err, obj) {
      obj = obj.sort(function (a, b) {
        if (a.month !== b.month) {
          return Number(a.month) > Number(b.month) ? 1 : -1;
        } else {
          return Number(a.date) > Number(b.date) ? 1 : -1;
        }
      });
      res.send(obj);
    });
  } else {
    docCalender.find({
      month: "9"
    }, function (err, obj) {
      obj = obj.sort(function (a, b) {
        if (a.month !== b.month) {
          return Number(a.month) > Number(b.month) ? 1 : -1;
        } else {
          return Number(a.date) > Number(b.date) ? 1 : -1;
        }
      });
      var spliceIdx = 0;
      for (var i in obj) {
        if (Number(obj[i].date) > 15) {
          spliceIdx = i;
          break;
        }
      }
      if (req.body.id == "sep1") {
        obj.splice(spliceIdx);
      } else {
        obj.splice(0, spliceIdx);
      }
      res.send(obj);
    });
  }
});

router.get('/comingsoon', function (req, res, next) {
  res.render('comingsoon/index', {
    title: '新生知訊網'
  });
});

router.get('/login', checkUser.isAllowtoLogin, function (req, res, next) {
  res.render('login/index', {
    title: '新生知訊網',
    user: req.user,
    error: req.flash('error')
  });
});

router.post('/login', checkUser.isAllowtoLogin, function (req, res, next) {
  let grade = req.body.id.substring(0, 3);
  if (grade !== '108')
    return res.redirect('auth/provider');
  Users.findOne({
    'id': req.body.id
  }, function (err, user) {
    if (err) res.redirect('/login');
    if (user && user.password)
      res.redirect('/password?id=' + req.body.id);
    else
      res.redirect('/register?id=' + req.body.id);
  })
});

router.get('/password', checkUser.isAllowtoLogin, function (req, res, next) {
  res.render('login/password', {
    title: '新生知訊網',
    user: req.user
  });
});

router.post('/password', checkUser.isAllowtoLogin, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', checkUser.isAllowtoLogin, function (req, res, next) {
  res.render('login/register', {
    title: '新生知訊網',
    user: req.user
  });
});

router.post('/register', checkUser.isAllowtoLogin, function (req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let password = req.body.password;
  let checkpassword = req.body.checkpassword;

  if ((id && name && password && checkpassword) && (password == checkpassword)) {
    Users.findOne({
      'id': id
    }, function (err, obj) {
      if (err) {
        res.redirect('/');
      }
      if (!obj) {
        console.log(id + ': 不存在於新生列表');
        req.flash('error', '如果多次登不進去請以email:ncufreshweb@gmail.com或fb粉專與我們聯絡會有專人負責處理');
        res.redirect('/login');
        return;
      }

      if (obj.name !== name) {
        console.log(id + ': 真實姓名不合');
        req.flash('error', '如果多次登不進去請以email:ncufreshweb@gmail.com或fb粉專與我們聯絡會有專人負責處理');
        res.redirect('/login');
      } else {
        obj.password = password;
        Users.createUser(obj, function (err, user, next) {
          if (err) {
            return next(err);
          } else {
            console.log(id + ': 建立');
            req.login(user, function (err) {
              if (err) {
                return next(err);
              }
              console.log(obj.id + ': 登入');
              res.redirect('/');
            });
          }
        });
      }
    });

  } else {
    res.redirect('/register');
  }

});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/auth/provider', checkUser.isAllowtoLogin, function (req, res, next) {
  var url = 'https://api.cc.ncu.edu.tw/oauth/oauth/authorize?response_type=code&scope=user.info.basic.read&client_id=' + CLIENT_ID;
  res.redirect(url);
});

router.get('/auth/provider/callback', function (req, res, next) {
  //Parse the callback query to get code which is required to exchanging access token
  url.parse(req.url, true);
  //If user decline the permissoion to read profile from NCU OAuth2,redirect to login page
  if (req.query.error || !req.query.code) {
    return res.redirect('/');
  }

  // Grab accessToken by exchanging code with NCU OAuth2
  request.post({
    url: 'https://api.cc.ncu.edu.tw/oauth/oauth/token',
    form: {
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET
    }
  }, function Callback(err, httpResponse, token) {
    if (err)
      return console.error('failed to grab accessToken:', err);
    if (!httpResponse.statusCode === 200) {
      console.log('https://api.cc.ncu.edu.tw/oauth/oauth/token response error!');
      return res.redirect('/login');
    }
    // accessToken
    obj = JSON.parse(token);

    //Grab personal info by the accessToken
    request({
      url: 'https://api.cc.ncu.edu.tw/personnel/v1/info',
      headers: {
        'Authorization': 'Bearer' + obj.access_token,
      }
    }, function Callback(err, httpResponse, info) {
      if (err)
        return console.error('failed to grab personal info:', err);
      if (!httpResponse.statusCode === 200) {
        console.log('https://api.cc.ncu.edu.tw/personnel/v1/info response error!');
        return res.redirect('/login');
      }
      // personal info
      personalObj = JSON.parse(info);

      if (!personalObj.id) {
        console.log(personalObj.id + ' is not allowed to login');
      }
      Users.findOne({
        'id': personalObj.id
      }, function (err, user) {
        if (err) next(err);
        // If found, login
        if (user) {
          req.login(user, function (err) {
            if (err) return next(err);
            console.log(user.id + "登入 via Oauth");
            res.redirect('/');
          });
        } else { // else, create user
          Users.createUser(new Users({
            id: personalObj.id,
            name: personalObj.name,
            unit: personalObj.unit,
          }), function (err, user) {
            if (err) return next(err);
            req.login(user, function (err) {
              if (err) return next(err);
              console.log(user.id + " 建立via OAuth");
              console.log(personalObj.id + " 登入via OAuth");
              res.redirect('/');
            });
          });
        }
      });
    });
  });
});

// router.get('/adduser', function (req, res, next) {
//   Users.createUser(new Users({
//     id: "108000022",
//     unit: "csie",
//     name: "eugene"
//   }), function (err, user) {
//     if (err) next(err);
//     res.redirect('/login');
//   });
// });

module.exports = router;