var express=require('express')
var router=express.Router()
var User=require('../db').User
var path=require('path')
var auth=require('./auth')

router.route('/')
    .all(function (req,res,next) {
        console.log(req.session.user,1111)//
        next()
    })
    //登录
    .post(function (req,res) {
        var body=req.body
        User.findOne(body,function (e,doc) {
            if(doc){
                console.log(req.session.user,2222)//
                req.session.user = doc
                res.redirect('/')
            }
            else{
                req.session.err='用户密码错误'
                res.send({err:'用户密码错误'})
            }
        })
    })
    //退出
    .delete(auth.checkLogin,function (req,res) {
        req.session.user=''
        res.send({err:0})
    })
router.get('/new',function (req,res) {
    res.sendFile(path.resolve('build/index.html'))
})
module.exports=router
