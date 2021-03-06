var express = require('express');
var router = express.Router();
var department_data = require('../models/groups/department');
var community_data = require('../models/groups/community');
var others_data = require('../models/groups/others');
var student_data = require('../models/groups/student');
var photo_data = require('../models/groups/photo');
var index_count = 0;

var identity = require('../routes/check-user')

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/groups/stu_picture");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });

router.post('/uploadimg', identity.isAdmin, upload.array("img"), (req, res, next) => {

    for (let i in req.files) {

        var abspath = "/groups/stu_picture/" + req.files[i].originalname
        new photo_data({
            route: req.files[i].destination,
            filename: req.files[i].originalname,
            pathname: abspath

        }).save();
        console.log("added" + req.files[i].originalname);

    }
    res.redirect("association")


})





/* GET home page. */
router.get('/', function(req, res, next) {
    index_count += 1;
    res.render('groups/index', {
        title: '新生知訊網｜系所社團',
        user: req.user,
        counter: index_count,
    });
});


/////////////////////////////////////////////////////////////department////////////////////////////////////////////////////////////////
router.get('/department', function(req, res, next) {

    department_data.find({}).exec(function(err, department) {
        if (err) return next(err);
        console.log(department[0])
        res.render('groups/g_department', {
            title: '新生知訊網｜系所社團',
            department: department,
            department_this: null,
            department_type: null,
            user: req.user

        })
    })


    console.log("get department")
});
router.get('/department/:college', function(req, res, next) {
    if (req.params.college === "loveyou3000") {
        console.log("loveyou3000")
        res.redirect("https://www.youtube.com/watch?v=eNogd957eHo")
    } else {
        department_data.find({}).exec(function(err, department) {
            if (err) return next(err);

            res.render('groups/g_department', {
                title: '新生知訊網｜系所社團',
                department: department,
                department_this: null,
                department_type: req.params.college,
                user: req.user
            })
            console.log(req.params.college)

        })
    }


})
router.get('/department/:college/:department', function(req, res, next) {
    department_data.find({}).exec(function(err, department) {
        if (err) return next(err);
        department_data.findOne({ name: req.params.department }).exec(function(err, department_this) {
            if (err) return next(err);
            res.render('groups/g_department', {
                title: '新生知訊網｜系所社團',
                department: department,
                department_this: department_this,
                department_type: req.params.college,
                user: req.user
            })
        })

    })


})
router.post('/add_department', identity.isAdmin, function(req, res, next) {

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
router.post("/get_department", identity.isAdmin, function(req, res, next) {
    console.log("give me the god damn department")
    console.log(req.body.name)
    department_data.findOne({ name: req.body.name }).exec(function(err, data) {
        if (err) {
            return err;
        }
        console.log(data)
        res.send(data);
    });

});
router.post('/edit_department', identity.isAdmin, function(req, res, next) {
    console.log("edit department")

    department_data.findOne({ name: req.body.name }, function(err, data) {
        if (err) {
            return err;
        }
        console.log(data)
        data.type = req.body.type,
            data.en_name = req.body.en_name,
            data.de_link = req.body.de_link,
            data.stu_link = req.body.stu_link,
            data.qna_link = req.body.qna_link,
            data.save();
        console.log(data);
        console.log("edited" + req.body.name);
        res.send(data);

    })



});
router.post('/delete_department', identity.isAdmin, function(req, res, next) {
    console.log("delete department")

    department_data.deleteOne({ name: req.body.name }, function(err) {
        if (err) {
            return err;
        }
        var obg = new Object();
        obg.pass = "123";
        res.send(obg)
    })


})

//////////////////////////////////////////////community////////////////////////////////////////////////////////////////

router.get('/community', function(req, res, next) {
    console.log("add com")
    community_data.find({}).exec(function(err, community) {
        if (err) return next(err);
        res.render('groups/g_community', {
            title: '新生知訊網｜系所社團',
            community: community,
            community_this: null,
            user: req.user

        })
    })
});

router.get('/community/:community', function(req, res, next) {
    community_data.find({}).exec(function(err, community) {
        if (err) return next(err);
        community_data.findOne({ name: req.params.community }).exec(function(err, community_this) {
            if (err) return next(err);
            res.render('groups/g_community', {
                title: '新生知訊網｜系所社團',
                community: community,
                community_this: community_this,
                user: req.user

            })
        })

    })


})
router.post('/add_community', identity.isAdmin, function(req, res, next) {
    console.log("add community")
    if (req.body.name !== null) {

        new community_data({
            name: req.body.name,
            intro: req.body.intro
        }).save();
        console.log("added" + req.body.name);

        res.redirect('community')

    } else {
        console.log("empty community");
        community_data.find({}).exec(function(err, community) {
            if (err) return next(err);
            res.redirect('community')
        })
    }

});
router.post("/get_community", identity.isAdmin, function(req, res, next) {

    console.log(req.body.name)
    community_data.findOne({ name: req.body.name }).exec(function(err, data) {
        if (err) {
            return err;
        }
        console.log(data)
        res.send(data);
    });

});
router.post('/delete_community', identity.isAdmin, function(req, res, next) {
    console.log("delete community")

    community_data.deleteOne({ name: req.body.name }, function(err) {
        if (err) {
            return err;
        }
        var obg = new Object();
        obg.pass = "123";
        res.send(obg)
    })


})
router.post('/edit_community', identity.isAdmin, function(req, res, next) {
    console.log("edit community")

    community_data.findOne({ name: req.body.name }, function(err, data) {
        if (err) {
            return err;
        }

        data.intro = req.body.intro
        data.save();

        console.log("edited" + req.body.name);
        res.send(data);

    })



});
//////----------------------others


router.get('/others', function(req, res, next) {
    others_data.find({}).exec(function(err, others) {
        if (err) return next(err);
        res.render('groups/g_others', {
            title: '新生知訊網｜系所社團',
            others: others,
            others_this: null,
            user: req.user

        })
    })
});
router.get('/others/:others', function(req, res, next) {
    if (req.params.others === "who'ssonkilledDaenerys") {
        res.redirect("https://en.wikipedia.org/wiki/List_of_A_Song_of_Ice_and_Fire_characters#Lyanna_Stark")
    } else if (req.params.others === "whoisjonsnow'smom") {
        res.redirect("https://en.wikipedia.org/wiki/List_of_A_Song_of_Ice_and_Fire_characters#Lyanna_Stark")

    } else {
        others_data.find({}).exec(function(err, others) {
            if (err) return next(err);
            others_data.findOne({ name: req.params.others }).exec(function(err, others_this) {
                if (err) return next(err);
                console.log(others_this)
                res.render('groups/g_others', {
                    title: '新生知訊網｜系所社團',
                    others: others,
                    others_this: others_this,
                    user: req.user

                })
            })

        })

    }


})

router.post('/add_others', identity.isAdmin, function(req, res, next) {
    console.log("add others")

    if (req.body.name !== null) {

        new others_data({
            name: req.body.name,
            intro: req.body.intro
        }).save();
        console.log("added" + req.body.name);
        others_data.find({}).exec(function(err, others) {
            if (err) return next(err);
            res.redirect('others')
        })
    } else {
        console.log("empty others");
        others_data.find({}).exec(function(err, others) {
            if (err) return next(err);
            res.redirect('others')
        })
    }

});
router.post("/get_others", identity.isAdmin, function(req, res, next) {

    console.log(req.body.name)
    others_data.findOne({ name: req.body.name }).exec(function(err, data) {
        if (err) {
            return err;
        }
        console.log(data)
        res.send(data);
    });

});
router.post('/delete_others', identity.isAdmin, function(req, res, next) {
    console.log("delete others")

    others_data.deleteOne({ name: req.body.name }, function(err) {
        if (err) {
            return err;
        }
        var obg = new Object();
        obg.pass = "123";
        res.send(obg)
    })


})
router.post('/edit_others', identity.isAdmin, function(req, res, next) {
    console.log("edit others")
    console.log(req.body.intro)

    others_data.findOne({ name: req.body.name }, function(err, data) {
        if (err) {
            return err;
        }

        data.intro = req.body.intro
        data.save();

        console.log("edited" + req.body.name);
        res.send(data);

    })



});







router.get('/association', function(req, res, next) {
    console.log("get association")
    student_data.find({}).exec(function(err, data) {


        res.render('groups/g_association', {
            title: '新生知訊網｜系所社團',
            content: data,
            content_this: null,
            user: req.user

        });
    })
});
router.get('/association/:content', function(req, res, next) {
    if (req.params.content === "creator") {
        res.redirect("https://www.instagram.com/wolverine0504/")
    } else if (req.params.content === "team") {
        res.redirect("https://www.instagram.com/hello_ncu.2019/")
    } else if (req.params.content === "nbachamp") {
        res.redirect("https://g.co/kgs/Dj14aK")
    } else {
        student_data.find({}).exec(function(err, data) {
            if (err) return next(err);
            console.log(data.length)
            photo_data.find({}).exec(function(err, photos) {
                console.log(photos.length)
                console.log(photos)
                res.render('groups/g_association', {
                    title: '新生知訊網｜系所社團',
                    content: data,
                    content_this: req.params.content,
                    user: req.user,
                    pic: photos

                })
            })



        })
    }



})
router.post('/edit_association', identity.isAdmin, function(req, res, next) {
    student_data.find({}).exec(function(err, data) {
        if (data.length === 0) { //firstdata
            console.log(req.body.intro);
            console.log(req.body.section);
            new student_data({
                intro: req.body.intro,
                section: req.body.section
            }).save();
            console.log("added firstdata");

        } else {
            data[0].intro = req.body.intro,
                data[0].section = req.body.section
            data[0].save()

        }
        res.redirect('association')
    })
})




module.exports = router;