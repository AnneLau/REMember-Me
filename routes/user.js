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
//注册
//路径以/开头，模板不能有/
router.get('/signup',auth.checkNoLogin,function (req,res) {
    //res.render('user/signup',{title:'注册'})//注意，此路径是相对于views的子路径。是app.js里的‘app.set('views',path.resolve('views'))’这个路径

    res.send()
})
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
    //删除所有数据
    /*User.remove({},function (e,docs) {
        console.log(e,docs)
    })
    res.end()*/
    })

//登录
/*router.get('/signin',auth.checkNoLogin,function (req,res) {
    //res.render('user/signin',{title:'登录'})
    res.send()
})*/
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
router.get('/signout',auth.checkLogin,function (req,res) {
    req.session.user=null
    console.log(1123)
    res.send({err:0})
})
module.exports = router;
