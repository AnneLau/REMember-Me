import React,{Component} from 'react';
require('moment/locale/zh-cn.js');
import moment from 'moment';
import { findDOMNode } from 'react-dom';
export default class CommentList extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
   render(){
       return (
           <ul className="list-group">
               {
                   this.props.comments.length>0?this.props.comments.map((item,index)=>{
                        return(<li className="commentItem" key={index}>
                           <div >
                               <a className="text-p" href="###">{item.user}</a>说道:
                               { this.props.isSuper?<button  className="btn btn-danger btn-xs pull-right" onClick={()=>this.props.deleteComment(item._id)}>删除</button>:null}
                           </div>
                           <div className="commentContent">
                               {item.content}
                           </div>
                           <div className="pull-right" >
                               {moment(item.createAt).fromNow()}
                           </div>

                       </li>)
                   }):null
               }
           </ul>
       )
   }

}