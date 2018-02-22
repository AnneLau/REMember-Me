var {Comment,User}=require('../db')
var express=require('express')
var router=express.Router()
var auth=require('./auth')


var getName=function (_id,cb) {
    User.findById(_id,function(err,user){
        cb(user.username)
    })
}
//增加留言
router.post('/',auth.checkLogin,function(req,res){
    console.log('add')
    var comment=req.body
    comment.user=req.session.user._id
    //comment.article=id
    var article=/\/(\w+)$/.exec(req.headers.referer)[1]
    comment.createAt=Date.now()
    comment.article=article
    Comment.create(comment,function (e,doc) {
        Comment.find({article},function (e,docs) {
            /*if(docs.length>0){
                docs=docs.map((item)=>{
                    getName(item.user,(name)=>{
                        console.log(name)
                        item.user=name
                    })
                })
            }*/
            res.send(docs)
        })
    })

});
//删除一条留言
router.delete('/:id',function(req,res){
    var id=req.params.id
    var article=/\/(\w+)$/.exec(req.headers.referer)[1]
    Comment.remove({_id:id},function (e,docs) {
        Comment.find({article},function(err,docs){
            res.send(docs);
        });
    })
});
//获取所有的留言
router.get('/',function(req,res){
    var article=/\/(\w+)$/.exec(req.headers.referer)[1]
    Comment.find({article},function (e,docs) {
        res.send(docs)
    })
});
module.exports = router;