var express = require('express');
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

module.exports = router;
