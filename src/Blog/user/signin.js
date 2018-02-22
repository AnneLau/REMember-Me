import React from 'react'
export default class UserSignin extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
                <form role="form" method="post" className="col-md-4 col-md-offset-8">
                    <div className="form-group">
                        <label htmlFor="username">账号</label>
                        <input type="text" name="username" id="username" className="form-control btn-lg" placeholder="Pick a username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">密码</label>
                        <input type="text" name="password" id="password" className="form-control btn-lg" placeholder="Create a password"/>
                    </div>
                    <button type="submit" className="btn btn-success col-md-12 btn-md">Sign In</button>
                </form>
        )
    }
}
