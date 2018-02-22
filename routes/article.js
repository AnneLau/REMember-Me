var express=require('express')
var router=express.Router()
var Article=require('../db').Article
var path=require('path')
router.get('/all',function (req,res) {
    Article.find({}).populate('user').exec(function (err,articles) {
        res.send(articles)
    })
})
//增加
router.get('/add',function (req,res) {
    //res.render('article/add',{title:'增加',article:{}})
    console.log('aaaddd')
    res.sendFile(path.resolve('build/index.html'))
})
router.post('/add',function (req,res) {
    var body=req.body
    body.user=req.session.user._id//article~~~~~~~~~~~~~~~~~~~~~~~~
    Article.create(body,function (err,doc) {
        if(err){
            req.session.err=err
            res.redirect('back')
        }
        else{
            req.session.success='发布成功'
            res.redirect('/')
        }
    })

    /*Article.remove({},function (e,docs) {
        console.log(e,docs)
    })
    res.end()*/
})
router.get('/detail/get/:_id',function (req,res) {
    var _id=req.params._id
    console.log(_id)
    Article.findById(_id,function(err,article){
        //res.render('article/detail',{title:'文章详情',article});
        res.send(article)
    })
})
//访问article/detail/get58a4558d4791fb19c80ea451,重定向
router.get('/detail/:id',function (req,res) {
    console.log(req.originalUrl)
    //res.redirect('./'+req.params.id)
    res.sendFile(path.resolve('build/index.html'))

})
router.get('/update/get/:_id',function (req,res) {
    var _id=req.params._id
    console.log('gaiyige')
    Article.findById(_id,function (err,article) {
        res.send(article)
    })
})
router.get('/update/:id',function (req,res) {
    res.sendFile(path.resolve('build/index.html'))

})
router.post('/update/:_id',function (req,res) {
    var _id=req.params._id
    Article.update({_id},req.body,function (err,article) {
        if(err){
            req.session.err=err
            //可能会出问题。。。。。。。。。。。。。。。。。
            res.redirect('back')
        }
        if(article){
            req.session.success='文章修改成功'
            //res.redirect('/article/detail/'+req.params._id);
            res.redirect('/')
        }
    })
})
router.get('/delete/:_id',function (req,res,next) {
    var _id=req.params._id
    Article.remove({_id},function (err,result) {
        if(err){
            req.session.err=err
        }
        else{
            req.session.success = '删除成功!';
            //res.redirect('http://'+req.headers.host)//删除完返回首页
            res.send({err:0})
        }
    })
})
router.use(function (req,res) {
    res.sendFile(path.resolve('build/index.html'))

})
module.exports = router;