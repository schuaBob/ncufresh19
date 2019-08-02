var express = require('express');
var router = express.Router();
var checkUser = require('./check-user');
var fs = require('fs');
var multer = require('multer');
//var gm = require('gm').subClass({imageMagick: true});
var sharp = require('sharp');

var mongoose = require('mongoose');
var User = require('../models/index/user');
var Question = require('../models/qna/qna');

router.get('/', checkUser.isLoggedIn, function(req, res, next) {

  var picname;

  fs.access("public/personal/profile-photo/" + req.user.id + ".png", fs.constants.R_OK, (err) => {
    if(err) {
      picname = "default-profile.png";
    } else {
      picname = req.user.id + ".png";
    }
    Question.find({postID: req.user.id}).exec(function(err, question) {
      if(err) {
        return next(err);
      }
        res.render('personal/index', {
          title: '新生知訊網 | 個人專區',
          question: question,
          user: req.user,
          picname: picname
        });
    });
  });
});

var storage = multer.diskStorage({
  destination: "public/personal/profile-photo",
  filename: function(req, file, cb) {
    var fileName = req.user.id + ".png";
    User.update({id: req.user.id}, {$set: {profile_pic: fileName}}, function(err, result) {
      if(err) {
        return next(err);
      }
    });
    cb(null, fileName);
  }
});

var upload = multer({storage: storage});

router.post('/editPicture', upload.single('picture'), function(req, res, next) {
  var fileName = "public/personal/profile-photo/" + req.user.id + ".png";
  
  console.log(req.user.id + " upload picture");
  fs.access(fileName, fs.constants.R_OK, (err) => {
    if(err) {
      return next(err);
    } else {
      sharp(fileName).resize(200, 200, {
        fit: 'outside',
        position: 'center'
      }).toFile("public/personal/profile-photo/" + req.user.id + "-new.png", function(err) {
        if(err) {
          return err;
        }
        console.log("Resize");
      });

      fs.rename("public/personal/profile-photo/" + req.user.id + "-new.png", fileName, function(err) {
        if(err) { return err; }
        console.log("Rename");
        return;
      });
    }

  });
  res.redirect('/personal');
});

router.get('/deleteQna/:id', checkUser.isLoggedIn, function(req, res, next) {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.redirect('/');
  }
  Question.findById(req.params.id).exec(function(err, result) {
    if(err) {
      return next(err);
    }
    if(!result) {
      res.redirect('/');
    }
    if(result.authorID !== req.user.id) {
      res.redirect('/');
    }
    result.DeleteDate = Date.now();
    result.save(function(err) {
      if(err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
});

module.exports = router;