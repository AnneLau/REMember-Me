import React from 'react'
import { Router, Route, browserHistory ,Link,IndexRoute } from 'react-router';
import local from '../store/local'
import commentAjax from '../store/commentAjax'
import articleAjax from '../store/articleAjax'

class Navs extends React.Component{
    constructor(props){
        super(props)
        this.state ={localUser:null,err:null,success:null,isSuper:false,bread:null}
    }
    componentWillMount(){
        fetch('/localUser',{credentials: 'include'})
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                this.setState({localUser:data.localUser,err:data.err,success:data.success})
                local.set(data.localUser)
                //判断超级是否是超级用户
                var user=local.query()
                if(user){
                    this.setSuper(user)
                }
                else{
                    this.setState({isSuper:false})
                }
            })

    }
    setStateuser(localUser){
        this.setState({localUser})
    }
    setSuper(user){
        this.setState({isSuper:user.username=='simba'})
    }
    handleClick(){
        fetch('/session',{method:'delete',credentials:'include'})
            .then( (res)=> {
                return res.json()
            })
            .then( (res)=>{
                if(res.err==0){
                    local.del()
                    this.setState({localUser:null,isSuper:false})
                }
            })
    }
    render(){
        const Login = ()=>{
            return (
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/about">Simba Blog</a>
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#top-nav">
                                <span className="sr-only">切换导航</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="top-nav">
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
                    </div>
                </nav>
            )
        }
        const NoLogin = ()=>{
            return (
                <nav className="navbar navbar-default navbar-fixed-top " role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/about">Simba Blog</a>
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#top-nav">
                                <span className="sr-only">切换导航</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="top-nav">
                            <ul className="nav navbar-nav col-md-11 " >
                                <li ><Link activeStyle={{background:"#e7e7e7"}}  to="/">首页</Link></li>
                                <li className="navbar-right" ><Link activeStyle={{background:"#e7e7e7"}}  to="/user/new">注册</Link></li>
                                <li className="navbar-right"><Link activeStyle={{background:"#e7e7e7"}}  to="/session">登录</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
        /*var NavsChild=()=>{

            return (
                <div className="container">
                    {React.cloneElement(this.props.children,{isSuper:this.state.isSuper,localUser})}
                </div>
            )
        }*/

        return (
            <div>
                {this.state.localUser? <Login/>: <NoLogin/>}
                {/*<NavsChild />*/}

                <div className="container main">
                    {React.cloneElement(this.props.children,{isSuper:this.state.isSuper,localUser:this.state.localUser,setStateuser:this.setStateuser.bind(this),setSuper:this.setSuper.bind(this),local,commentAjax,articleAjax})}
                    </div>
            </div>
        )
    }
};

export default Navs