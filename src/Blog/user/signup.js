import React from 'react'
export default class UserSignup extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <form role="form" method="post" className="col-md-6 col-md-offset-3 " encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="username">账号</label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="Pick a username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">邮箱</label>
                    <input type="text" name="email" id="email" className="form-control" placeholder="Your email address" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">密码</label>
                    <input type="text" name="password" id="password" className="form-control" placeholder="Create a password" />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar" className="col-md-2 control-label">上传头像</label>
                    <input type="file" name="avatar" className="form-control" id="avatar" />
                </div>
                <button type="submit"  className="form-group btn btn-success col-md-12 btn-bs">Sign up</button>
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
