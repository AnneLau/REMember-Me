import React from 'react'
export default class IndexRight extends React.Component{
    constructor(){
        super()
        this.state={news:[]}
    }
    componentWillMount(){
        fetch(new Request('/getEastday')).then( (response)=> {
            return response.json()
        }).then( (response)=>{
            let news=response.filter(function (item,index) {
                return index<=9
            })
            this.setState({news})
        })
    }
    render(){
        return (
            <div>
                <h2>最新动态</h2>
                {this.state.news.map((item,index)=>{
                    return <a style={{display:'block',margin:'2px auto'}} key={index} href={JSON.parse(item).href}>{JSON.parse(item).title}</a>
                })}

            </div>
        )
    }
}