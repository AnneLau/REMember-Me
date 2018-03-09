import React from 'react'
export default class UserSignup extends React.Component{
    constructor(props){
        super(props)
    }
    handleClick(e){
        let refs=this.refs
        let username=refs.username.value
        let password=refs.password.value
        let email=refs.email.value
        if(username&&password&&email){
           e.target.type='submit'
        }
        else{
            alert('username、email、password都不能为空')
        }
    }
    render(){
        return (
            <form role="form" method="post" className="col-md-6 col-md-offset-3 " encType="multipart/form-data" action="/users">
                <div className="form-group">
                    <label htmlFor="username">账号</label>
                    <input type="text" name="username" ref="username" className="form-control" placeholder="Pick a username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">邮箱</label>
                    <input type="text" name="email" ref="email" className="form-control" placeholder="Your email address" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">密码</label>
                    <input type="text" name="password" ref="password" className="form-control" placeholder="Create a password" />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar" className="col-md-2 control-label">上传头像</label>
                    <input type="file" name="avatar" className="form-control" id="avatar" />
                </div>
                <button type="button" onClick={this.handleClick.bind(this)}  className="form-group btn btn-success col-md-12 btn-bs">Sign up</button>
                {/*{<script>
                    document.querySelector('button').onclick=function () {
                        var name=document.querySelector('#username').value,
                        pass=document.querySelector('#password').value,
                        email=document.querySelector('#email').value;
                        if(name&&pass&&email){
                            document.querySelector('form').submit()
                        }
                    }
                </script>}*/}
            </form>
        )
    }
}
