var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about/index', { title: '新生知訊網 | 關於我們',user:req.user });
});

module.exports = router;
