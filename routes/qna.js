var express = require('express');
var mongoose = require('mongoose');
var qnaDB = require('../models/qna/qna');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  qnaDB.find().limit(12).skip(0).exec(function(err,result){
  if(err){
     res.render('qna/index', { title: 'Express' });
     return err;
  }      
  res.render('qna/index', { questions: result });
  });
  // res.render('qna/index', { title: 'Express' });
});

router.get('/:category', function(req, res, next) {
  var category1;
  // console.log(req.params('category'));
  switch(req.params.category){
    case "life":
      category1="校園生活";
      break;
    case "course":
      category1="課程相關";
      break;
    case "affair":
      category1="學生事務";
      break;
    case "other":
      category1="其他";
      break;
    default:
      category1="";
  }
  
  if(category1==""){
    qnaDB.find({}).limit(12).skip(0).exec(function(err,result){
      if(err){
        res.render('qna/index', { title: 'Express' });
        return err;
      }      
      res.render('qna/index', { questions: result });          
    });
  }else{
    qnaDB.find({category:category1}).limit(12).skip(0).exec(function(err,result){
      if(err){
        res.render('qna/index', { title: 'Express' });
        return err;
      }
      res.render('qna/index', { questions: result });    
    });
  }  
});






router.post('/toPost',function(req,res){ 
  
  var count;
  //先db有多少個問題，以製造流水號
  qnaDB.find().exec(function(err,result){
    count=result.length;
  });
  console.log(count);
  //判斷是否登入  
  new qnaDB({
    postID:1,
    category:req.body.category,
    title:req.body.title,
    qContent:req.body.question,     
  }).save(function(err){
    if(err){
      return console.log(err);
    }           
    res.json(['success', req.body.category]);
  });
  
});
router.post('/getData',function(req,res){

  var _category;
  if(req.body.category=='all'){
    _category = "";
  }else{
    _category= req.body.category;
  }   
  var rowCount = parseInt(req.body.rowCount); 

  //從第幾列開始之後加載10個問題
  qnaDB.find().limit(4).skip(rowCount).exec(function(err,result){
    if(err){
      return err;
    }
    // console.log(result);
    res.send(result);
  });
});
module.exports = router;
