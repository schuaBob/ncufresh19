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

// cache views
app.set('view cache', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('NcuFresh19'));
app.use(express.static(path.join(__dirname, 'public')));


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(minify());
app.use(helmet());
app.use(flash());

// mongoose
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/ncufresh19', {
  useNewUrlParser: true
});

// strict router  
var router = express.Router({ strict: true });
router.all('*');

// Pages
var index = require('./routes/index');
var documents = require('./routes/documents');
var smallgame = require('./routes/smallgame');
var vedio = require('./routes/vedio');
var qna = require('./routes/qna');
var about = require('./routes/about');
var campus = require('./routes/campus');
var life = require('./routes/life');
var groups = require('./routes/groups');
var personal = require('./routes/personal');
var login = require('./routes/login');
var link = require('./routes/link');

// 首頁
app.use('/', index);
// 新生必讀
app.use('/documents', documents);
// 小遊戲
app.use('/smallgame', smallgame);
// 影音專區
app.use('/vedio', vedio);
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
// 登入畫面
app.use('/login', login);
// 常用連結
app.use('/link', link);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index/error', { });
});

module.exports = app;
