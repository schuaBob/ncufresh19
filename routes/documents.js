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
  res.render('documents/undergraduate_must',{ title: 'undergraduate' });
});

router.get('/undergraduate_fresh', function(req, res, next) {
  res.render('documents/undergraduate_fresh',{ title: 'undergraduate' });
});

router.get('/undergraduate_study', function(req, res, next) {
  res.render('documents/undergraduate_study',{ title: 'undergraduate' });
});

//研究生
router.get('/graduate_must', function(req, res, next) {
  res.render('documents/graduate_must',{ title: 'graduate' });
});

router.get('/graduate_fresh', function(req, res, next) {
  res.render('documents/graduate_fresh',{ title: 'graduate' });
});

//共同事項
router.get('/common', function(req, res, next) {
  res.render('documents/common',{ title: 'common' });
});

//資料庫
router.post('/edit/:id',function(req, res, next) {
  Document.updateOne({ count: req.params.id}, {title: req.body.title, content: req.body.add_text},
    function (err, result){
        console.log("edit");
        console.log(req.params.id);
        console.log(req.body.title);
        console.log(req.body.add_text);
        //console.log(result);
        if(err){
          console.log(req.user.id+' failed to update article: '+req.body.title);
          console.log(req.user.id+' update article: '+req.body.title);
        }
        return res.redirect('/documents');
    });

})

router.get('/require_data/:id',function(req, res, next){
    Document.findone({count: req.params.id}).exec(function(err, data){
        console.log("require");
        if(err) return next(err);
        res.send(data);
    })
})


module.exports = router;
