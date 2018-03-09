import React from 'react'

export default class extends React.Component{
    constructor(props){
        super(props)
        this.state={judge:false}

    }
    handleChange(e){
        if(e.target.value==this.props.localUser.password){
            this.setState({judge:true})
        }
        else{
            this.setState({judge:false})
            this.refs.btn.className='btn btn-default col-md-3 btn-md'
        }
    }
    handleChange1(e){
        if(e.target.value&&this.state.judge){
            this.refs.btn.className='btn btn-primary col-md-3 btn-md'
        }
        else{
            this.refs.btn.className='btn btn-default col-md-3 btn-md'
        }
    }
    handleClick(){
        if(!this.state.judge)return
        let newPassword=this.refs.new.value
        let data=`newPassword=${newPassword}`
        fetch(this.props.location.pathname,{
            method:'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body:data,
            credentials: 'include'
        })
            .then((data)=>data.json())
            .then((data)=>{
                if(data.err==0){
                    this.props.setStateuser(data.user)
                    this.props.setSuper(data.user)
                    this.props.router.push('/')
                }
            })
    }
    render(){
        return (
            <div className="container">
                <form role="form" className="form col-md-3" >
                    <div className="form-group has-feedback" >
                        <label htmlFor="oldPassword">旧密码</label>
                        <input type="text" onChange={this.handleChange.bind(this)} className="form-control btn-lg " ref="old" name="oldPassword"/>
                        {this.state.judge?<span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>:null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">新密码</label>
                        <input type="text" ref="new" autoComplete="off" onChange={this.handleChange1.bind(this)} className="form-control btn-lg col-md-10" name="password"/>
                    </div>
                    <button ref="btn" type="button" onClick={this.handleClick.bind(this)} style={{marginTop:'15px'}} className="btn btn-default col-md-3 btn-md">提交</button>
                </form>
            </div>
        )
    }
}