var express=require('express')
var router=express.Router()
var Article=require('../db').Article
var path=require('path')
var getEastDay=require('./store/getEastday')

/*router.get('/',function (req,res) {
    res.sendFile(path.resolve('./build/index.html'))
})*/
 router.get('/localUser',function (req,res) {
     console.log(req.session.user,'00000')

     res.send({localUser:req.session.user,err:req.session.err,success:req.session.success})
 })
 router.get('/getEastday',function (req,res) {
     getEastDay(function (data) {
         res.send(data)
     })
 })
module.exports=router