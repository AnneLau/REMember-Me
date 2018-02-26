import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router'
import CommentBox from '../CommentBox';
export default class ArticleDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={article:{},localUser:null,err:null,success:null}
    }
    componentWillMount(){
        $.get(`/articles/${this.props.params.id}`).then((article)=>{/////////////////////////路径
            this.setState({article})
        })
        this.setState({localUser:this.props.localUser})
    }

    del(id){
        this.props.store.del(id,(data)=>{
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
                    {(this.props.localUser&&this.props.localUser._id==this.state.article.user)||this.props.isSuper?<UserOption/>:null}
                    <div dangerouslySetInnerHTML={Script1}/>
                    <div dangerouslySetInnerHTML={Script2}/>
                </div>
                <CommentBox commentAjax={this.props.commentAjax} isSuper={this.props.isSuper} local={this.props.local}/>

            </div>
        )
    }
}