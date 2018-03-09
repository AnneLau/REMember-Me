var express=require('express')
var router=express.Router()
var Article=require('../db').Article
var path=require('path')

router.route('/')
    .all(function (req,res,next) {

        next()
    })
    .get(function (req,res) {
            Article.find({}).populate('user').exec(function (err,articles) {
                res.send(articles)
            })
    })
    .post(function (req,res) {
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
    })


router.route('/:_id')
    .all(function (req,res,next) {
        console.log('')
        next()
    })
    .get(function (req,res) {
        var _id=req.params._id
        Article.findById(_id,function(err,article){
            //res.render('article/detail',{title:'文章详情',article});
            res.send(article)
        })
    })
    .post(function (req,res) {
        console.log('pst a')
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
    .delete(function (req,res) {
    var _id=req.params._id
    Article.remove({_id},function (err,result) {
        if(err){
            req.session.err=err
        }
        else{
            console.log('shanchu')
            req.session.success = '删除成功!';
            //res.redirect('http://'+req.headers.host)//删除完返回首页
            res.send({err:0})
        }
    })
})


module.exports = router;