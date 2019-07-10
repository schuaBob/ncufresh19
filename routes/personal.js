var express = require('express');
var router = express.Router();
var checkUser = require('./check-user');

router.get('/', /*checkUser.isLoggedIn,*/ function(req, res, next) {
  res.render('personal/index', { title: '個人專區' });
});

module.exports = router;
