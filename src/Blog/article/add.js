import React from 'react'
import showndown from 'showdown'
let converter=new Showdown.converter()
export default class ArticleAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={valueTitle:'',valueContent:'',formAction:'/articles'}
    }
    componentWillMount(){
        if(this.props.params.id){
            this.props.store.get(this.props.params.id,(article)=>{
                this.setState({valueTitle:article.title,valueContent:article.content})
            })
            fetch(`/articles/${this.props.params.id}`,{method:'get'})
                .then((res)=>res.json())
                .then((article)=>{
                    this.setState({valueTitle:article.title,valueContent:article.content})

                })
            this.setState({formAction:`/articles/${this.props.params.id}`})
        }
    }
    handleChangeT(e){
        this.setState({valueTitle:e.target.value})
    }
    handleChangeC(e){
        this.setState({valueContent:e.target.value})
    }
    handleClick(e){
        if(this.state.valueTitle&&this.state.valueContent){
            e.target.type='submit'

        }
        else{
            alert('内容不能为空')

        }
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
                    <textarea cols="30" rows="10" className="col-md-10" name="content" id="contain" value={this.state.valueContent} onChange={this.handleChangeC.bind(this)}></textarea>
                </div>

                <button type="button" onClick={this.handleClick.bind(this)} formAction={this.state.formAction} className="btn btn-default block"  >提交</button>
            </form>
        )
    }
}
