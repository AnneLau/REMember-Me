var userAjax={
    postUser(data,cb){
        fetch('/test',{
            method:'post',
            credentials: 'include',
            body:JSON.stringify({a:1,b:2}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((data)=>data.json())
            .then((data)=>{
                console.log(data)
            })

    }
}

export default userAjax