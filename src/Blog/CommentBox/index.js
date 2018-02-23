// react 导出对象和默认导出对象都是React
import React,{Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { browserHistory  } from 'react-router';
import localUser from '../localUser';
export default class CommentBox extends Component{
    //props 代表当前组件的属性对象
    constructor(props){
        super(props);
        this.state={comments:[]}
        // 在es6中使用此方法初始化一个状态对象
        console.log(this.props.isSuper,'super')

    }
    //向状态 comments里增加一个新的对象
    //在es6中，组件方法里的this默认向指定null
    addComment(comment){
        console.log(localUser.query())
        if(!localUser.query()){
            browserHistory.push('/user/signin')////////////////////与this.props.router.push('/')
            console.log('qudenglu')
            return
        }
       this.props.store.add(comment,(comments)=>{
           this.setState({comments});
       });
    }
    //删除留言
    deleteComment(id){
        this.props.store.delete(id,(comments)=>{
            this.setState({comments})
        })
    }
    componentWillMount(){
        this.props.store.query((comments)=>{
            this.setState({comments})
        })


    }
    //在es6中，render里的this指向的是当前组件的实例
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="text-center">说点啥</h3>
                </div>
                <div className="panel-body">
                    <CommentList deleteComment={this.deleteComment.bind(this)} comments={this.state.comments} localUser={localUser} isSuper={this.props.isSuper}></CommentList>
                </div>
                <div className="panel-footer">
                    <CommentForm addComment={this.addComment.bind(this)}></CommentForm>
                </div>
            </div>
        )
    }
}
