var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區 | 新生知訊網' });
});

/** 中大生活 */
router.get('/v_nculife', function(req, res, next) {
  res.render('video/v_nculife', { title: '影音專區 | 新生知訊網' });
});

/** 中大生活底下 */
router.get('/v_nculife/:id', function(req, res, next) {
  if(req.params.id === "v_eating") {
    res.render('video/video_model', { title: '食 | 新生知訊網' });
  } else if(req.params.id === "v_living"){
    res.render('video/video_model', { title: '住 | 新生知訊網' });
  }else if (req.params.id === "") {
    res.render('video/v_nculife', { title: '影音專區 | 新生知訊網' });
  } else {
    res.status(404)
    res.end();
  }
});

router.get('/v_interview', function(req, res, next) {
  res.render('video/v_interview', { title: '影音專區 | 新生知訊網' });
});

router.get('/v_legend', function(req, res, next) {
  res.render('video/v_legend', { title: '影音專區 | 新生知訊網' });
});

router.get('/v_eating', function(req, res, next) {
  res.render('video/v_eating', { title: '影音專區 | 新生知訊網' });
});

// router.get('/v_nculife/:v_button', function(req, res, next) {
//   if (req.params.v_button == eating) {
//     res.render('video/video_model'); 
//   }
// });

module.exports = router;

//res.render('video/', {id: res.params.id}, { title: '影音專區 | 新生知訊網' });