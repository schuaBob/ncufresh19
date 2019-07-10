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
router.get('/undergraduate_must', function(req, res, next) {
  Document.findOne({count: 1}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/undergraduate_must',{ title: 'undergraduate',data: data });
  });
  
});

router.get('/undergraduate_fresh', function(req, res, next) {
  Document.findOne({count: 8}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/undergraduate_fresh',{ title: 'undergraduate',data: data });
  });
});

router.get('/undergraduate_study', function(req, res, next) {
  Document.findOne({count: 15}).exec(function(err, data){
    if(err) return next(err);
      res.render('documents/undergraduate_study',{ title: 'undergraduate',data: data });
  });
});

//研究生
router.get('/graduate_must', function(req, res, next) {
  Document.findOne({count: 22}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/graduate_must',{ title: 'graduate',data: data });
  });
});

router.get('/graduate_fresh', function(req, res, next) {
  Document.findOne({count: 29}).exec(function(err, data){
    if(err) return next(err);
    
    res.render('documents/graduate_fresh',{ title: 'graduate',data: data });
  });
});

//共同事項
router.get('/common', function(req, res, next) {
  Document.findOne({count: 31}).exec(function(err, data){
    if(err) return next(err);
    res.render('documents/common',{ title: 'common',data: data });
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
