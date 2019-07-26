var express = require('express');
var router = express.Router();
var fs = require('fs');
var Question = require("../models/coolgame/question.js");
/* GET home page. */
router.get('/', function (req, res, next) {
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
module.exports = router;
