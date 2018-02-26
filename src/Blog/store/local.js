var local={
    del(){
        localStorage.removeItem('LOCALUSER')
    },
    set(LOCALUSER){
        localStorage.setItem('LOCALUSER',JSON.stringify(LOCALUSER))
    },
    query(){
        var str=localStorage.getItem('LOCALUSER')
        if(str=='undefined'){
            return false
        }
        return str?JSON.parse(str):false
    }
}
export default local