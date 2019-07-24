var express = require('express');
var router = express.Router();
var checkUser = require('./check-user');
var fs = require('fs');
var multer = require('multer');
var gm = require('gm').subClass({imageMagick: true});

var mongoose = require('mongoose');
var User = require('../models/index/user');
require('../models/qna/qna');
var Question = mongoose.model('qna');

var picname;

router.get('/', checkUser.isLoggedIn, function(req, res, next) {

  fs.access("public/personal/profile-photo/" + req.user.id + ".png", fs.constants.R_OK, (err) => {
    if(err) {
      picname = "default-profile.png";
    } else {
      picname = req.user.id + ".png";
    }
    Question.find({name: req.user.id}).exec(function(err, question) {
      if(err) {
        return next(err);
      }
        res.render('personal/index', {
          title: '個人專區',
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



module.exports = router;