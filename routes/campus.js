var express = require('express');
var request = require('request');
var router = express.Router();

var content = "";

request('http://localhost:3000/campus/%E5%85%A7%E5%AE%B9.json', function (error, response, body) {
  content = JSON.parse(body);
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/campus/3D');
});

router.get('/3D', function (req, res, next) {
  res.render('campus/3D', {
    title: '新生知訊網 | 校園地圖',
    user: req.user
  });
});

router.get('/2D', function (req, res, next) {
  res.render('campus/2D', {
    title: '新生知訊網 | 校園地圖',
    user: req.user
  });
});

router.get('/indexmodal', function (req, res, next) {
  if (req.query.id == "1561981206193") {
    var review = {
      'Intropic': ['20190711133634.jpg'],
      'Element_Name': '大型力學實驗館'
    };
    if (content[review.Element_Name]) {
      review.Element_Intro = content[review.Element_Name];
    }
    res.json(review);
  } else request('https://ncufresh18.ncu.edu.tw/campus/indexmodal?id=' + req.query.id, function (error, response, body) {
    console.log('body:', JSON.parse(body));
    var review = JSON.parse(body);
    if (review.Intropic.includes('5b6663bab8580a33b29b406d.png')){
      review.Intropic = ['5b6663bab8580a33b29b406d-1.png','5b6663bab8580a33b29b406d-2.png'];
    }
    if (review.Intropic.includes('5b680145a1290417d991cb0d.png')){
      review.Intropic = ['5b680145a1290417d991cb0d-1.png','5b680145a1290417d991cb0d-2.png'];
    }
    if (review.Element_Name == "工程三館"){
      review.Element_Name = "E2 機械館";
    }
    if (review.Element_Name == "工程四館"){
      review.Element_Name = "E4 環工化工館大樓";
    }
    if (review.Element_Name == "宿舍服務中心"){
      review.Element_Name = "住宿服務組";
    }
    if (content[review.Element_Name]) {
      review.Element_Intro = content[review.Element_Name];
    }
    console.log('body:', review);
    res.json(review);
  });
});

module.exports = router;