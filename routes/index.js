var express = require('express');
var router = express.Router();
// for oauth
var url = require('url');
var request = require('request');
const CLIENT_ID = "Nzc3NzY0MmYtMDM2Ny00MjJhLWIxZTAtYTJmYzFlMDQyYzY4";
const CLIENT_SECRET = "5e7a8fbddb8f00a3c4c46defd331d412733f08bf893a8194a236fe915c57d11255e1b6c21567fe0c60647e1996a64cf1e6bd302163f18f978c23f0008356c5e7";



router.get('/auth/provider', function(req, res, next){
  var url = 'https://api.cc.ncu.edu.tw/oauth/oauth/authorize?response_type=code&scope=user.info.basic.read&client_id=' + CLIENT_ID;
  res.redirect(url);
});

router.get('/auth/provider/callback', function(req, res, next){
  //Parse the callback query to get code which is required to exchanging access token
  url.parse(req.url, true);
  //If user decline the permissoion to read profile from NCU OAuth2,redirect to login page
  if (req.query.error || !req.query.code) {
    return res.redirect('/');
  }

  // Grab accessToken by exchanging code with NCU OAuth2
  request.post({
    url: 'https://api.cc.ncu.edu.tw/oauth/oauth/token',
    form: {
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET
    }
  }, function Callback(err, httpResponse, token){
    if (err)
      return console.error('failed to grab accessToken:', err);
    if (!httpResponse.statusCode === 200) {
      console.log('https://api.cc.ncu.edu.tw/oauth/oauth/token response error!');
      return res.redirect('/login');
    }
    // accessToken
    obj = JSON.parse(token);

    //Grab personal info by the accessToken
    request({
      url: 'https://api.cc.ncu.edu.tw/personnel/v1/info',
      headers: {
        'Authorization': 'Bearer' + obj.access_token,
      }
    }, function Callback(err, httpResponse, token){
      if (err)
        return console.error('failed to grab personal info:', err);
      if (!httpResponse.statusCode === 200) {
        console.log('https://api.cc.ncu.edu.tw/personnel/v1/info response error!');
        return res.redirect('/login');
      }
      // personal info
      personalObj = JSON.parse(info);

      
    });
  });
});

router.post('/login', function(req, res, next){
  let grade = req.body.id.substring(0, 3);
  if(grade !== 107)
    return res.redirect('auth/provider');
});

module.exports = router;
