import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'
import store from '../store/index'
import CommentBox from '../CommentBox';
import commentAjax from '../store/commentAjax'
import localUser from '../localUser'
export default class ArticleDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={article:{},localUser:null,err:null,success:null}
        console.log(this.props,'2222222')
        console.log(this.props.route.superAdmin,'333333')
        console.log(this.props.routes,'4444')
    }
    componentWillMount(){

        $.get(`get/${this.props.params.id}`).then((article)=>{/////////////////////////路径
            this.setState({article})
        })
        $.get('/localUser').then((data)=>{
            this.setState({localUser:data.localUser,err:data.err,success:data.success})
            localUser.set(data.localUser)
        })

    }

    del(id){
        store.del(id,(data)=>{
            if(data.err==0){
                this.props.router.push('/')
            }
        })
    }
    render(){
        const Script1={
            __html:'<script src="//cdn.bootcss.com/markdown.js/0.5.0/markdown.min.js"></script>'
        }
        const Script2={
            __html:`<script>
                function mk() {
                var mk=document.querySelector('#mk')
                    mk.innerHTML=markdown.toHTML(mk.innerHTML);
                }
                mk()
            </script>`
        }
         var UserOption=()=>(
            <div className="panel-footer">
                <Link to={"/article/update/"+this.state.article._id} className="btn btn-warning" >修改</Link>
                <a onClick={()=>{this.del(this.state.article._id)}} className="btn btn-danger">删除</a>
            </div>
        )
        return(
            <div className="col-md-6 ">
                <div className="panel panel-default">
                    <div className="panel-heading" >
                        {this.state.article.title}
                    </div>
                    <div className="panel-body " id="mk">{this.state.article.content}</div>
                    {this.state.localUser&&this.state.localUser._id==this.state.article.user?<UserOption/>:null}
                    <div dangerouslySetInnerHTML={Script1}/>
                    <div dangerouslySetInnerHTML={Script2}/>
                </div>
                <CommentBox store={commentAjax} superAdmin={this.props.route.superAdmin}/>

            </div>
        )
    }
}