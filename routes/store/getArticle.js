var request=require('request')
var conv=require('iconv-lite')//转码的
var fs=require('fs')
var cheerio=require('cheerio')
var host='http://www.jianshu.com'
let arr=[]
var getArticle=function (id,cb) {
    let url=host+id
    request({url,encoding:null},function (err,response,body) {
        body=conv.decode(body,'utf-8')
        let $=cheerio.load(body)
        let title=$('.note .post .article .title').text()
        let html=$('.note .post .article .show-content').html()
        //由&#x5730;&#x5411;&#x524D;&#x51B2;转为汉子
        let $info=$('.note .post .article .info')
        let username=$info.find('.name a').text()
        let createAt=$info.find('.publish-time').text()
        console.log(html)
        let article={title,html,originUrl:url,user:{username},createAt}
        cb&&cb(article)
    })
}
module.exports =getArticle