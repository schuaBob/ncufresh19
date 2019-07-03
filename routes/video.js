var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '影音專區 | 新生知訊網' });
});

router.get('/v_nculife', function(req, res, next) {
  res.render('video/v_nculife', { title: '影音專區 | 新生知訊網' });
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

module.exports = router;
