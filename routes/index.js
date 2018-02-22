 var express=require('express')
var router=express.Router()
var Article=require('../db').Article
var path=require('path')
router.get('/',function (req,res) {
    //populate指的是填充，用于吧当前对象的一个属性从对象id转为对象类型
    console.log(path.resolve('./build/index.html'))
    console.log(11)
    res.sendFile(path.resolve('./build/index.html'))
})
 router.get('/localUser',function (req,res) {
     res.send({localUser:req.session.user,err:req.session.err,success:req.session.success})
 })
module.exports=router