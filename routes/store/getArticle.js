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
        let content=$('.note .post .article .show-content').html()
        let article={title,content,originUrl:url}
        cb&&cb(article)
    })
}
module.exports =getArticle