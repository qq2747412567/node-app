const express = require("express");
const router = express.Router();

const keys = require("../../config/keys");
const passport = require("passport")
const Profile = require("../../modeis/Profile");

//@route GET api/profiles/text
//@desc 返回请求的json数据
router.get("/text",(req,res) => {
  res.json({msg:"profile works"});
});

//@route POST api/profiles/add
//@desc 创建信息接口

router.post("/add",
    passport.authenticate("jwt",{session:false}),
    (req,res) => {
    const profileFields = {};

        if (req.body.projectname) profileFields.projectname = req.body.projectname;
        if (req.body.manname) profileFields.manname= req.body.manname;
        if (req.body.projectphone) profileFields.projectphone = req.body.projectphone;
        if (req.body.projectaccount) profileFields.projectaccount = req.body.projectaccount;
        if (req.body.teachername) profileFields.teachername = req.body.teachername;
        if (req.body.reporttime) profileFields.reporttime = req.body.reporttime;
        if (req.body.projecttypes) profileFields.projecttypes = req.body.projecttypes;

        if (req.body.membersaccount) profileFields.membersaccount = req.body.membersaccount;
        if (req.body.membersname) profileFields.membersname = req.body.membersname;
        if (req.body.membersprofessionalclass) profileFields.membersprofessionalclass = req.body.membersprofessionalclass;
        if (req.body.memberswhereschool) profileFields.memberswhereschool = req.body.memberswhereschool;
        if (req.body.twomembersaccount) profileFields.twomembersaccount = req.body.twomembersaccount;
        if (req.body.twomembersname) profileFields.twomembersname = req.body.twomembersname;
        if (req.body.twomembersprofessionalclass) profileFields.twomembersprofessionalclass = req.body.twomembersprofessionalclass;
        if (req.body.twomemberswhereschool) profileFields.twomemberswhereschool = req.body.twomemberswhereschool;
        if (req.body.thrmembersaccount) profileFields.thrmembersaccount = req.body.thrmembersaccount;
        if (req.body.thrmembersname) profileFields.thrmembersname = req.body.thrmembersname;
        if (req.body.thrmembersprofessionalclass) profileFields.thrmembersprofessionalclass = req.body.thrmembersprofessionalclass;
        if (req.body.thrmemberswhereschool) profileFields.thrmemberswhereschool = req.body.thrmemberswhereschool;

        if (req.body.projectintroduction) profileFields.projectintroduction = req.body.projectintroduction;
        if (req.body.researchobjective) profileFields.researchobjective = req.body.researchobjective;
        if (req.body.researchcontents) profileFields.researchcontents = req.body.researchcontents;
        if (req.body.researchathomeandabroad) profileFields.researchathomeandabroad = req.body.researchathomeandabroad;
        if (req.body.projectinnovate) profileFields.projectinnovate = req.body.projectinnovate;
        if (req.body.technologyroadmap) profileFields.technologyroadmap = req.body.technologyroadmap;
        if (req.body.scheduling) profileFields.scheduling = req.body.scheduling;

        if (req.body.judgment) profileFields.judgment = req.body.judgment;
        if (req.body.teacheropinion) profileFields.teacheropinion = req.body.teacheropinion;
        if (req.body.midteacheropinion) profileFields.midteacheropinion = req.body.midteacheropinion;
        if (req.body.endteacheropinion) profileFields.endteacheropinion = req.body.endteacheropinion;
        if (req.body.Ejudgment) profileFields.Ejudgment = req.body.Ejudgment;

        new Profile(profileFields).save().then(profile => {
        res.json(profile);
    });
   }
);

//@route GET api/profiles
//@desc 获取所有信息

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

//@route GET api/profiles/:id
//@desc 获取单个信息

router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ _id: req.params.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }

                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);
// @route  POST api/profiles/edit
// @desc   编辑信息接口
router.post(
    '/edit/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const profileFields = {};

        if (req.body.projectname) profileFields.projectname = req.body.projectname;
        if (req.body.manname) profileFields.manname= req.body.manname;
        if (req.body.projectphone) profileFields.projectphone = req.body.projectphone;
        if (req.body.projectaccount) profileFields.projectaccount = req.body.projectaccount;
        if (req.body.teachername) profileFields.teachername = req.body.teachername;
        if (req.body.reporttime) profileFields.reporttime = req.body.reporttime;
        if (req.body.projecttypes) profileFields.projecttypes = req.body.projecttypes;

        if (req.body.membersaccount) profileFields.membersaccount = req.body.membersaccount;
        if (req.body.membersname) profileFields.membersname = req.body.membersname;
        if (req.body.membersprofessionalclass) profileFields.membersprofessionalclass = req.body.membersprofessionalclass;
        if (req.body.memberswhereschool) profileFields.memberswhereschool = req.body.memberswhereschool;
        if (req.body.twomembersaccount) profileFields.twomembersaccount = req.body.twomembersaccount;
        if (req.body.twomembersname) profileFields.twomembersname = req.body.twomembersname;
        if (req.body.twomembersprofessionalclass) profileFields.twomembersprofessionalclass = req.body.twomembersprofessionalclass;
        if (req.body.twomemberswhereschool) profileFields.twomemberswhereschool = req.body.twomemberswhereschool;
        if (req.body.thrmembersaccount) profileFields.thrmembersaccount = req.body.thrmembersaccount;
        if (req.body.thrmembersname) profileFields.thrmembersname = req.body.thrmembersname;
        if (req.body.thrmembersprofessionalclass) profileFields.thrmembersprofessionalclass = req.body.thrmembersprofessionalclass;
        if (req.body.thrmemberswhereschool) profileFields.thrmemberswhereschool = req.body.thrmemberswhereschool;

        if (req.body.projectintroduction) profileFields.projectintroduction = req.body.projectintroduction;
        if (req.body.researchobjective) profileFields.researchobjective = req.body.researchobjective;
        if (req.body.researchcontents) profileFields.researchcontents = req.body.researchcontents;
        if (req.body.researchathomeandabroad) profileFields.researchathomeandabroad = req.body.researchathomeandabroad;
        if (req.body.projectinnovate) profileFields.projectinnovate = req.body.projectinnovate;
        if (req.body.technologyroadmap) profileFields.technologyroadmap = req.body.technologyroadmap;
        if (req.body.scheduling) profileFields.scheduling = req.body.scheduling;

        if (req.body.judgment) profileFields.judgment = req.body.judgment;
        if (req.body.teacheropinion) profileFields.teacheropinion = req.body.teacheropinion;
        if (req.body.midteacheropinion) profileFields.midteacheropinion = req.body.midteacheropinion;
        if (req.body.endteacheropinion) profileFields.endteacheropinion = req.body.endteacheropinion;
        if (req.body.Ejudgment) profileFields.Ejudgment = req.body.Ejudgment;

        Profile.findOneAndUpdate(
            { _id: req.params.id },
            { $set: profileFields },
            { new: true }
        ).then(profile => res.json(profile));
    }
);

// @route  POST api/profiles/delete/:id
// @desc   删除信息接口
router.delete(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ _id: req.params.id })
            .then(profile => {
                 res.json(profile);
            })
            .catch(err => res.status(404).json('删除失败!'));
    }
);


module.exports = router;