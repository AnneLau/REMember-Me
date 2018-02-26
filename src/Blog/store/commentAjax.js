const COMMENTS = 'COMMENTS';
var $ = require('jquery');
//const host="123.57.223.74"
const host="localhost"
var commentAjax= {
    //增加一条新的留言
    add(comment,cb){
        console.log(comment)
        $.post(`/comments`,comment).done(function (data) {
            cb&&cb(data)
        })
    },
    //移除一个留言
    delete(id,cb){
        $.ajax({
            url:`http://${host}:29323/comments/${id}`,
            type:'delete',
        }).done(function (data,b) {
            cb&&cb(data)
        })
    },
    //查询所有留言 如果有，则转成对象数组，如果没有则返回空数组
    // localStorage只能存放字符串
    query(cb){
        console.log('获取留言')
        $.get(`/comments`).done(function (data) {
            cb&&cb(data)
        })
    }
}
export default commentAjax