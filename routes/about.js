var express=require('express')
var router=express.Router()
var app=express()
var path=require('path')
router.get('/',function (req,res) {
    console.log(1122)
    res.render('about')
})
module.exports = router;