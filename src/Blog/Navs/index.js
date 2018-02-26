import React from 'react'
import $ from 'jquery'
import { Router, Route, browserHistory ,Link,IndexRoute } from 'react-router';
import local from '../store/local'
import commentAjax from '../store/commentAjax'
import store from '../store/ajax'

class Navs extends React.Component{
    constructor(props){
        super(props)
        this.state ={localUser:null,err:null,success:null,isSuper:false,bread:null}
    }
    componentWillMount(){
        $.get('/localUser').then((data)=>{
            console.log(data,'localuser')
            this.setState({localUser:data.localUser,err:data.err,success:data.success})
            local.set(data.localUser)
            //判断超级是否是超级用户
            var user=local.query()
            if(user){
                this.setState({isSuper:user.username=='simba'})
            }
            else{
                this.setState({isSuper:false})
            }
        })

    }
    handleClick(){
        fetch('/session',{method:'delete'})
            .then( (res)=> {
                return res.json()
            })
            .then( (res)=>{
                if(res.err==0){
                    local.del()
                    console.log(local.query(),11111)
                    this.setState({localUser:null,isSuper:false})
                }
            })
        /*$.delete('/session').then((data)=>{
            if(data.err==0){
                local.del()
                this.setState({localUser:null,isSuper:false})
            }

        })*/
    }
    changeBread(bread){
        this.setState({bread:bread})
    }
    render(){
        const Login = ()=>{
            return (<div>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/about">Simba Blog</a>
                        </div>
                        <ul className="nav navbar-nav col-md-11 " >
                            <li ><Link activeStyle={{background:"#e7e7e7"}} to="/">首页</Link></li>
                            <li><Link activeStyle={{background:"#e7e7e7"}} to="/article/add">发表文章</Link></li>
                            <li className="navbar-right btn-group">
                                <Link   activeStyle={{background:"#e7e7e7"}} className="dropdown-toggle col-md-12" data-toggle="dropdown" >
                                    <img src={this.state.localUser.avatar} />
                                    <span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" >
                                    <li><Link  activeStyle={{background:"#e7e7e7"}} to={`/users/${this.state.localUser._id}`}>个人主页</Link></li>
                                    <li><Link   onClick={this.handleClick.bind(this)}>退出</Link></li>
                                </ul>
                            </li>
                            <li className="navbar-right"><Link activeStyle={{background:"#e7e7e7"}}  to="/user/new">注册</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>)
        }
        const NoLogin = ()=>{
            return ( <div>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/about">Simba Blog</Link>
                        </div>
                        <ul className="nav navbar-nav col-md-11 " >
                            <li ><Link activeStyle={{background:"#e7e7e7"}}  to="/">首页</Link></li>
                            <li className="navbar-right" ><Link activeStyle={{background:"#e7e7e7"}}  to="/user/new">注册</Link></li>
                            <li className="navbar-right"><Link activeStyle={{background:"#e7e7e7"}}  to="/session">登录</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>)
        }
        /*var NavsChild=()=>{

            return (
                <div className="container">
                    {React.cloneElement(this.props.children,{isSuper:this.state.isSuper,localUser})}
                </div>
            )
        }*/
        console.log(local.query(),'shouye')

        return (
            <div>
                {this.state.localUser? <Login/>: <NoLogin/>}
                {/*<NavsChild />*/}
                <ol className="breadcrumb container">
                    <li><a href="/">Home</a></li>
                    <li className="active">{this.state.bread}</li>
                    {/*<li className="active">十一月</li>*/}
                </ol>
                <div className="container">{React.cloneElement(this.props.children,{isSuper:this.state.isSuper,localUser:this.state.localUser,local,commentAjax,store,changeBread:this.changeBread})}</div>
            </div>
        )
    }
};

export default Navs