var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../models/index/user.js');
var Question = require("../models/coolgame/question.js");
var checkUser = require('./check-user');
var play_id_list = new Array();
function getrandom(x) {
  return Math.floor(Math.random() * x);
}
/* GET home page. */
router.get('/', checkUser.isLoggedIn, function (req, res, next) {
  res.render('coolgame/index', { title: '新生知訊網 | 小遊戲', user: req.user });
});
router.get('/startgame', function (req, res, next) {
  var game_id =getrandom(100000);
  User.findOne({'_id':req.user._id}).exec(function(err,result){
    result.set({game_id:game_id,game_date:new Date()})
    result.save(function(err){
      if (err) return next(err);
    })
  });
  console.log(game_id);
  res.send({game_id:game_id});
});
// router.get('/addquestion', function(req, res, next) {

//   fs.readFile("C:\\Users\\Joey\\Desktop\\Level_3.txt", 'utf-8',(err, data) => { 
//     if (err) throw err; 
//     var question_list = data.split("\r\n");
//     for(var i=0;i<question_list.length;i++){
//       var question_index_list =  question_list[i].split('/ ');
//       var Ques = new Question({
//         Q:question_index_list[0],
//         Op:question_index_list[1],
//         Ans:question_index_list[2],
//         Type:0
//       }).save();
//       console.log(Ques);
//     }
// }) ;
//   res.render('coolgame/index', { title: '小遊戲' ,user:req.user});
// });
router.get('/getuser', function (req, res, next) {
  User.findOne({_id:req.user._id}).exec(function (err, result){
    res.send({user:result});
  });
});
router.get('/getquestion', function (req, res, next) {
  Question.find({}).exec(function (err, result){
    res.send({result:result});
  });
});
router.get('/gettotalrank', function (req, res, next) {
  User.find({},{name:1,avatar:1,score_sum:1}).sort({score_sum:-1}).limit(10).exec(function (err, result){
    res.send(result);
  });
});
router.get('/gethighrank', function (req, res, next) {
  User.find({},{name:1,avatar:1,score_high:1}).sort({score_high:-1}).limit(10).exec(function (err, result){
    res.send(result);
  });
});
router.get('/usergameinit',function(req,res,next){
  User.findOne({'_id':req.user._id}).exec(function(err,result){
      result.set({'game_id':"",'game_date':null});
      result.save(function(err){
        if (err) return next(err);
      })
  })
  res.send("");
})
router.post('/updatescore', function (req, res, next) {
 // if(req.body.key == req.body['user[_id]']){
   console.log(req.body.game_id);
    User.findOne({'_id':req.user._id}).exec(function(err,result){
      console.log(((new Date())- result.game_date)/1000);
      if(req.body.game_id == result.game_id &&( (new Date())- result.game_date)/1000>54 && ( (new Date())- result.game_date)/1000<900){
        if(result.score_high <　req.body.score){
          result.set({'score_sum':parseInt(result.score_sum, 10)+parseInt(req.body.score, 10),'score_high':parseInt(req.body.score, 10)});
        }
        else{
          result.set({'score_sum':(parseInt(result.score_sum, 10)+parseInt(req.body.score, 10))});
        }
        result.save(function(err){
          if (err) return next(err);
        })
      }
    })
    res.redirect('usergameinit');
    //res.send("");
  //}
});
module.exports = router;
