var express = require('express');
var router = express.Router();
var department_data = require('../models/groups/department');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('groups/index', { title: 'Express' });
});
router.get('/department', function(req, res, next) {
    department_data.find({}).exec(function(err, department) {
        if (err) return next(err);
        res.render('groups/g_department', {
            title: 'department',
            department: department,
            department_this: null,
            department_type: null
        })
    })


    console.log("get department")
});
router.get('/department/:college', function(req, res, next) {
    department_data.find({}).exec(function(err, department) {
        if (err) return next(err);

        res.render('groups/g_department', {
            title: 'department',
            department: department,
            department_this: null,
            department_type: req.params.college
        })
        console.log(req.params.college)

    })


})
router.get('/department/:college/:department', function(req, res, next) {
    department_data.find({}).exec(function(err, department) {
        if (err) return next(err);
        department_data.findOne({ name: req.params.department }).exec(function(err, department_this) {
            if (err) return next(err);
            res.render('groups/g_department', {
                title: 'department',
                department: department,
                department_this: department_this,
                department_type: req.params.college
            })
        })

    })


})
router.get('/association', function(req, res, next) {
    res.render('groups/g_association', { title: 'association' });
});
router.get('/community', function(req, res, next) {
    res.render('groups/g_community', { title: 'community' });
});
router.get('/others', function(req, res, next) {
    res.render('groups/g_others', { title: 'others' });
});


router.post('/add_department', function(req, res, next) {
    console.log("add department")
    if (req.body.name !== null) {
        let typenum = req.body.type[0];
        new department_data({
            type: typenum,
            name: req.body.name,
            en_name: req.body.en_name,
            de_link: req.body.de_link,
            stu_link: req.body.stu_link,
            qna_link: req.body.qna_link,
        }).save();
        console.log("added" + req.body.name);
        department_data.find({}).exec(function(err, department) {
            if (err) return next(err);
            res.render('groups/g_department', {
                title: 'department',
                department: department,
                department_this: null,
                department_type: null
            })
        })
    } else {
        console.log("empty department");
        department_data.find({}).exec(function(err, department) {
            if (err) return next(err);
            res.render('groups/g_department', {
                title: 'department',
                department: department,
                department_this: null,
                department_type: null
            })
        })
    }

});

router.post('/edit_department', function(req, res, next) {
    console.log("edit department")
    let typenum = req.body.type[0];
    let name = req.body.name;
    department_data.find({ name: name }, function(err, data) {
        data[0].type = typenum,
            data[0].en_name = req.body.en_name,
            data[0].de_link = req.body.de_link,
            data[0].stu_link = req.body.stu_link, S
        data[0].qna_link = req.body.qna_link,
            data[0].save();
    })
    console.log("edited" + req.body.name);
    res.redirect('/groups/department');
});
router.post('/delete_department', function(req, res, next) {
    console.log("delete department")
    let name = req.body.name;
    department_data.find({ name: name }, function(err, data) {
        console.log('刪除系所')
        data.remove();
        res.redirect('/groups/department');
        console.log('刪除系所成功')
    })


})





module.exports = router;