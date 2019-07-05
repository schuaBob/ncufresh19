var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  var id = session.id;
  res.render('login/index', { title: 'Express', id: id});
});

module.exports = router;
