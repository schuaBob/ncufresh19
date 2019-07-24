var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('video/index', { title: '新生知訊網 | 影音專區',
  user: req.user });
});

router.get('/index_com', function(req, res, next) {
  res.render('video/index_com', { title: '新生知訊網 | 影音專區',
  user: req.user });
});

router.get('/index_phone', function(req, res, next) {
  res.render('video/phone/index_phone', { title: '新生知訊網 | 影音專區',
  user: req.user });
});

/** 中大生活 */
router.get('/v_nculife', function(req, res, next) {
  var title_bar = [];
  res.render('video/catalog', { title: '新生知訊網 | 影音專區',
  title_bar:['LIFE','中大生活'],
  user: req.user });
});

/** 中大生活底下 */
router.get('/v_nculife/:id', function(req, res, next) {
  var title_bar = [];
  var back_name;
  var ytID;
  switch (req.params.id) {
    case 'v_eating':
      res.render('video/video_model', { title: '新生知訊網 | 影音專區',
      title_bar: ['LIFE','中大生活','EATING','食'],
      back_name: 'v_nculife',
      ytID: 'B_8YrtgyC5o',
      user: req.user });
      break;

    case 'v_living':
      res.render('video/video_model', { title: '新生知訊網 | 影音專區',
      title_bar: ['LIFE','中大生活','LIVING','住'],
      back_name: 'v_nculife',
      ytID: 'lPSmlyn0PN0',
      user: req.user });
      break;

    case 'v_going':
      res.render('video/video_model', { title: '新生知訊網 | 影音專區',
      title_bar: ['LIFE','中大生活','GOING','行'],
      back_name: 'v_nculife',
      ytID: '7g_zGtH13LY',
      user: req.user });
      break;

    case 'v_education':
      res.render('video/video_model', { title: '新生知訊網 | 影音專區',
      title_bar: ['LIFE','中大生活','EDUCATION','育'],
      back_name: 'v_nculife',
      ytID: 'x06EbxjJAcw',
      user: req.user });
      break;
    
    case 'v_joy':
      res.render('video/video_model', { title: '新生知訊網 | 影音專區',
      title_bar: ['LIFE','中大生活','JOY','樂'],
      back_name: 'v_nculife',
      ytID: 'BYjcSDKP1LY',
      user: req.user });
      break;
  
    default:
      res.status(404)
      res.end();
      break;
  }
});

/** 學長姐訪談 */
router.get('/v_interview', function(req, res, next) {
  var title_bar = [];
  res.render('video/catalog', { title: '新生知訊網 | 影音專區',
  title_bar:['INTERVIEW','學長姐訪談'],
  user: req.user });
});

/** 學長姐訪談底下 */
router.get('/v_interview/:collegeID', function(req, res, next) {
  var title_bar = [];
  var back_name;
  switch (req.params.collegeID) {
    case 'v_engineering':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','ENGINEERING', '工學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
    
    case 'v_liberal':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','LIBERAL ARTS', '文學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
    
    case 'v_health':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','HEALYH SCIENCES & TECHNOLOGY', '生醫理工學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
    
    case 'v_earth':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','EARTH SCIENCES', '地球科學學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;

    case 'v_hakka':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','HAKKA STUDIES', '客家學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
    
    case 'v_science':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','SCIENCE', '理學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
    
    case 'v_computer':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','ENGINEERING & COMPUTER SCIENCE', '資訊電機學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
    
    case 'v_management':
      res.render('video/catalog', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','MANAGEMENT', '管理學院' ],
      back_name: 'v_interview',
      user: req.user });
      break;
  
    default:
      res.status(404)
      res.end();
      break;
  }
})

/** 學院底下 */
router.get('/v_interview/:collegeID/:subjectID', function(req, res, next) {
  var title_bar = [];
  var ytID;
  var back_name;
  switch (req.params.subjectID) {
    case 'v_mis':
      res.render('video/video_model', { title: '新生知訊網 | 影音專區',
      title_bar: ['INTERVIEW','學長姐訪談','MANAGEMENT','管理學院','MIS','資管系'],
      back_name: 'v_management',
      ytID: 'yDNAkogkERQ',
      user: req.user });
      break;
  
    default:
      res.status(404)
      res.end();
      break;
  }
});

/** 中大傳說 */
router.get('/v_legend', function(req, res, next) {
  var title_bar = [];
  res.render('video/catalog', { title: '新生知訊網 | 影音專區',
  title_bar: ['LEGEND','中大傳說'],
  user: req.user });
});


module.exports = router;

//if (req.params.subjectID === "v_mis") {
//  res.render('video/video_model', { title: '資管系 | 新生知訊網',
//  title_bar: ['INTERVIEW','學長姐訪談','MANAGEMENT', '管理學院', 'MIS', '資管系' ]});
//}


/* 測試
switch (req.params.subjectID) {
    case "v_mis":
      res.render('video/video_model', { title: '管理學院 | 新生知訊網',
      title_bar: ['INTERVIEW','學長姐訪談','MANAGEMENT', '管理學院', 'MIS', '資管系' ]});
      break;
  
    default:
      res.status(404)
      res.end();
      break;
  } */
  
/* 測試
if (req.params.subjectID === "v_mis") {
  res.render('video/video_model', { title: '資管系 | 新生知訊網',
  title_bar: ['INTERVIEW','學長姐訪談','MANAGEMENT','管理學院'],
  ytID: 'BYjcSDKP1LY' });
  } */