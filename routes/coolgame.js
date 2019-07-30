var express = require('express');
var router = express.Router();
var fs = require('fs');
var User = require('../models/index/user.js');
var Question = require("../models/coolgame/question.js");
var checkUser = require('./check-user');
/* GET home page. */
router.get('/', checkUser.isLoggedIn, function (req, res, next) {
  res.render('coolgame/index', { title: '新生資訊網 | 小遊戲', user: req.user });
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
router.get('/getquestion', function (req, res, next) {
  Question.find({}).exec(function (err, result){
    res.send({result:result,user:req.user});
  });
});
router.get('/gettotalrank', function (req, res, next) {
  User.find({}).sort({score_sum:-1}).limit(10).exec(function (err, result){
    res.send(result);
  });
});
router.get('/gethighrank', function (req, res, next) {
  User.find({}).sort({score_high:-1}).limit(10).exec(function (err, result){
    res.send(result);
  });
});
router.post('/updatescore', function (req, res, next) {
 // if(req.body.key == req.body['user[_id]']){
   console.log(req.session);
    User.findOne({'_id':req.user._id}).exec(function(err,result){
      if(result.score_high <　req.body.score){
        result.set({'score_sum':parseInt(result.score_sum, 10)+parseInt(req.body.score, 10),'score_high':parseInt(req.body.score, 10)});
      }
      else{
        result.set('score_sum',parseInt(result.score_sum, 10)+parseInt(req.body.score, 10));
      }
      
      result.save(function(err){
        if (err) return next(err);
      })
    })
    res.send("");
  //}
});
module.exports = router;
