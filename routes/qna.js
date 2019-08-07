var express = require('express');
var mongoose = require('mongoose');
var qnaDB = require('../models/qna/qna');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user && req.user.role==="admin"){
    qnaDB.find().sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
      if(err){
         res.render('qna/index', { title: '新生知訊網 | 新生問答',user:req.user });
         return err;
      }    
      res.render('qna/index', { title: '新生知訊網 | 新生問答',questions: result,user:req.user}); 
    });
  }else{
    qnaDB.find({reviewed:true}).sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
      if(err){
         res.render('qna/index', { title: '新生知訊網 | 新生問答',user:req.user });
         return err;
      }   
      res.render('qna/index', { title: '新生知訊網 | 新生問答',questions: result,user:req.user}); 
    });
  } 
});

router.get('/:category', function(req, res, next) {
  var category1;
  
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

    if(req.user && req.user.role==="admin"){
      qnaDB.find().sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
        if(err){
          res.render('qna/index', { title: '新生知訊網 | 新生問答',user:req.user });
          return err;
        }      
        res.render('qna/index', { title: '新生知訊網 | 新生問答',questions: result,user:req.user });          
      });
    }else{
      qnaDB.find({reviewed:true}).sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
        if(err){
          res.render('qna/index', { title: '新生知訊網 | 新生問答',user:req.user });
          return err;
        }      
        res.render('qna/index', { title: '新生知訊網 | 新生問答',questions: result,user:req.user });          
      });
    }    
  }else{
    if(req.user && req.user.role==="admin"){
      qnaDB.find({category:category1}).sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
        if(err){
          res.render('qna/index', { title: '新生知訊網 | 新生問答',user:req.user });
          return err;
        }
        res.render('qna/index', { title: '新生知訊網 | 新生問答',questions: result,user:req.user });    
      });
    }else{
      qnaDB.find({category:category1,reviewed:true}).sort({"_id":-1,"count":-1}).skip(0).limit(12).exec(function(err,result){
        if(err){
          res.render('qna/index', { title: '新生知訊網 | 新生問答',user:req.user });
          return err;
        }
        res.render('qna/index', { title: '新生知訊網 | 新生問答',questions: result,user:req.user });    
      });
    }    
  }  
});






router.post('/toPost',function(req,res){ 
  if(!req.user||(req.user.id && req.user.name)||req.user.role==="admin"){
    new qnaDB({
      authorID:(req.user && req.user.id) ? req.user.id : "anonymous", 
      postID:getPostID(),
      title:req.body.title,
      qContent:req.body.question,     
    }).save(function(err){
      if(err){
        return err;
      }           
      res.send(['success']);
    });
  }    
});
router.post('/search',function(req,res){
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
  var sorter;
  if(req.body.sort == "count"){
    sorter={"count":-1,"_id":-1};
  }else{
    sorter={"_id":-1,"count":-1};
  }
  var rowCount = parseInt(req.body.rowCount); 
  var rgx = new RegExp(".*"+ req.body.searchText +".*", "i");    
  if(category1==""){
    if(req.user && req.user.role==="admin"){
      qnaDB.find({$or:[{title:{$regex:rgx}},{qContent:{$regex:rgx}},{aContent:{$regex:rgx}}]}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
        if(err){
          return err;
        }    
        res.send(result);    
      });
    }else{
      qnaDB.find({$or:[{title:{$regex:rgx}},{qContent:{$regex:rgx}},{aContent:{$regex:rgx}}],reviewed:true}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
        if(err){
          return err;
        }    
        res.send(result);    
      });
    }
      
  }else{
    qnaDB.find({$and:[{$or:[{title:{$regex:rgx}},{qContent:{$regex:rgx}},{aContent:{$regex:rgx}}]},{category:category1}]}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
      if(err){
        return err;
      }    
      res.send(result);    
    });  
  }
  
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
  
  if(category1==""){
    if(req.user && req.user.role==="admin"){
      //從第幾列開始之後加載10個問題
      qnaDB.find().sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
        if(err){
          return err;
        }      
        res.send(result);
      });
    }else{
      qnaDB.find({reviewed:true}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
        if(err){
          return err;
        }      
        res.send(result);
      });
    }    
  }else{
    if(req.user && req.user.role==="admin"){
      qnaDB.find({category:category1}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
        if(err){
          return err;
        }      
        res.send(result);
      });
    }else{
      qnaDB.find({category:category1,reviewed:true}).sort(sorter).skip(rowCount).limit(12).exec(function(err,result){
        if(err){
          return err;
        }      
        res.send(result);
      });
    }    
  }
  
});
router.post("/getQuestion",function(req,res){
  qnaDB.find({postID:req.body.postID}).exec(function(err,result){
    if(err){
      return err;
    }    
    qnaDB.updateOne({postID:req.body.postID},{$inc:{count:1}},function(err,result){
      if(err){
        return err;
      } 
    });       
    res.send(result); 
  });    
});
router.post("/toModify",function(req,res){
  //判斷是否登入
  qnaDB.updateOne({postID:req.body.postID},{category:req.body.category,aContent:req.body.content,reviewed:req.body.reviewed},function(err,result){
    if(err){
      return err;
    }
    res.send({"result":"success"});
  });
});
router.post("/toDelete",function(req,res){
  qnaDB.deleteOne({postID:req.body.postID},function(err,result){
    if(err){
      return err;
    }
    res.send({"result":"success"});    
  });
});
function getPostID(){  
  var date = new Date();   
  return (date.getYear()-100)+""+(date.getMonth()+1)+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
}


module.exports = router;
