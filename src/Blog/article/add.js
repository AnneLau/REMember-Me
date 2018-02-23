import React from 'react'
import $ from 'jquery'
export default class ArticleAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={valueTitle:'',valueContent:''}
    }
    componentWillMount(){
        if(this.props.params.id){
            $.get(`get/${this.props.params.id}`).then((article)=>{
                this.setState({valueTitle:article.title,valueContent:article.content})
            })
        }
    }
    handleChangeT(e){
        this.setState({valueTitle:e.target.value})
    }
    render(){
        return (
            <form role="form" className="form col-md-9" method="post">
                <div>{this.state.defaultTitle}</div>
                <div className="form-group">
                    <label htmlFor="title" className="col-md-2">标题</label>
                    <input type="text" className="col-md-10" name="title" id="title" value={this.state.valueTitle}  onChange={this.handleChangeT.bind(this)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="contain" className="col-md-2">正文</label>
                    <textarea cols="30" rows="10" className="col-md-10" name="content" id="contain" value={this.state.valueContent} onChange={this.handleChangeT.bind(this)}></textarea>
                </div>

                <button type="submit" className="btn btn-default block"  >提交</button>
            </form>
        )
    }
}
