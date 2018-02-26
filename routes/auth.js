//要求后续的路由只能登陆后才能访问，如果未登录，让他去登陆
var path=require('path')
function checkLogin(req,res,next) {
    if(req.session.user){
        next()
    }
    else{
        res.sendFile(path.resolve('build/index.html'))

    }
}
function checkNoLogin(req,res,next) {
    if(req.session.user){
        res.sendFile(path.resolve('build/index.html'))

    }
    else{
        next()
    }

}

exports.checkLogin=checkLogin
exports.checkNoLogin=checkNoLogin