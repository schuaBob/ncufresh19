var express = require('express');
var router = express.Router();
var Users = require("../models/index/user");
var checkUser = require('./check-user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
// for oauth
var url = require('url');
var request = require('request');
const CLIENT_ID = "Nzc3NzY0MmYtMDM2Ny00MjJhLWIxZTAtYTJmYzFlMDQyYzY4";
const CLIENT_SECRET = "5e7a8fbddb8f00a3c4c46defd331d412733f08bf893a8194a236fe915c57d11255e1b6c21567fe0c60647e1996a64cf1e6bd302163f18f978c23f0008356c5e7";

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, id, password, done){
    Users.findOne({ id: id }, function(err, user){
      if(err) done(err);
      if(!user){
        console.log(id + "不存在");
        //euqual to req.flash('error', "使用者名稱或密碼錯誤");
        return done(null, false, {
          message: "使用者名稱或密碼錯誤"
        });
      }
      user.comparePassword(password, user.password, function(err, isMatch){
        if(err) 
          return done(err);
        if(isMatch)  
          return done(null, user, console.log(user.id + " login Successfully"));
        else{
          console.log(id + '密碼錯誤');
          return done(null, false, {
            message: "使用者名稱或密碼錯誤"
          });
        }
      });
    });
  }
))

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get('/',(req,res,next)=> {
  res.render('index/index',{title:"新生知訊網"})
});

router.get('/comingsoon', function (req, res, next) {
  res.render('comingsoon/index', {
    title: '新生知訊網'
  });
});

router.get('/login', checkUser.isAllowtoLogin, function(req, res, next) {
  res.render('login/index', { title: '新生知訊網' });
});

router.post('/login', checkUser.isAllowtoLogin, function(req, res, next){
  let grade = req.body.id.substring(0, 3);
  if(grade !== '108')
    return res.redirect('auth/provider');
  Users.findOne({ 'id': req.body.id }, function(err, user){
    if(err) res.redirect('/login');
    if(user && user.password)
      res.redirect('/password?id=' + req.body.id);
    else
      res.redirect('/register?id=' + req.body.id);
  })
});

router.get('/password', checkUser.isAllowtoLogin, function(req, res, next){
  res.render('login/password', { title: '新生知訊網' });
});

router.post('/password', checkUser.isAllowtoLogin, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/register', checkUser.isAllowtoLogin, function(req, res, next){
  res.render('login/register', { title: '新生知訊網' });
});

router.post('/regiser', checkUser.isAllowtoLogin, function(req, res, next){

})

router.get('/logout', function(req, res, next){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

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

      if(!personalObj.id){
        console.log(personalObj.id + ' is not allowed to login');
      }
      Users.findOne({ 'id': personalObj.id }, function(err, user){
        if(err) next(err);
        // If found, login
        if(user){
          req.login(user, function(err){
            if(err) return next(err);
            console.log(user.id + "登入 via Oauth");
            res.redirect('/');
          });
        } else{ // else, create user
          Users.createUser(new Users({
            id: personalObj.id,
            name: personalObj.name,
            unit: personalObj.unit,
          }), function(err, user){
            if (err) return next(err);
            req.login(user, function (err) {
              if (err) return next(err);
              console.log(user.id + " 建立via OAuth");
              console.log(personalObj.id + ' 登入via OAuth')
              res.redirect('/');
            });
          });
        }
      });
    });
  });
});

router.get('/adduser', function(req, res, next){
  Users.createUser(new Users({
    id: "108000001",
    password: "111",
    unit: "csie",
    name: "eugene"
  }), function(err, user){
    if(err) next(err);
    res.redirect('/login');
  })
})

module.exports = router;
