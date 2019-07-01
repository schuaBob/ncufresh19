var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/comingsoon', function (req, res, next) {
  res.render('comingsoon/index', {
    title: '新生知訊網',
    user: req.user
  });
});

module.exports = router;
