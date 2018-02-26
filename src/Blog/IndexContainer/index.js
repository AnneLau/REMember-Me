import React from  'react'
import $ from 'jquery'
import {Link} from 'react-router'
import Whether from '../Whether'
import IndexRight from '../IndexRight'
export default class IndexContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={articles:[]}
    }
    componentWillMount(){
        $.get('/articles').then(
            (articles)=>{
                this.setState({articles})
            }
        )
    }
    render(){
        return (
            <div>



                <div className="col-md-6 col-md-offset-1">
                    {this.state.articles.map((item,index)=>(
                        <div className="media table table-bordered" key={index}>
                            <a href="#" className="media-left">
                                <img src={item.user.avatar} />
                            </a>
                            <div className="media-body btn-link">
                                <h4><Link to={"article/detail/"+item._id}>{item.title}</Link></h4>
                                <p><Link to={"article/detail/"+item._id}>{item.content}</Link></p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pull-right col-md-3 ">
                    <IndexRight />
                </div>
                {/*<Whether/>*/}
            </div>
        )
    }
}