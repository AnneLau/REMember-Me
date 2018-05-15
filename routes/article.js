var express=require('express')
var router=express.Router()
var Article=require('../db').Article
var path=require('path')
var getArticles=require('./store/getArticles')
var getArticle=require('./store/getArticle')
router.route('/')
    .all(function (req,res,next) {

        next()
    })
    .get(function (req,res) {
        Article.find({}).populate('user').exec(function (err,articles) {
            getArticles((otherArticles)=>{
                articles=articles.concat(otherArticles)
                res.send(articles)
            })
        })

    })
    .post(function (req,res) {
        var body=req.body
        body.user=req.session.user._id//article~~~~~~~~~~~~~~~~~~~~~~~~
        body.createAt=new Date().toLocaleString()
        console.log(body)
        Article.create(body,function (err,doc) {
            if(err){
                req.session.err=err
                res.redirect('back')
            }
            else{
                req.session.success='发布成功'
                console.log('chengg')
                res.send({err:0})
            }
        })
    })
router.route('/p/:_id')
    .get(function (req,res) {
        var _id=req.params._id
        _id='/p/'+_id
        getArticle(_id,function (article) {
            res.send(article)
        })
    })
router.route('/:_id/times/:times')
    .post(function (req,res) {
        var _id=req.params._id
        var times=req.params.times
        Article.update({_id},{$set:{times:++times}},function (err,article) {
            if(err){
                req.session.err=err
                //可能会出问题。。。。。。。。。。。。。。。。。
                res.redirect('back')
            }
            if(article){
                //res.redirect('/article/detail/'+req.params._id);
                res.send({err:0})
            }
        })
    })
router.route('/:_id')
    .all(function (req,res,next) {
        console.log(req.params._id)
        next()
    })
    .get(function (req,res) {
        var _id=req.params._id
        Article.findById(_id).populate('user').exec(function(err,article){
            res.send(article)
        })
    })
    .put(function (req,res) {
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

/*var user1,user2
Article.findById('58ce34b8e098bf150c89dc17',function(err,article){
    //res.render('article/detail',{title:'文章详情',article});
    console.log(typeof article.title,1111111111)
    user1=article.user
    Article.find({},function (err,articles) {
        user2=articles[0].user
        console.dir(user1)
        console.dir(user2)
    })
})*/


module.exports = router;