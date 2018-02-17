var express=require('express')
var router=express.Router()
var Article=require('../db').Article

router.get('/all',function (req,res) {
    Article.find({}).populate('user').exec(function (err,articles) {
        res.send(articles)
    })
})
//增加
router.get('/add/:id',function (req,res) {
    //res.render('article/add',{title:'增加',article:{}})
    res.send()
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
router.get('/detail/:_id',function (req,res) {
    var _id=req.params._id
    console.log(_id)
    Article.findById(_id,function(err,article){
        //res.render('article/detail',{title:'文章详情',article});
        res.send(article)
    })
})
router.get('/update/:_id',function (req,res) {
    var _id=req.params._id
    Article.findById(_id,function (err,article) {
        res.send(article)
    })
})
router.post('/update/:_id',function (req,res) {
    var _id=req.params._id
    Article.update({_id},req.body,function (err,article) {
        if(err){
            console.log(2)
            req.session.err=err
            res.redirect('back')
        }
        if(article){
            req.session.success='文章修改成功'
            console.log(1)
            //res.redirect('/article/detail/'+req.params._id);
            res.redirect('/')
        }
    })
})
router.get('/delete/:_id',function (req,res,next) {
    var _id=req.params._id
    console.log(req.headers.host)
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
module.exports = router;