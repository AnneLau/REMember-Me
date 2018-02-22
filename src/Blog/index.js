import React from 'react'
import $ from 'jquery'
import { Router, Route, browserHistory ,Link,IndexRoute,Redirect } from 'react-router';
import ArticleAdd from './article/add'
import UserSignup from './user/signup'
import UserSignin from './user/signin'
import Navs from  './Navs/index'
import IndexContainer from './IndexContainer/index'
import ArticelDetail from './article/detail'
import localUser from './localUser'
export default class  extends React.Component{
    constructor(props){
        super(props)
        this.state={localUser:null,articles:[],err:null,success:null,superAdmin:null};
    }
    changeAdmin(superAdmin){
        console.log(this,'ex222222222222')
        this.setStae({superAdmin:'superAdmin111111'})
        console.log(superAdmin,'admin')
    }
    ComponentDidUpdate(){
        console.log(this,'ex11111111111')
        this.setState({superAdmin:'aaaa'})
    }
    render(){

        return(
            <Router history={browserHistory} >
                <Route path='/' component={Navs} changeAdmin={this.changeAdmin.bind(this)} >
                    <IndexRoute component={IndexContainer} ></IndexRoute>
                    <Route path='user/signup' component={UserSignup}></Route>
                    <Route path='user/signin' component={UserSignin}></Route>
                    <Route path='article/add' component={ArticleAdd}></Route>
                    <Route path='article/detail/:id' component={ArticelDetail} />
                    <Route path='article/update/:id' component={ArticleAdd}></Route>
                </Route>
            </Router>
        )
    }
}