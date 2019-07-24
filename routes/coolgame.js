var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('coolgame/index', { title: '小遊戲' ,user:req.user});
});

module.exports = router;
