var express = require('express');
var router = express.Router();
var department_data = require('../models/groups/department');
var community_data = require('../models/groups/community');
var others_data = require('../models/groups/others');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('groups/index', { title: 'Express' });
});
/////////----------------------department
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
router.post('/add_department', function(req, res, next) {

    console.log("add department")
    if (req.body.name !== null) {

        new department_data({
            type: req.body.type,
            name: req.body.name,
            en_name: req.body.en_name,
            de_link: req.body.de_link,
            stu_link: req.body.stu_link,
            qna_link: req.body.qna_link,
        }).save();
        console.log("added" + req.body.name);
        department_data.find({}).exec(function(err, department) {
            if (err) return next(err);
            res.redirect('department')
        })
    } else {
        console.log("empty department");
        department_data.find({}).exec(function(err, department) {
            if (err) return next(err);
            res.redirect('department')
        })
    }

});
router.post("/get_department", function(req, res, next) {
    console.log("give me the god damn department")
    console.log(req.body.department_name)
    department_data.findOne({ name: req.body.department_name }).exec(function(err, data) {
        if (err) {
            return err;
        }
        console.log(data)
        res.send(data);
    });

});

//////----------------------------------community

router.get('/community', function(req, res, next) {
    community_data.find({}).exec(function(err, community) {
        if (err) return next(err);
        res.render('groups/g_community', {
            title: 'community',
            community: community,
            community_this: null,

        })
    })
});

router.get('/community/:community', function(req, res, next) {
    community_data.find({}).exec(function(err, community) {
        if (err) return next(err);
        community_data.findOne({ name: req.params.community }).exec(function(err, community_this) {
            if (err) return next(err);
            res.render('groups/g_community', {
                title: 'community',
                community: community,
                community_this: community_this,

            })
        })

    })


})
router.post('/add_community', function(req, res, next) {
    console.log("add community")
    if (req.body.name !== null) {

        new community_data({
            name: req.body.name,
            intro: req.body.intro
        }).save();
        console.log("added" + req.body.name);
        community_data.find({}).exec(function(err, community) {
            if (err) return next(err);
            res.redirect('/community')
        })
    } else {
        console.log("empty community");
        community_data.find({}).exec(function(err, community) {
            if (err) return next(err);
            res.redirect('/community')
        })
    }

});
//////----------------------others


router.get('/others', function(req, res, next) {
    others_data.find({}).exec(function(err, others) {
        if (err) return next(err);
        res.render('groups/g_others', {
            title: 'others',
            others: others,
            others_this: null,

        })
    })
});
router.get('/others/:others', function(req, res, next) {
    others_data.find({}).exec(function(err, others) {
        if (err) return next(err);
        others_data.findOne({ name: req.params.others }).exec(function(err, others_this) {
            if (err) return next(err);
            res.render('groups/g_others', {
                title: 'others',
                others: others,
                others_this: others_this,

            })
        })

    })


})

router.post('/add_others', function(req, res, next) {
    console.log("add others")
    if (req.body.name !== null) {

        new others_data({
            name: req.body.name,
            intro: req.body.intro
        }).save();
        console.log("added" + req.body.name);
        others_data.find({}).exec(function(err, others) {
            if (err) return next(err);

            res.redirect('/others')
        })
    } else {
        console.log("empty others");
        others_data.find({}).exec(function(err, others) {
            if (err) return next(err);
            res.redirect('/others')
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

router.get('/association', function(req, res, next) {
    res.render('groups/g_association', { title: 'association' });
});



module.exports = router;