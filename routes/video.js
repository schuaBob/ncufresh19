var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('video/index', {
    title: '新生知訊網 | 影音專區',
    user: req.user
  });
});


/** 電腦版首頁 */
router.get('/index_com', function (req, res, next) {
  res.render('video/index_com', {
    title: '新生知訊網 | 影音專區',
    user: req.user
  });
});


/** 手機版首頁 */
router.get('/index_phone', function (req, res, next) {

  res.render('video/phone/index_phone', {
    title: '新生知訊網 | 影音專區',
    user: req.user
  });
});

/** -------------------- 電腦版分頁 -------------------- */

/** 中大生活 */
router.get('/:device/v_nculife/', function (req, res, next) {
  var view = '';
  if (req.params.device === 'index_com') {
    view = 'video/catalog';
  }else if(req.params.device === 'index_phone') {
    view = 'video/phone/catalog_phone';
  }
  //var title_bar = ['LIFE', '中大生活', [{ en: 'eating', ch: '食' }, {}]];
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: ['LIFE', '中大生活'],
    user: req.user
  });
});

/** 中大生活底下 */
router.get('/:device/v_nculife/:id', function (req, res, next) {
  var title_bar = [];
  var ytID;
  switch (req.params.id) {
    case 'v_eating':
      title_bar = ['LIFE', '中大生活', 'EATING', '食'];
      ytID = 'B_8YrtgyC5o';
      break;

    case 'v_living':
      title_bar = ['LIFE', '中大生活', 'LIVING', '住'];
      ytID = 'lPSmlyn0PN0';
      break;

    case 'v_going':
      title_bar = ['LIFE', '中大生活', 'GOING', '行'];
      ytID = '7g_zGtH13LY';
      break;

    case 'v_education':
      title_bar = ['LIFE', '中大生活', 'EDUCATION', '育'];
      ytID = 'x06EbxjJAcw';
      break;

    case 'v_joy':
      title_bar = ['LIFE', '中大生活', 'JOY', '樂'];
      ytID = 'BYjcSDKP1LY';
      break;

    default:
      res.status(404)
      res.end();
      break;
  }
  var view = '';
  if (req.params.device === "index_com") {
    view = 'video/video_model';

  } else if (req.params.device === "index_phone") {

    //手機版video model
    res.redirect('/')

  } else {
    res.status(404)
    res.end();
  }
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: 'index_com/v_nculife/',
    ytID: ytID,
    user: req.user
  });
});

/** 學長姐訪談 */
router.get('/:device/v_interview', function (req, res, next) {
  var view = '';
  if (req.params.device === 'index_com') {
    view = 'video/catalog';
  }else if(req.params.device === 'index_phone') {
    view = 'video/phone/catalog_phone';
  }
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: ['INTERVIEW', '學長姐訪談'],
    user: req.user
  });
});

/** 學長姐訪談底下 */
router.get('/:device/v_interview/:collegeID', function (req, res, next) {
  var title_bar = [];
  switch (req.params.collegeID) {
    case 'v_engineering':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'ENGINEERING', '工學院'];
      break;

    case 'v_liberal':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'LIBERAL ARTS', '文學院'];
      break;

    case 'v_health':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'HEALYH SCIENCES & TECHNOLOGY', '生醫理工學院'];
      break;

    case 'v_earth':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'EARTH SCIENCES', '地球科學學院'];
      break;

    case 'v_hakka':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'HAKKA STUDIES', '客家學院'];
      break;

    case 'v_science':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'SCIENCE', '理學院'];
      break;

    case 'v_computer':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'ENGINEERING & COMPUTER SCIENCE', '資訊電機學院'];
      break;

    case 'v_management':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'MANAGEMENT', '管理學院'];
      break;

    default:
      res.status(404)
      res.end();
      break;
  }

  var view = '';
  if (req.params.device === "index_com") {
    view = 'video/catalog';

  } else if (req.params.device === "index_phone") {
    view = 'video/phone/catalog_phone';

  } else {
    res.status(404)
    res.end();
  }

  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: 'index_com/v_interview/',
    user: req.user
  });

})

/** 學院底下 */
router.get('/:device/v_interview/:collegeID/:subjectID', function (req, res, next) {
  var title_bar = [];
  var ytID;
  switch (req.params.subjectID) {
    case 'v_mis':
      title_bar =  ['INTERVIEW', '學長姐訪談', 'MANAGEMENT', '管理學院', 'MIS', '資管系'];
      ytID = 'yDNAkogkERQ';
      break;

    default:
      res.status(404)
      res.end();
      break;
  }

  var view = '';
  if (req.params.device === "index_com") {
    view = 'video/video_model';

  } else if (req.params.device === "index_phone") {
    //手機版video model
    res.redirect('/')

  } else {
    res.status(404)
    res.end();
  }

  res.render('video/video_model', {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: 'index_com/v_interview/v_management/',
    ytID: ytID,
    user: req.user
  });

});

/** 中大傳說 */
router.get('/v_legend', function (req, res, next) {
  var title_bar = [];
  res.render('video/catalog', {
    title: '新生知訊網 | 影音專區',
    title_bar: ['LEGEND', '中大傳說'],
    user: req.user
  });
});

/** -------------------- 手機版分頁 -------------------- */


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