var express=require('express')
//返回一个路由容器的实例
var router=express.Router()
//导入操作数据库的模型（index.js）
var User=require('../db').User
var auth=require('./auth')
//用来处理上传文件
var multer=require('multer')
//指定上传文件的存放目录
var upload=multer({dest:'./public'})
var path=require('path')
//注册页面
router.get('/new',function (req,res) {
    res.sendFile(path.resolve('build/index.html'))
})
//提交注册
router.post('/',auth.checkNoLogin,upload.single('avatar'),function (req,res) {
    var body=req.body
    if(req.file){
        body.avatar = '/'+req.file.filename;
    }
    User.findOne({username:body.username},function (err,oldUser) {
        if(err){//数据库出现问题，导致出错
            req.session.err=err
            res.redirect('back')
        }
        else if(oldUser){
            req.session.err='用户名已被占用'
            res.redirect('back')
        }
        else{
            User.create(body,function (err,doc) {
                if(doc){
                    //req.session.user = doc//把保存后的对象作为req.session;session对象是在服务器端内存放置的
                    res.redirect('/')
                }
            })
        }

    })
})
//修改页面
router.get('/:id',function (req,res) {
    res.sendFile(path.resolve('build/index.html'))

})
//提交修改
router.post('/:_id',auth.checkLogin,upload.single('avatar'),function (req,res) {
    var password=req.body.password
    var user={}
    console.log(req.session.user,111111111)
    Object.assign(user,req.session.user)
    console.log(user,222222222)
    user.password=password
    var _id=req.params._id
    if(req.file){
        user.avatar = '/'+req.file.filename;
    }
    /*User.update({_id},user,function (err,user) {
        if(err){//数据库出现问题，导致出错
            req.session.err=err
            res.redirect('back')
        }
        else{
            req.session.success='修改成功'
            res.send()
        }

    })*/
})



//路径以/开头，模板不能有/
/*
//当表单只有一个文件域的时候，可以用upload.single
//router.post('/singup',auth.checkNotLogin,upload.single('avatar'))
router.post('/signup',auth.checkNoLogin,upload.single('avatar'),function (req,res) {
    var body=req.body
    if(req.file){
        body.avatar = '/'+req.file.filename;
    }
        User.findOne({username:body.username},function (err,oldUser) {
            if(err){//数据库出现问题，导致出错
                req.session.err=err
                res.redirect('back')
            }
            else if(oldUser){
                req.session.err='用户名已被占用'
                res.redirect('back')
            }
            else{
                User.create(body,function (err,doc) {
                    if(doc){
                        req.session.user = doc//把保存后的对象作为req.session;session对象是在服务器端内存放置的
                        res.redirect('/')
                    }
                })
            }

        })
    })

//登录
router.get('/signin',auth.checkNoLogin,function (req,res) {
    //res.render('user/signin',{title:'登录'})
    res.sendFile(path.resolve('build/index.html'))

})
router.post('/signin',auth.checkNoLogin,function (req,res) {
    var body=req.body
    User.findOne(body,function (e,doc) {
        if(doc){
            req.session.user = doc
            res.redirect('/')
        }
        else{
            req.session.err='用户密码错误'
            res.send({err:'用户密码错误'})
        }
    })
})
*/
module.exports = router;
