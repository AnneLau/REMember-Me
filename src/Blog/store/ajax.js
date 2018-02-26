import $ from 'jquery'
var store= {
    del(id,cb){
        $.delete('/articles/'+id).then(
            (data)=>{
                cb&&cb(data)
            }
        )
    },

}
export default store
