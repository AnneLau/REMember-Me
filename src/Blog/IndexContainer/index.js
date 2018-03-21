import React from  'react'
import {Link} from 'react-router'
import Whether from '../Whether'
import IndexRight from '../IndexRight'
export default class IndexContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={articles:[]}
    }
    componentWillMount(){

        this.props.store.getAll((articles)=>{
            this.setState({articles})
        })
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
                                <h4>
                                    <Link to={"article/detail/"+item._id}>{item.title}</Link>
                                    <span className="badge">{item.times?item.times:1}</span>
                                </h4>
                                <p><Link to={"article/detail/"+item._id}>{item.description}</Link></p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pull-right col-md-3 ">
                    <IndexRight />
                    <Whether/>
                </div>

            </div>
        )
    }
}