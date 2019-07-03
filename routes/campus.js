var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('campus/index', {
    title: '校園地圖'
  });
});

/* GET home page. */
router.get('/indexmodal', function (req, res, next) {
  request('https://ncufresh18.ncu.edu.tw/campus/indexmodal?id='+req.query.id, function (error, response, body) {
    console.log('body:', JSON.parse(body)); 
    res.json(JSON.parse(body));
  });
});

module.exports = router;