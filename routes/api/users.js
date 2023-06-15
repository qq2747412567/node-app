//登录和注册
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport")

// const gravatar = require("gravatar");

const User = require("../../modeis/User");

//@route GET api/users/text
//@desc 返回请求的json数据
//router.get("/text",(req,res) => {
//  res.json({msg:"login works"})})

//@route POST api/users/register
//@desc 返回请求的json数据
router.post("/register",(req,res) => {
    // console.log(req.body);

    //查询数据库中是否拥有号码
    User.findOne({telephone:req.body.telephone})
        .then((user) => {
            if(user){
                return res.status(400).json('号码已被注册!')
            }else{
                const newUser = new User({
                    name:req.body.name,
                    telephone:req.body.telephone,
                    memberschool:req.body.memberschool,
                    password:req.body.password,
                    identity: req.body.identity
                })

                bcrypt.genSalt(10,function (err,salt) {
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err));
                    })

                })
            }
        })
})

//@route POST api/users/login
//@desc 返回token jwt passport

router.post("/login",(req,res) => {
    const telephone = req.body.telephone;
    const password = req.body.password;
    //查询数据库
    User.findOne({telephone})
        .then(user => {
            if(!user){
                return res.status(404).json('用户不存在');
            }
            //密码确认
            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule = {
                            id:user.id,
                            name:user.name,
                            memberschool:user.memberschool,
                            identity:user.identity
                        };
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                        //res.json({msg:"success"});
                    }else{
                        return res.status(400).json('密码错误！');
                    }
                })
        })
})

//@route GET api/users/current
//@desc 返回 current user
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) =>
{
    res.json({
        id:req.user.id,
        name:req.user.name,
        telephone:req.user.telephone,
        memberschool:req.user.memberschool,
        identity: req.user.identity
    });
})


module.exports = router;



