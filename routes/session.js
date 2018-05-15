var express=require('express')
var router=express.Router()
var User=require('../db').User
var path=require('path')
var auth=require('./auth')
router.route('/')
    .all( (req,res,next)=>{
        console.log(req.session.user,1111)//
        next()
    })
    //登录
    .post(function (req,res) {
        var body=req.body
        User.findOne(body,function (e,doc) {
            console.log(doc)
            if(doc){
                req.session.user = doc
                res.send({err:0,user:doc})
                console.log(req.session.user,'denglu')

            }
            else{
                res.send({code:1,err:'用户密码错误'})
            }
        })
    })
    //退出
    .delete(function (req,res) {
        req.session.user=null
        res.send({err:0})
    })
router.get('/new',function (req,res) {
    res.sendFile(path.resolve('build/index.html'))
})
module.exports=router
