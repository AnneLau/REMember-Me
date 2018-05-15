import React from 'react'
export default class UserSignin extends React.Component{
    constructor(props){
        super(props)
        this.state={username:null,password:null}
    }
    handleClick(){
        let username=this.state.username
        let password=this.state.password
        let data=`username=${username}&password=${password}`
        fetch('/session',{
            method:'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:data,
            credentials: 'include'
        })
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                if(data.err==0){
                    this.props.local.set(data.user)
                    this.props.setStateuser(data.user)
                    this.props.setSuper(data.user)
                    this.props.router.push('/')
                }else if(data.code==1){
                    this.props.setErr(data.err)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    render(){
        return (
                <form role="form"  className="col-md-4 col-md-offset-8" ref="login">
                    <div className="form-group">
                        <label htmlFor="username">账号</label>
                        <input type="text" name="username" onChange={(e)=>{this.setState({username:e.target.value})}} className="form-control btn-lg" placeholder="Pick a username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密码</label>
                        <input type="text" name="password" onChange={(e)=>{this.setState({password:e.target.value})}} className="form-control btn-lg" placeholder="Create a password"/>
                    </div>
                    <button type="button" onClick={this.handleClick.bind(this)} className="btn btn-success col-md-12 btn-md">Sign In</button>
                </form>
        )
    }
}
