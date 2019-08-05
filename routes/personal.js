var express = require('express');
var router = express.Router();
var checkUser = require('./check-user');
var fs = require('fs');
var multer = require('multer');
var sharp = require('sharp');
sharp.cache(false);
var mongoose = require('mongoose');
var User = require('../models/index/user');
var Question = require('../models/qna/qna');



router.get('/', checkUser.isLoggedIn, function (req, res, next) {
  var userRank;
  var rankByScore;
  User.find({}).exec(function (err, scoreRank) {
    if (err) {
      return next(err);
    }
    rankByScore = scoreRank.sort(function (a, b) {
      return a.score_high < b.score_high ? 1 : -1;
    });
    /* 測試 */
    for (var a in rankByScore) {
      console.log(rankByScore[a].name);
    }
  });

  for (var i in rankByScore) {
    if (rankByScore[i].id == user.id) {
      userRank = i;
      /* 測試 */
      console.log(userRank);
    }
  }

  console.log(userRank);

  var picname;
  fs.access("public/personal/profile-photo/" + req.user.id + ".png", fs.constants.R_OK, (err) => {
    if (err) {
      picname = "default-profile.png";
    } else {
      picname = req.user.id + ".png";
    }
    Question.find({
      postID: req.user.id
    }).exec(function (err, question) {
      if (err) {
        return next(err);
      }
      res.render('personal/index', {
        title: '新生知訊網 | 個人專區',
        question: question,
        user: req.user,
        picname: picname,
        userRank: userRank,
        rankByScore: rankByScore
      });
    });
  });
});

var storage = multer.diskStorage({
  destination: "public/personal/profile-photo",
  filename: function (req, file, cb) {
    console.log(file.originalname);
    var fileName = req.user.id + ".png";
    User.update({
      id: req.user.id
    }, {
        $set: {
          avatar: fileName
        }
      }, function (err) {
        if (err) {
          return next(err);
        }
      });
    cb(null, fileName);
  }
});

var upload = multer({
  storage: storage
});

router.post('/editPicture', upload.single('picture'), function (req, res, next) {
  var fileName = "public/personal/profile-photo/" + req.user.id + ".png";
  console.log(req.user.id + " upload picture");
  fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
      console.log(
        `${fileName} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
      res.redirect('/personal');
    } else {
      console.log(`${fileName} exists, and it is writable`);
      sharp(fileName).resize({
        width: 800,
        height: 800,
        fit: sharp.fit.cover,
        position: 'centre'
      }).toFile("public/personal/profile-photo/" + req.user.id + "-new.png").then((info) => {
        console.log(info);
      }).catch((err) => {
        return next(err)
      }).finally(() => {
        fs.unlink(fileName, (err) => {
          if (err) {
            return next(err)
          };
          fs.rename("public/personal/profile-photo/" + req.user.id + "-new.png", fileName, function (err) {
            if (err) {
              return next(err);
            }
            console.log("Rename");
            res.redirect('/personal');
          });
        })
      });
    }
  });
});

router.get('/deleteQna/:id', checkUser.isLoggedIn, function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.redirect('/');
  }
  Question.findById(req.params.id).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (!result) {
      res.redirect('/');
    }
    if (result.authorID !== req.user.id) {
      res.redirect('/');
    }
    result.DeleteDate = Date.now();
    result.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});

module.exports = router;