import React from 'react'
import $ from 'jquery'
import { Router, Route, browserHistory ,Link,IndexRoute,Redirect } from 'react-router';
import ArticleAdd from './article/add'
import UserSignup from './user/signup'
import UserSignin from './user/signin'
import Navs from  './Navs/index'
import IndexContainer from './IndexContainer/index'
import ArticelDetail from './article/detail'
import UpdatePassword from './user/update'
export default class  extends React.Component{
    constructor(props){
        super(props)
        this.state={localUser:null,articles:[],err:null,success:null,superAdmin:null};
    }
    render(){
        {{/*怎么给Navs传props``````````````````````````*/}}
        return(
            <Router history={browserHistory} >
                <Route path='/' component={Navs}  >
                    <IndexRoute  component={IndexContainer} ></IndexRoute>
                    <Route path='user/new' component={UserSignup}></Route>
                    <Route path='session' component={UserSignin}></Route>
                    <Route path='article/add' component={ArticleAdd}></Route>
                    <Route path='article/detail/:id' component={ArticelDetail}  />
                    <Route path='article/update/:id' component={ArticleAdd}></Route>
                    <Route path='users/:id' component={UpdatePassword}></Route>
                </Route>
            </Router>
        )
    }
}