var express = require('express');
var router = express.Router();
var checkUser = require('./check-user');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});

var mongoose = require('mongoose');
var User = require('../models/index/user');
require('../models/qna/qna');
var Question = mongoose.model('qna');

var picname;

router.get('/', /*checkUser.isLoggedIn,*/ function(req, res, next) {

  /*res.locals.name = req.session.name;
  res.locals.id = req.session.id;
  res.locals.score_sum = req.session.score_sum;*/

  /*fs.access("public/personal/profile-photo/" + req.user.id + ".png", fs.constants.R_OK, (err) => {
    if(err) {
      picname = "default-profile.png";
    } else {
      picname = req.user.id + ".png";
    }
    Question.find({name: req.user.id}).exec(function(err, question) {
      if(err) {
        return next(err);
      }*/
        res.render('personal/index', {
          title: '個人專區',
          //question: question,
          user: req.user,
          picname: picname
        });
    /*});
  });*/
});

module.exports = router;