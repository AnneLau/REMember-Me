import $ from 'jquery'
var store= {
    del(id,cb){
        $.get('/article/delete/'+id).then(
            (data)=>{
                cb&&cb(data)
            }
        )
    },

}
export default store
