import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card} from 'antd';
import {JfCard} from '../../common';
import _ from 'underscore';
const $ =  require('jquery');
const echarts = require('echarts');

/*
seriesData:[{name:'',data:[]}]
yAxisData/xAxisData:[{name:'',data:[]}]
showLegend:boolean,
title:'',
visualMap:boolean,
visualMapColor:[]
percentData:[[]] 与seriesData对应
dataUnit
rankChangeData 排名变化数据
showTopN 显示前n个图例
tooltipData:[{seriesIndex:number},{name:'',data:[],unit:''}]提示条数据 数据中已存在采取前一种形式，否则采取后一种
*/
export default class NewBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            loading:true
        };
        let _this = this;
        let dataUnit = _this.props.dataUnit||[];
        this.defaultOption = {}
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

    componentDidMount(){
        let dom = this.refs.chart;
        this.chart = echarts.init(dom);
        // this.prepareOption();
        // this.chart.setOption(this.option);
    }

    prepareOption(params={}){

        let _this = this;
        let series = [];
        let visualMap = null;
        let dataUnit = params.dataUnit||[];
        this.defaultOption = {
            series:{
                type:'bar',
                barMaxWidth:30,
                barMinHeight:1,
                barGap:0,
                label:{
                    normal:{
                        show:true,
                        position:params.yAxisData?'right':'top'
                    }
                }
            },
            grid:{
                containLabel:true,
                left:'5%',
                bottom:'10%'
            },
            xAxis:{
                show:params.yAxisData?false:true,
                axisLine:{
                    lineStyle:{
                        color:'#7d919e'
                    }
                },
                axisLabel:{
                    interval:0,
                    color:'#9db7c0',
                    rich:{
                        normal:{},
                        up:{
                            color:'#f00'
                        },
                        down:{
                            color:'#0f0'
                        }
                    }
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                },
                boundaryGap: ['0', '3%']
            },
            yAxis:{
                //y轴适当向两边延伸
                splitNumber:4,
                nameTextStyle:{
                    color:'#7d919e',
                    padding:[0,50,0,0]
                },
                axisLine:{
                    show:false,
                    lineStyle:{
                        color:'#65607f'
                    }
                },

                axisTick:{
                    show:false
                },
                show:true,
                axisLabel:{
                    interval:0,
                    color:'#9db7c0',
                    rich:{
                        normal:{},
                        up:{
                            color:'#ff4f4f'
                        },
                        down:{
                            color:'#08ecb1'
                        }
                    }
                },
                splitLine:{
                    show:(!params.yAxisData),
                    lineStyle:{
                        color:'#65607f'
                    }
                },
                inverse:params.yAxisData?true:false,
            },
            legend:{
                show:false,
                orient:'vertical',
                icon: 'circle',
               itemWidth: 9,
               itemHeight: 9,
                inactiveColor: '#7d7996',
                textStyle:{
                    color:'#fff'
                },
                right:20,
                top:20
            },
            visualMap:null,
            tooltip:{
                show:false,
                backgroundColor:'transparent',
                trigger:'axis',
                axisPointer:{
                    type:'shadow'
                },
                formatter:function(tipParams) {
                    if(!params.tooltipData){
                        return tipParams[0].name+'<br />'
                        +tipParams.map(function(item) {
                            return item.seriesName+' : '+item.value+(dataUnit?dataUnit[item.seriesIndex]||'':'');
                        }).join('<br />');
                    }
                    return tipParams[0].name+'<br />'
                    +params.tooltipData.map(function(item) {
                        if(item.seriesIndex!==undefined){
                            let tar = params.seriesData[item.seriesIndex];
                            return tar.name+' : '+tar.data[tipParams[0].dataIndex]+(dataUnit?dataUnit[item.seriesIndex]||'':'');
                        }
                        return item.name+' : '+item.data[tipParams[0].dataIndex]+(item.unit||'');
                    }).join('<br />');
                }
            },
            color:['#00d1fa', '#b7a2e7', '#f0ba4e', '#f88db9', '#71d398', '#8d9df2']
        };
        //柱形上的数字
        this.defaultOption.series.label.normal.formatter = function(labelParams) {
            let appendString = ''
            //加上占比数据
            if(params.percentData){
                let joinChar = '';
                // if(_this.props.yAxisData){
                    joinChar = '\n';
                // }
                // else {
                //     joinChar = '\n';
                // }
                appendString = joinChar+params.percentData[labelParams.seriesIndex][labelParams.dataIndex];
            }
            let value;
            //横向柱状图中每个数据项有两个值，不显示第二个用于定位y轴的值
            if($.isArray(labelParams.value)){
                value = labelParams.value[0];
            }
            else {
                value = labelParams.value;
            }
            return value+(dataUnit[labelParams.seriesIndex]||'')+appendString;
        };
        if(params.seriesData.length>1||!params.visualMap){
            series = params.seriesData.map(function(item,index) {
                return $.extend(true,{},_this.defaultOption.series,item);
            });
        }
        else {
            series = params.seriesData.map(function(item,index) {
                return $.extend(true,{},_this.defaultOption.series,{
                    name:item.name,
                    data:item.data.map(function(dataItem,dataIndex) {
                        return [dataItem,dataIndex];
                    })
                });
            });
            let max = Math.max.apply(Math,params.seriesData[0].data);
            let min = Math.min.apply(Math,params.seriesData[0].data);
            if(min===max){
                max+=1;
            }
            visualMap = {
                max:max,
                min:min,
                dimension:0,
                inRange:{
                    color:params.visualMapColor||['lightskyblue','#3d9bfd'],
                },
                show:false,
                type:'continuous'
            };
        }
        this.option = $.extend(true,{},this.defaultOption,{
            series,
            visualMap,
            xAxis:params.xAxisData,
            yAxis:params.yAxisData
        },params.extraOption||{});
        let selected = {};
        this.option.legend.data = params.seriesData.map(function(item,index) {
            if(params.showTopN){
                selected[item.name] = (index<params.showTopN);
            }
            return item.name;
        });
        this.option.legend.selected = selected;
        if(params.rankChangeData){
            let rankChangeData = params.rankChangeData;
            let formatter = function(value,index) {
                let rankValue = rankChangeData[index];
                let style = 'normal';
                let content = '-';
                if(rankValue>0){
                    style = 'up';
                    content = '↑'+rankValue;
                }
                else if (rankValue<0) {
                    style = 'down';
                    content = '↓'+(-rankValue);
                }
                return value+'({'+style+'|'+content+'})';
            }
            if(params.yAxisData){
                this.option.yAxis.axisLabel.formatter = formatter;
            }
            else {
                this.option.xAxis.axisLabel.formatter = formatter;
            }
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
