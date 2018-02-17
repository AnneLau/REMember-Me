var express=require('express')
var app=express()
var path=require('path')
var history = require('connect-history-api-fallback');
var bodyParser=require('body-parser')//需要安装
var session=require('express-session')//安装
//解决服务器重启 数据丢失

var MongoStore=require('connect-mongo')(session)
//静态文件根目录
app.use(express.static(path.resolve('./build')));
app.use(express.static(path.resolve('./public')));
app.use(express.static(path.resolve('./views')))
app.use(express.static(path.resolve('../node_modules')))
//获取user.js中req.body的中间件 extend处理查询字符串格式的请求体。会把这个字符串转成对象放在req.body上。
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//同源
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE');
    next();
})
//使用session
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'simba',
    //session非常灵活，可以把session数据存在指定位置，默认是放在服务器的内存中，但也可以放在mongo数据库里
    store:new MongoStore({
        url:'mongodb://127.0.0.1/blog'
    })
}))
//res.locals是真正的渲染对象
var react=require('react')
app.use(function (req,res,next) {
    //res.locals.err=req.session.err
    //res.locals.success=req.session.success
    req.session.err=null
    req.session.success=null
    //res.locals.user=req.session.user
    next()
})
//模板后缀
app.set('view engine','html')
//模板根目录
app.set('views',path.resolve('../views'))
var user=require('./routes/user')
var article=require('./routes/article')
var index=require('./routes/index')
var about=require('./routes/about')
var comment=require('./routes/comment')
//解决刷新找不到的问题

app.use('/',index)

app.use('/user',user)
app.use('/article',article)
app.use('/comments',comment)
app.use(history())

app.use('/about',about)
/*app.use('*',function (req,res) {
    res.redirect(path.resolve('index.html'))
})*/
app.get('*',function (req,res) {
    res.sendFile(path.resolve('./build/index.html'))
})
app.listen(29323)