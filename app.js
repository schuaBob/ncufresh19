var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var app = express();

// other middleware
var compression = require('compression');
var minify = require('express-minify');
var helmet = require('helmet');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

// cache views
app.set('view cache', false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser('NcuFresh19'));
app.use(express.static(path.join(__dirname, 'public')));

// mongoose
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/ncufresh19', {
  useNewUrlParser: true
});

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(minify());
app.use(helmet());
app.use(flash());
app.use(session({
  secret: 'ThisIsNcuFresh19Speaking.',
  name: 'ncufresh.session.id',
  resave: false,
  /* 不要每次讀取就存回去一次 */
  saveUninitialized: false,
  /* 除非做儲存的動作，不然不要為每個使用者都存session */
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600 /* 沒動session的話，二十四小時之後再去動它 */
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// strict router  
var router = express.Router({ strict: true });
router.all('*');

// Pages
var index = require('./routes/index');
var documents = require('./routes/documents');
var coolgame = require('./routes/coolgame');
var video = require('./routes/video');
var qna = require('./routes/qna');
var about = require('./routes/about');
var campus = require('./routes/campus');
var life = require('./routes/life');
var groups = require('./routes/groups');
var personal = require('./routes/personal');
var link = require('./routes/link');
var userMiddleWare = require('./routes/check-user');

// 首頁
app.use('/', index);
// 新生必讀
app.use('/documents', documents);
// 小遊戲
app.use('/coolgame', coolgame);
// 影音專區
app.use('/video', video);
// 新生Q&A
app.use('/qna', qna);
// 關於我們
app.use('/about', about);
// 校園地圖
app.use('/campus', campus);
// 中大生活
app.use('/life', life);
// 系所社團
app.use('/groups', groups);
// 個人專區
app.use('/personal', personal);
// 常用連結
app.use('/link', link);

//multer settings
var multer = require('multer');
var multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/public/imguploads`);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
})

app.post('/tinymceUploader', multerUpload.single('file'), (req, res, next) => {
  console.log(req.file)
  res.json({ location: `/imguploads/${req.file.originalname}` })
})

//css and js
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/fullpage.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/fullpage.js/vendors'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/js', express.static(__dirname + '/node_modules/build'));
app.use('/js', express.static(__dirname + '/node_modules/velocity-animate'));
app.use('/js', express.static(__dirname + '/node_modules/tinymce/js/tinymce'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/fullpage.js/dist'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/fontawesome'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index/error', { title: "新生知訊網", user: req.user });
});

//------------------- added by 陳威捷 (用於ejs模板中的函式)
app.locals.convertDateToString = function (date) {
  var str = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  return str;
}
app.locals.trunc = function (str) {
  if (str.length > 15) {
    return str.substr(0, 15) + "...";
  } else {
    return str;
  }
}
//----------------------------------

module.exports = app;