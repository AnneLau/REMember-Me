import React,{Component} from 'react';
export default class CommentForm extends Component{
    constructor(props){
        super(props);
        //当创建实例的时候，直接把需要用的方法里的this绑死到当前组件实例上
       this.addComment = this.addComment.bind(this);
       this.handleKeyDown = this.handleKeyDown.bind(this);
       //如果ctrl按下了，那么就设置为true
        this.ctrl = false;
    }
    addComment(){
        var content = this.refs.content.value;
        this.props.addComment({name,content});
        this.refs.content.value = '';
    }
    handleKeyDown(event){
        var code = event.keyCode;
        if(code == 17){
            this.ctrl = true;
            setTimeout(()=>{
                this.ctrl = false;
            },1000);
        }
        if(code == 13){
            if(this.ctrl ){
                this.refs.content.value = this.refs.content.value+'\n';
            }else{
                this.addComment();
            }
        }
    }
    render(){
        return (
            <form className="form-horizontal" role="form">

                <div className="form-group">
                    <label className="control-label  col-md-1" htmlFor="content">内容</label>
                    <div className="col-md-11">
                        <textarea ref="content" name="content" id="content" cols="30" rows="10" className="form-control" onKeyDown={this.handleKeyDown} ></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-1 col-md-11">
                        <button onClick={this.addComment.bind(this)} type="button" className="btn btn-primary">发言</button>
                    </div>
                </div>
            </form>
        )
    }
}