var express = require('express');
var mongoose = require('mongoose');
var qnaDB = require('../models/qna/qna');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  qnaDB.find().sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
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
    qnaDB.find().sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
      if(err){
        res.render('qna/index', { title: 'Express' });
        return err;
      }      
      res.render('qna/index', { questions: result });          
    });
  }else{
    qnaDB.find({category:category1}).sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
      if(err){
        res.render('qna/index', { title: 'Express' });
        return err;
      }
      res.render('qna/index', { questions: result });    
    });
  }  
});






router.post('/toPost',function(req,res){ 
   
  //判斷是否登入  
  new qnaDB({
    postID:getPostID(),
    category:req.body.category,
    title:req.body.title,
    qContent:req.body.question,     
  }).save(function(err){
    if(err){
      return err;
    }           
    res.send(['success']);
  });
  
});
router.post('/search',function(req,res){
  var rgx = new RegExp(".*"+ req.body.searchText +".*", "i");
  qnaDB.find({$or:[{title:{$regex:rgx}},{qContent:{$regex:rgx}},{aContent:{$regex:rgx}}]}).exec(function(err,result){
    if(err){
      return err;
    }
    console.log(result);
    res.send(result);    
  });  
  
});
router.post('/getData',function(req,res){
  var category1;
  switch(req.body.category){
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
  var rowCount = parseInt(req.body.rowCount); 
  var sorter;
  if(req.body.sort == "count"){
    sorter={"count":-1,"_id":-1};
  }else{
    sorter={"_id":-1,"count":-1};
  }
  
  console.log(sorter);
  if(category1==""){
    //從第幾列開始之後加載10個問題
    qnaDB.find().sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
      if(err){
        return err;
      }
      // console.log(result);
      res.send(result);
    });
  }else{
    qnaDB.find({category:category1}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
      if(err){
        return err;
      }
      // console.log(result);
      res.send(result);
    });
  }
  
});
router.post("/getQuestion",function(req,res){
  qnaDB.find({postID:req.body.postID}).exec(function(err,result){
    if(err){
      return err;
    }    
    qnaDB.updateOne({postID:req.body.postID},{$inc:{count:1}},function(err,result){
      res.send(result);
    });        
  });  
  
});

function getPostID(){  
  var date = new Date();   
  return (date.getYear()-100)+""+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
}


module.exports = router;
