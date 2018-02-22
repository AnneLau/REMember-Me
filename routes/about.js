var express=require('express')
var router=express.Router()
var app=express()
var path=require('path')
router.use(express.static(path.resolve('./views'),{index:'about.html'}))
module.exports = router;