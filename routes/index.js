var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination:'public/分頁資料夾',
  filename(req, file, callback) {
    cb(null,"檔名自己取");
  }
})
var upload = multer({storage:storage});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
