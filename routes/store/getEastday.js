var request=require('request')
var conv=require('iconv-lite')//转码的
var fs=require('fs')
var cheerio=require('cheerio')
var url='https://mini.eastday.com/tech.html'
let arr=[]
var getEastday=function (cb) {
    request({url,encoding:null},function (err,response,body) {
        body=conv.decode(body,'utf-8')
        //console.log(body)
        let $=cheerio.load(body)
        $('#hoursListNews li').each(function () {
            let obj={}
            let $item=cheerio.load(this)
            let href='https://mini.eastday.com/'+$item('a').attr('href')
            let title=$item('a').attr('title')
            obj={href,title}
            arr.push(JSON.stringify(obj))
        })
        cb(arr)
    })

}
module.exports =getEastday