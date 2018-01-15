import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card} from 'antd';
import {JfCard} from '../../common';
import _ from 'underscore';
const $ =  require('jquery');
const echarts = require('echarts');
/*
title:''
markLineLabel:[]
chartData:[{name:'',value:[1,2,3]}]
axisNames:[xName,yName]
sizeRange:[min,max] 气泡大小范围，默认[25.50]
dataUnit:[] 对应chartData中的value
colorfulData:{
color:[''] 可选
} 每个气泡着以不同颜色
extraOption:{}
*/
export default class Scatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            title:this.props.title
        };
        this.color = ['#67e6ff', '#c5abff', '#fdef54', '#ffa0c7', '#9cffc3', '#adbaff', '#b7ffad', '#f8f484', '#9ffffe'];
    }
    componentDidMount(){
        let dom = this.refs.chart;
        this.chart = echarts.init(dom);
        // this.chartData = this.props.chartData.slice();
        // this.prepareOption();
        // this.chart.setOption(this.option);
    }
    resize(){
        this.chart.resize();
    }

    refreshGraph(arg){
        const params = {...arg};
        this.prepareOption(params);
        this.chart.clear();
        this.chart.setOption(this.option);
        this.setState({loading:false});
    }
    prepareOption(params={}){
        let _this = this;
        this.chartData = params.chartData.slice();
        let sizeValues = this.chartData.map(function(item) {
            return item.value[2];
        });
        let max = Math.max.apply(Math,sizeValues);
        let min = Math.min.apply(Math,sizeValues);
        if(max===min){
            max+=1;
        }
        let axisNames = params.axisNames||[];
        let sizeRange = params.sizeRange||[25,50];
        //markLine-label-formatter
        let dataUnit = params.dataUnit||[];
        let markLineLabel = params.markLineLabel||[];
        let formatter = function(labelParams) {
            let dataIndex = labelParams.dataIndex;
            let description = (markLineLabel[dataIndex]||'');
            let label = '';
            if(dataIndex===1){
                label = description+'  '+labelParams.value+'\n  '+(dataUnit[dataIndex]||'');
            }
            else {
                label = description+labelParams.value+(dataUnit[dataIndex]||'');
            }
            return label;
        };
        if(this.props.colorfulData){
            this.chartData.map(function(item,index) {
                let color = _this.props.colorfulData.color;
                if(!color){
                    color = _this.color;
                }
                item.itemStyle = {
                    normal:{
                        color:color[index]
                    }
                };
            });
        }
        this.option = {
            series:{
                type:'scatter',
                data:this.chartData,
                symbolSize:function(value) {
                    return (value[2]-min)/(max-min)*(sizeRange[1]-sizeRange[0])+sizeRange[0];
                },
                markLine:{
                    show:true,
                    symbolSize:0,
                    precision:0,
                    tooltip:{
                        show:false
                    },
                    label:{
                        normal:{
                            align:'center',
                            formatter:formatter
                        },
                        emphasis:{
                            formatter:formatter
                        }
                    },
                    data:[{
                        type:'average',
                        valueIndex:0
                    },{
                        type:'average',
                        valueIndex:1
                    }]
                },
                label:{
                    normal:{
                        show:true,
                        position:'inside',
                        formatter:function(labelParams) {
                            let valueString = '';
                            if(_this.props.valueInBubble){
                                valueString = labelParams.value[2]+(dataUnit[2]||'')+'\n';
                            }
                            return valueString+labelParams.data.name;
                        }
                    }
                }
            },
            grid:{
                show:false,
                left:'12%',
                right:'9%',
                top:'9%'
            },
            xAxis:{
                name:axisNames[0]||'',
                nameLocation:'center',
                nameTextStyle:{
                    padding:[60,0,0,-20],
                    align:'center'
                },
                axisLabel:{
                    color:'#9db7c0',
                    formatter:'{value}'+(dataUnit[0]||'')
                },
                axisLine:{
                    lineStyle:{
                        color:'#65607f'
                    }

                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#65607f'
                    }
                },
                boundaryGap:['5%','5%'],
                scale:true,
                minInterval:1
            },
            yAxis:{
                name:axisNames[1],
                nameLocation:'middle',
                nameGap:45,
                splitNumber:3,
                axisLabel:{
                    color:'#9db7c0',
                    formatter:'{value}'+(dataUnit[1]||'')
                },
                nameTextStyle:{
                    color:'#7d919e'
                },
                minInterval:1,

                axisLine:{
                    lineStyle:{
                        color:'#65607f'
                    }

                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#65607f'
                    }
                },
                boundaryGap:['5%','5%'],
                scale:true
            },
            tooltip:{
                formatter:function(tipParams) {
                    return tipParams.name+'<br />'+tipParams.value.map(function(item,index) {
                        return params.dataNames[index]+':'+item+(dataUnit[index]||'');
                    }).join('<br />');
                }
            },
            color:this.color
        };
        if(params.extraOption){
            $.extend(true,this.option,params.extraOption);
        }
    }
    render(){
        return (<JfCard title={this.state.title||''} loading={this.state.loading} hasTip={this.props.hasTip}>
            <div className="markets_exponent_chart">
                <div ref="chart" style={{width:'100%',height:'100%'}}></div>
            </div>
        </JfCard>);
    }
}
