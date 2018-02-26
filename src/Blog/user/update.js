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
            this.refs.btn.type=''
        }
    }
    handleChange1(e){
        console.log(this.state.judge)

        console.log(e.target.value)
        if(e.target.value&&this.state.judge){
            this.refs.btn.className='btn btn-primary col-md-3 btn-md'
            this.refs.btn.type='submit'
        }
        else{
            this.refs.btn.className='btn btn-default col-md-3 btn-md'
            this.refs.btn.type=''
        }
    }

    render(){
        console.log(this.state.judge,'xx')
        return (
            <div className="container">
                <form role="form" className="form col-md-3" method="post">
                    <div className="form-group has-feedback" >
                        <label htmlFor="oldPassword">旧密码</label>
                        <input type="text" onChange={this.handleChange.bind(this)} className="form-control btn-lg " name="oldPassword"/>
                        {this.state.judge?<span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>:null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">新密码</label>
                        <input type="text" autoComplete="off" onChange={this.handleChange1.bind(this)} className="form-control btn-lg col-md-10" name="password"/>
                    </div>
                    <button  ref="btn" style={{marginTop:'15px'}} className="btn btn-default col-md-3 btn-md">提交</button>
                </form>
            </div>
        )
    }
}