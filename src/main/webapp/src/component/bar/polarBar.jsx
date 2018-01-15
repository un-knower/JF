import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {JfCard} from '../../common';
import moment from 'moment';
const $ =  require('jquery');
const echarts = require('echarts');

/*
极坐标堆叠柱状图
seriesData:[{name:'',data:[]}]
radiusAxisData:{name:'',data:[]} 半径轴数据
title:''
*/
export default class PolarBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            loading:true
        };
        this.defaultOption = {
            angleAxis: {
                axisLine:{
                    lineStyle:{
                        color:'#7d919e'
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:'#999'
                    }
                },
                polarIndex:0
            },
            radiusAxis: {
                polarIndex:0,
                type: 'category',
                z: 10,
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                },
            },
            polar: {
                radius:'64%',
                center:['50%', '55%']


            },
            series:{
                type: 'bar',
                center: ['50%', '55%'],

                coordinateSystem: 'polar',
                stack: 'sum',

                polarIndex:0
            },
            color:['#00d5fa', '#d8292a', '#9aebab', '#ffe829', '#e67a5d', '#92f1d5','#55a7fb'],
            legend: {
                show: true,
                // orient:'vertical',
                top:'4%',
                left:'2%',
                itemHeight: 8,
                itemWidth: 12,
                inactiveColor: '#7d7996',
                textStyle:{
                    color:'#fff'
                }
            },
            tooltip:{
                trigger: 'item',
                formatter: "{a} <br/>{b}年 : {c} 人"
            }
        };
    }

    componentDidMount(){
        let dom = this.refs.chart;
        this.chart = echarts.init(dom);
        // this.prepareOption();
        // this.chart.setOption(this.option);
    }

    componentWillReceiveProps(nextProps){
        this.setState({title:nextProps.title});
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
        let legendData = [];
        let series = params.seriesData.map(function(item) {
            legendData.push(item.name);
            return $.extend(true,{},_this.defaultOption.series,{
                name:item.name,
                data:item.data
            });
        });
        this.option = $.extend(true,{},this.defaultOption,{
            series,
            radiusAxis:params.radiusAxisData,
            legend:{
                data:legendData
            }
        });
    }

    render(){
        return (<JfCard title={this.state.title} loading={this.state.loading} hasTip={this.props.hasTip}>
            <div className="markets_exponent_chart">
                <div ref="chart" style={{width:'100%',height:'100%'}}></div>
            </div>
        </JfCard>);
    }
}
