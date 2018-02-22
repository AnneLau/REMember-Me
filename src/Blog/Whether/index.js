import React from 'react'
import $ from 'jquery'
export default class Whether extends React.Component{
    constructor(){
        super()
        this.state={tq:null,qw:null,sd:null,fl:null,fx:null,lastUpdate:null}
    }
    componentWillMount(){
        var url='http://api.yytianqi.com/observe?city=CH010100&key=j53ohbe96m1qbkgl'
        // 直接发送请求进行调用，手动处理回调函数
        var that=this
        function setDate() {
            $.getJSON(url, function(data) {
                if(data.data){
                    data=data.data
                    console.log(this,1)
                    that.setState({
                        tq:data.tq,
                        qw:data.qw,
                        sd:data.sd,
                        fl:data.fl,
                        fx:data.fx,
                        lastUpdate:data.lastUpdate
                    })
                }
            });
        }
        setDate()
        setInterval(setDate,600000)
    }
    closeWhether(){
        this.refs.btn.style.display='none'
    }
    render(){

        return(
            <div ref="btn"  className="col-md-4 col-md-offset-9" style={{background:"#eee",padding:"10px",borderRadius:"8px",color:"#555",fontWeight:"600",overflow:"hidden"}}>
                <div className="text-center" style={{fontSize:"28px"}}>{this.state.tq}</div>
                <div>
                    <div style={{fontSize:"16px"}} className="col-md-6">气温：{this.state.qw}</div>
                    <div style={{fontSize:"16px"}} className="col-md-6">湿度：{this.state.sd}</div>
                </div>
                <div>
                    <div style={{fontSize:"16px"}} className="col-md-6">风力：{this.state.fl}</div>
                    <div style={{fontSize:"16px"}} className="col-md-6">风向：{this.state.fx}</div>
                </div>
                <div> </div>
                <div style={{fontSize:"12px",marginTop:"10px"}} className="pull-right">
                    数据来源：环保局 {this.state.lastUpdate}
                </div>
                <div onClick={this.closeWhether.bind(this)} style={{position:"absolute",right:0,top:0}} className="btn btn-xs btn-danger">x</div>
            </div>
        )
    }
}