var articleAjax= {
    del(id,cb){
        fetch(`/articles/${id}`,{method:'delete'})
            .then((res)=>res.json())
            .then((data)=>{
                cb&&cb(data)
            })
    },
    get(id,cb){
        fetch(`/articles/${id}`,{method:'get'})
            .then((res)=>res.json())
            .then((article)=>{
                console.log(article)
                cb&&cb(article)
            })
    },
    getAll(cb){
        fetch('/articles',{credentials: 'include'})
            .then((res)=>res.json())
            .then((articles)=>{
                cb&&cb(articles)
            })
    },
    add(article,cb){
        fetch('/articles',{
            method:'post',
            credentials: 'include',
            body:JSON.stringify(article),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data)=>data.json())
            .then((data)=>{
                cb&&cb(data)
            })

    },
    update(id,article,cb){
        fetch('/articles'+id,{
            method:'put',
            credentials: 'include',
            body:JSON.stringify(article),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data)=>data.json())
            .then((data)=>{
                cb&&cb(data)
            })
    }

}
export default articleAjax
