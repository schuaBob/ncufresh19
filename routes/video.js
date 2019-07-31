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
router.get('/index_smp', function (req, res, next) {

  res.render('video/phone/index_smp', {
    title: '新生知訊網 | 影音專區',
    user: req.user
  });
});


/** 中大生活 */
router.get('/:device/nculife/', function (req, res, next) {
  var view = '';
  if (req.params.device === 'index_com') {
    view = 'video/catalog';
  }else if(req.params.device === 'index_smp') {
    view = 'video/phone/catalog_smp';
  }
  //var title_bar = ['LIFE', '中大生活', [{ en: 'eating', ch: '食' }, {}]];
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: ['LIFE', '中大生活'],
    user: req.user
  });
});

/** 中大生活底下 */
router.get('/:device/nculife/:id', function (req, res, next) {
  var title_bar = [];
  var ytID;
  switch (req.params.id) {
    case 'eating':
      title_bar = ['LIFE', '中大生活', 'EATING', '食'];
      ytID = 'B_8YrtgyC5o';
      break;
    case 'living':
      title_bar = ['LIFE', '中大生活', 'LIVING', '住'];
      ytID = 'lPSmlyn0PN0';
      break;
    case 'going':
      title_bar = ['LIFE', '中大生活', 'GOING', '行'];
      ytID = '7g_zGtH13LY';
      break;
    case 'education':
      title_bar = ['LIFE', '中大生活', 'EDUCATION', '育'];
      ytID = 'x06EbxjJAcw';
      break;
    case 'joy':
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

  } else if (req.params.device === "index_smp") {
    //手機版video model
    view = 'video/phone/video_model_smp';

  } else {
    res.status(404)
    res.end();
  }
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: 'index_com/nculife/',
    ytID: ytID,
    user: req.user
  });
});

/** 學長姐訪談 */
router.get('/:device/interview', function (req, res, next) {
  var view = '';
  if (req.params.device === 'index_com') {
    view = 'video/catalog';
  }else if(req.params.device === 'index_smp') {
    view = 'video/phone/catalog_smp';
  }
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: ['INTERVIEW', '學長姐訪談'],
    user: req.user
  });
});

/** 學長姐訪談底下 */
router.get('/:device/interview/:collegeID', function (req, res, next) {
  var title_bar = [];
  switch (req.params.collegeID) {
    case 'engineering':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'ENGINEERING', '工學院'];
      break;
    case 'lit':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'LIBERAL ARTS', '文學院'];
      break;
    case 'chst':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'HEALTH SCIENCES & TECHNOLOGY', '生醫理工學院'];
      break;
    case 'escollege':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'EARTH SCIENCES', '地球科學學院'];
      break;
    case 'hakka_college':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'HAKKA STUDIES', '客家學院'];
      break;
    case 'science':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'SCIENCE', '理學院'];
      break;
    case 'ceecs':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'ENGINEERING & COMPUTER SCIENCE', '資訊電機學院'];
      break;
    case 'mgt':
      title_bar =  ['INTERVIEW', '學長姐訪談',
        'MANAGEMENT', '管理學院'];
      break;

    default:
      res.status(404)
      res.end();
      break;
  }

  var view = '';
  if (req.params.device === "index_com") {
    view = 'video/catalog';

  } else if (req.params.device === "index_smp") {
    view = 'video/phone/catalog_smp';

  } else {
    res.status(404)
    res.end();
  }

  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: 'index_com/interview/',
    user: req.user
  });

})

