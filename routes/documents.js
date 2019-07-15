var express = require('express');

var mongoose = require('mongoose');
var Document = require('../models/documents/documents');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('documents/index', { title: 'Express' });
});

router.get('/documents', function(req, res, next) {
  res.render('documents/index', { title: 'Express' });
});

//大學生
router.get('/undergraduate_must/:id', function(req, res, next) {
  Document.findOne({count: req.params.id}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/und_must_content',{ title: 'undergraduate',data: data });
  });
});


router.get('/undergraduate_fresh/:id', function(req, res, next) {
  Document.findOne({count: req.params.id}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/und_fresh_content',{ title: 'undergraduate',data: data });
  });
});

router.get('/undergraduate_study/:id', function(req, res, next) {
  Document.findOne({count: req.params.id}).exec(function(err, data){
    if(err) return next(err);
      res.render('documents/und_study_content',{ title: 'undergraduate',data: data });
  });
});

//研究生
router.get('/graduate_must/:id', function(req, res, next) {
  Document.findOne({count: req.params.id}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/gra_must_content',{ title: 'graduate',data: data });
  });
});

router.get('/graduate_fresh/:id', function(req, res, next) {
  Document.findOne({count: req.params.id}).exec(function(err, data){
    if(err) return next(err);
    
    res.render('documents/gra_fresh_content',{ title: 'graduate',data: data });
  });
});

//共同事項
router.get('/common/:id', function(req, res, next) {
  Document.findOne({count: req.params.id}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/com_content',{ title: 'common',data: data });
  });
});

/*---------------------------後台-------------------------------------*/

//新增
router.post('/edit',function(req, res, next) {
  var newDocument = new Document({
      count: req.body.id,
      title: req.body.title,
      content: req.body.add_text
  }).save(function(err) {
      if(err){
        return next(err);
      }
      else{
        console.log("success");
      }
      res.redirect('back');
  })
})


//修改
router.post('/modify/:id',function(req, res, next) {
  Document.updateOne({ count: req.params.id}, {title: req.body.change_title, content: req.body.change_text},
    function (err, result){
        if(err){
          console.log(req.user.id+' failed to update article: '+req.body.change_title);
          console.log(req.user.id+' update article: '+req.body.change_title);
        }
        res.redirect('back');
    });

})

//取資料
router.get('/require_data/:id',function(req, res, next){
    Document.findOne({count: req.params.id}).exec(function(err, data){
        if(err) return next(err);
        res.send(data);
    })
})


module.exports = router;
