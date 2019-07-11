var express = require('express');
var router = express.Router();
//var department = require('../models/groups/department');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('groups/index', { title: 'Express' });
});
router.get('/department', function(req, res, next) {
    res.render('groups/g_department', { title: 'department' });
});
router.get('/association', function(req, res, next) {
    res.render('groups/g_association', { title: 'association' });
});
router.get('/community', function(req, res, next) {
    res.render('groups/g_community', { title: 'community' });
});
router.get('/others', function(req, res, next) {
    res.render('groups/g_others', { title: 'others' });
});



module.exports = router;