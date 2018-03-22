const COMMENTS = 'COMMENTS';
var commentAjax= {
    //增加一条新的留言
    add(comment,cb){
        fetch('/comments',{
            method:'post',
            credentials: 'include',
            body:JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data)=>data.json())
            .then((data)=>{
                cb&&cb(data)
            })
    },
    //移除一个留言
    delete(id,cb){
        fetch(`/comments/${id}`,{method:'delete',credentials: 'include'})
            .then((data)=>data.json())
            .then((data)=>{
                cb&&cb(data)
            })
    },
    //查询所有留言 如果有，则转成对象数组，如果没有则返回空数组
    // localStorage只能存放字符串
    query(cb){
        fetch('/comments',{credentials: 'include'})
            .then((data)=>data.json())
            .then((data)=>{
                cb&&cb(data)
            })
    }
}
export default commentAjax