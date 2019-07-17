var express = require('express');
var router = express.Router();

var video = require('../models/video/video');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區 | 新生知訊網' });
});

/** 中大生活 */
router.get('/v_nculife', function(req, res, next) {
  var title_bar = [];
  res.render('video/v_nculife', { title: '中大生活 | 新生知訊網',
  title_bar:['LIFE','中大生活'] });
});

/** 中大生活底下 */
router.get('/v_nculife/:id', function(req, res, next) {
  var title_bar = [];
  var ytID;
  if(req.params.id === "v_eating") {
    res.render('video/video_model', { title: '食 | 新生知訊網',
    title_bar: ['LIFE','中大生活','EATING','食'],
    ytID: 'B_8YrtgyC5o' });
  }else if(req.params.id === "v_living"){
    res.render('video/video_model', { title: '住 | 新生知訊網',
    title_bar: ['LIFE','中大生活','LIVING','住'],
    ytID: 'lPSmlyn0PN0' });
  }else if(req.params.id === "v_going"){
    res.render('video/video_model', { title: '行 | 新生知訊網',
    title_bar: ['LIFE','中大生活','GOING','行'],
    ytID: '7g_zGtH13LY' });
  }else if(req.params.id === "v_education"){
    res.render('video/video_model', { title: '育 | 新生知訊網',
    title_bar: ['LIFE','中大生活','EDUCATION','育'],
    ytID: 'x06EbxjJAcw' });
  }else if(req.params.id === "v_joy"){
    res.render('video/video_model', { title: '樂 | 新生知訊網',
    title_bar: ['LIFE','中大生活','JOY','樂'],
    ytID: 'BYjcSDKP1LY' });
  }else if (req.params.id === "") {
    res.render('video/v_nculife', { title: '影音專區 | 新生知訊網' });
  }else {
    res.status(404)
    res.end();
  }
});

/** 學長姐訪談 */
router.get('/v_interview', function(req, res, next) {
  var title_bar = [];
  res.render('video/v_interview', { title: '學長姐訪談 | 新生知訊網',
  title_bar:['INTERVIEW','學長姐訪談'] });
});

/** 學長姐訪談底下 */
router.get('/v_interview/:id', function(req, res, next) {
  var title_bar = [];
  if(req.params.id === "v_engineering") {
    res.render('video/v_college', { title: '工學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','ENGINEERING', '工學院' ]});
  }else if (req.params.id === "v_liberal") {
    res.render('video/v_college', { title: '文學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','LIBERAL ARTS', '文學院' ]});
  }else if (req.params.id === "v_health") {
    res.render('video/v_college', { title: '生醫理工學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','HEALYH SCIENCES & TECHNOLOGY', '生醫理工學院' ]});
  }else if (req.params.id === "v_earth") {
    res.render('video/v_college', { title: '地球科學學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','EARTH SCIENCES', '地球科學學院' ]});
  }else if (req.params.id === "v_hakka") {
    res.render('video/v_college', { title: '客家學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','HAKKA STUDIES', '客家學院' ]});
  }else if (req.params.id === "v_science") {
    res.render('video/v_college', { title: '理學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','SCIENCE', '理學院' ]});
  }else if (req.params.id === "v_computer") {
    res.render('video/v_college', { title: '資訊電機學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','ENGINEERING & COMPUTER SCIENCE', '資訊電機學院' ]});
  }else if (req.params.id === "v_management") {
    res.render('video/v_college', { title: '管理學院 | 新生知訊網',
    title_bar: ['INTERVIEW','學長姐訪談','MANAGEMENT', '管理學院' ]});
  }else {
    res.status(404)
    res.end();
  }
})

/** 中大傳說 */
router.get('/v_legend', function(req, res, next) {
  var title_bar = [];
  res.render('video/v_legend', { title: '中大傳說 | 新生知訊網',
  title_bar: ['LEGEND','中大傳說'] });
});


module.exports = router;