var express = require('express');
var router = express.Router();

var video = require('../models/video/video');

/* GET home page. */
router.get('/', function(req, res, next) {
  var nameArray = [1,2,3,4,5,6,7];
  res.render('video/index', { title: '影音專區 | 新生知訊網'});
});

/** 中大生活 */
router.get('/v_nculife', function(req, res, next) {
  res.render('video/v_nculife', { title: '影音專區 | 新生知訊網' });
});

/** 中大生活底下 */
router.get('/v_nculife/:id', function(req, res, next) {
  var smalltitle;
  var engtitle;
  if(req.params.id === "v_eating") {
    res.render('video/video_model', { title: '食 | 新生知訊網', engtitle: 'EATING', smalltitle: '食' });
  }else if(req.params.id === "v_living"){
    res.render('video/video_model', { title: '住 | 新生知訊網', engtitle: 'LIVING', smalltitle: '住' });
  }else if(req.params.id === "v_going"){
    res.render('video/video_model', { title: '行 | 新生知訊網', engtitle: 'GOING??', smalltitle: '行' });
  }else if(req.params.id === "v_education"){
    res.render('video/video_model', { title: '育 | 新生知訊網', engtitle: 'EDUCATION?', smalltitle: '育' });
  }else if(req.params.id === "v_joy"){
    res.render('video/video_model', { title: '樂 | 新生知訊網', engtitle: 'JOY?', smalltitle: '樂' });
  }else if (req.params.id === "") {
    res.render('video/v_nculife', { title: '影音專區 | 新生知訊網' });
  } else {
    res.status(404)
    res.end();
  }
});

/** 學長姐訪談 */
router.get('/v_interview', function(req, res, next) {
  res.render('video/v_interview', { title: '影音專區 | 新生知訊網' });
});

/** 學長姐訪談底下 */
router.get('/v_interview/:id', function(req, res, next) {
  var title_bar = [];
  if(req.params.id === "v_engineering") {
    res.render('video/v_college', { title: '工學院 | 新生知訊網', title_bar: ['INTERVIEW','學長姐訪談','ENGINEERING', '工學院']})
  }
})

/** 中大傳說 */
router.get('/v_legend', function(req, res, next) {
  res.render('video/v_legend', { title: '影音專區 | 新生知訊網' });
});



//之前寫的個別路由
//router.get('/v_eating', function(req, res, next) {
//  res.render('video/v_eating', { title: '影音專區 | 新生知訊網' });
//});


module.exports = router;