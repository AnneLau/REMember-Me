var store= {
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
    }

}
export default store
