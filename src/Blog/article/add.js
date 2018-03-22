import React from 'react'
import Showdown from 'showdown'
let converter=new Showdown.Converter()
let toHtml=function (text) {
    return converter.makeHtml(text);
}
export default class ArticleAdd extends React.Component{
    constructor(props){
        super(props)
        this.state={valueTitle:'',valueContent:'',html:''}
    }
    componentWillMount(){
        if(this.props.params.id){
            this.props.articleAjax.get(this.props.params.id,(article)=>{
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
        this.setState({valueContent:e.target.value,html:toHtml(e.target.value)})

    }
    toText(html,cb) {
        let reg1=/<(p|a|h1|h2|h3|h4|h5|span|div)[^>]*>/
        let reg2=/<\/(p|a|h1|h2|h3|h4|h5|span|div)>/
        html=html.replace(reg1,'')
        html=html.replace(reg2,'')
        if(reg1.test(html)||reg2.test(html)){
            this.toText(html,cb)
        }
        else{
           cb(html)
        }
    }
    handleClick(e){
        if(this.state.valueTitle&&this.state.valueContent){
            let description
            let title=this.state.valueTitle
            let html=this.state.html
            let content=this.state.valueContent
            this.toText(html,(text)=>{
                description=text.replace(/\n/,' ')
                description=description.slice(0,100)
            })
            let article={title,content,description,html}

            //修改
            if(this.props.params.id){
                console.log('add')
                this.props.articleAjax.update(this.props.params.id,article,function (data) {
                    if(data.err==0)this.props.router.push(`/article/detail/${this.props.params.id}`)
                })
                return
            }
            //新增
            this.props.articleAjax.add(article,(data) =>{
                if(data.err==0){
                    this.props.router.push('/')
                }
            })

        }
        else{
            alert('内容不能为空')

        }
    }
    render(){
        return (
            <div className="clearfix" style={{}}>
                <input type="text" className="col-md-12"  value={this.state.valueTitle}  onChange={this.handleChangeT.bind(this)} placeholder="请输入标题"/>
                        <textarea placeholder="在此键入。使用markdown，或html格式。"  className="col-md-6 edit-input"  value={this.state.valueContent} onChange={this.handleChangeC.bind(this)}></textarea>
                <div style={{border:'1px solid gray'}} className="col-md-6 edit-view" dangerouslySetInnerHTML={{__html:this.state.html}}></div>
                <button type="button" onClick={this.handleClick.bind(this)}  className="btn btn-default block  col-md-2"  >提交</button>
            </div>
        )
    }
}