/** 學院底下 */
router.get('/:device/interview/:collegeID/:subjectID', function (req, res, next) {
  var title_bar = [];
  var ytID;
  switch (req.params.subjectID) {
    //管院
    case 'im':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'MANAGEMENT', '管理學院',
       'INFORMATION MANAGEMENT', '資訊管理系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'ba':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'MANAGEMENT', '管理學院',
       'BUSINESS ADMINISTRATION', '企業管理學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'fm':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'MANAGEMENT', '管理學院',
       'FINANCE', '財務金融學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'ec':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'MANAGEMENT', '管理學院',
       'ECONOMICS', '經濟學系'];
      ytID = 'yDNAkogkERQ';
      break;
    
    //文院
    case 'chinese':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'LIBERAL ARTS', '文學院',
       'CHINESE LITERATURE', '中國文學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'english':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'LIBERAL ARTS', '文學院',
       'ENGLISH', '英美語文系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'fr':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'LIBERAL ARTS', '文學院',
       'FRANÇAIS', '法國語文學系'];
      ytID = 'yDNAkogkERQ';
      break;

    //理院
    case 'jspcos':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'SCIENCE', '理學院',
       'JOINT SCIENCE PROGRAM, COLLEGE OF SCIENCE', '理學院學士班'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'phy':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'SCIENCE', '理學院',
       'PHYSICS', '物理學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'math':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'SCIENCE', '理學院',
       'MATHEMATICS', '數學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'chem':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'SCIENCE', '理學院',
       'CHEMISTRY', '化學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'dop':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'SCIENCE', '理學院',
       'OPTICS AND PHOTONICS', '光電科學與工程學系'];
      ytID = 'yDNAkogkERQ';
      break;

    //工院
    case 'cme':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING', '工學院',
       'CHEMICAL AND MATERIALS ENGINEERING', '化學工程與材料工程學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'cv':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING', '工學院',
       'CIVIL ENGINEERING', '土木工程學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'me':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING', '工學院',
       'MECHANICAL ENGINEERING', '機械工程學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'ipe':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING', '工學院',
       'INTERDISCIPLINARY PROGRAM OF ENGINEERING', '工學院學士班'];
      ytID = 'yDNAkogkERQ';
      break;

    //資訊電機學院
    case 'ipeecs':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING & COMPUTER SCIENCE', '資訊電機學院',
       'INTERDISCIPLINARY PROGRAM OF ELECTERICAL ENGINEERING & COMPUTER SCIENCE', '資訊電機學院學士班'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'ee':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING & COMPUTER SCIENCE', '資訊電機學院',
       'ELECTRICAL ENGINEERING', '電機工程學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'csie':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING & COMPUTER SCIENCE', '資訊電機學院',
       'COMPUTER SCIENCE & INFORMATION ENGINEERING', '資訊工程學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'ce':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'ENGINEERING & COMPUTER SCIENCE', '資訊電機學院',
       'COMMUNICATION ENGINEERING', '通訊工程學系'];
      ytID = 'yDNAkogkERQ';
      break;

    //地科院
    case 'gep':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'EARTH SCIENCES', '地球科學學院',
       'EARTH SCIENCES', '地球科學學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'atm':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'EARTH SCIENCES', '地球科學學院',
       'ATMOSPHERIC SCIENCES', '大氣科學學系'];
      ytID = 'yDNAkogkERQ';
      break;

    //客院
    case 'hakka':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'HAKKA STUDIES', '客家學院',
       'HAKKA LANGUAGE', '客家語文暨社會科學學系'];
      ytID = 'yDNAkogkERQ';
      break;

    //生醫
    case 'ls':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'HEALTH SCIENCES & TECHNOLOGY',
       '生醫理工學院', 'LIFE SCIENCE', '生命科學學系'];
      ytID = 'yDNAkogkERQ';
      break;
    case 'dbse':
      title_bar =  ['INTERVIEW', '學長姐訪談',
       'HEALTH SCIENCES & TECHNOLOGY', '生醫理工學院',
       'BIOMEDICAL SCIENCES AND ENGINEERING', '生醫科學與工程學系'];
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

  } else if (req.params.device === "index_smp") {
    //手機版video model
    view = 'video/phone/video_model_smp';

  } else {
    res.status(404)
    res.end();
  }

  var back_name;
  switch (title_bar[3]) {
    case '管理學院':
      back_name = 'index_com/interview/mgt/';
      break;
    case '文學院':
      back_name = 'index_com/interview/lit/';
      break;
    case '理學院':
      back_name = 'index_com/interview/science/';
      break;
    case '工學院':
      back_name = 'index_com/interview/engineering/';
      break;
    case '資訊電機學院':
      back_name = 'index_com/interview/ceecs/';
      break;
    case '地球科學學院':
      back_name = 'index_com/interview/escollege/';
      break;
    case '客家學院':
      back_name = 'index_com/interview/hakka_college/';
      break;
    case '生醫理工學院':
      back_name = 'index_com/interview/chst/';
      break;
    
  
    default:
      break;
  }

  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: back_name,
    ytID: ytID,
    user: req.user
  });

});

/** 中大傳說 */
router.get('/:device/legend', function (req, res, next) {
  var view = '';
  if (req.params.device === 'index_com') {
    view = 'video/catalog';
  }else if(req.params.device === 'index_smp') {
    view = 'video/phone/catalog_smp';
  }
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: ['LEGEND', '中大傳說'],
    user: req.user
  });
});

/** 中大傳說底下 */
router.get('/:device/legend/:id', function (req, res, next) {
  var title_bar = [];
  var ytID;
  switch (req.params.id) {
    case 'breakfast':
      title_bar = ['LEGEND', '中大傳說', '中大傳說之早餐大胃王', '中央大學的學生早餐最多能吃多少'];
      ytID = 'LTb4EQBAMbw';
      break;
    case 'mustdo':
      title_bar = ['LEGEND', '中大傳說', '中大傳說之大學生了沒', '大學必做的事'];
      ytID = 'yctNjGa4aDo';
      break;
    case 'lover':
      title_bar = ['LEGEND', '中大傳說', '中大傳說之聖下你了', '到底交不交的到男/女朋友'];
      ytID = 'YEIyhm-QTkg';
      break;
    case 'underfloor':
      title_bar = ['LEGEND', '中大傳說', '中大傳說之恐怖的宿舍地下室', '竟然拍到......？'];
      ytID = 'LLgFyfYqKbs';
      break;
    case '100challenge':
      title_bar = ['LEGEND', '中大傳說', '中大傳說之省錢必備的方法', '挑戰100塊錢過一天'];
      ytID = 'SX_ViT4Ra7k';
      break;

    default:
      res.status(404)
      res.end();
      break;
  }
  var view = '';
  if (req.params.device === "index_com") {
    view = 'video/video_model';

  } else if (req.params.device === "index_smp") {
    //手機版video model
    view = 'video/phone/video_model_smp';

  } else {
    res.status(404)
    res.end();
  }
  res.render(view, {
    title: '新生知訊網 | 影音專區',
    title_bar: title_bar,
    back_name: 'index_com/legend/',
    ytID: ytID,
    user: req.user
  });
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