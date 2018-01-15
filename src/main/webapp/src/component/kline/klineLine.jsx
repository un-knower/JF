import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card} from 'antd';
import {JfCard} from '../../common';
import _ from 'underscore';
//const jQuery = window.jQuery = $ = window.$ = require('jquery');
const echarts = require('echarts');
const $ =  require('jquery');
//import './css/index.css';

/**
title: '上证指数' //页面模块显示名称

extraOptions ：配置项指定
    例如：
    extraOptions={
        {legend:{show:false,data:['直接访问']},
        extra:{klineItemStyle:{}}} // extra为特别的扩展项配置，自定义的一些影响显示的配置项
    }

xAxisData:{name:'日期',data:[]},
    示例： data:["2015/1/5","2015/1/6","2015/1/7"

//k线数据
seriesKData:{name:'k线',data:[]},
    示例：data: [[开盘价，收盘价，最低价，最高价],[3258.63,3350.52,3253.88,3369.28],[3330.8,3351.45,3303.18,3394.22]

//其他系列折线类数据
seriesOtherData: {name:'交易金额',data:[]},

*/

export default class KlineLine extends Component{
    constructor(props){
        super(props);
        this.state={
            title:this.props.title,
            option:this.props.rawData,
            colors:{
                upColor : '#ec0000',
                upBorderColor : '#8A0000',
                downColor : '#00da3c',
                downBorderColor : '#008F28'
            },
            echartDateList:["2015/1/5","2015/1/6","2015/1/7","2015/1/8","2015/1/9","2015/1/12","2015/1/13","2015/1/14","2015/1/15","2015/1/16","2015/1/19","2015/1/20","2015/1/21","2015/1/22","2015/1/23","2015/1/26","2015/1/27"],
            echartPriceList: [[3258.63,3350.52,3253.88,3369.28],[3330.8,3351.45,3303.18,3394.22],[3326.65,3373.95,3312.21,3374.9],[3371.96,3293.46,3285.09,3381.57],[3276.97,3285.41,3267.51,3404.83],[3258.21,3229.32,3191.58,3275.19],[3223.54,3235.3,3214.41,3259.39],[3242.34,3222.44,3193.98,3268.48],[3224.07,3336.46,3207.54,3337.08],[3343.6,3376.5,3340.49,3400.32],[3189.73,3116.35,3095.07,3262.21],[3114.56,3173.05,3100.48,3190.25],[3189.08,3323.61,3178.34,3337],[3327.32,3343.34,3293.98,3352.38],[3357.1,3351.76,3328.29,3406.79],[3347.26,3383.18,3321.31,3384.8]],

        };
        //kline显示tip颜色配置
        this.klineItemStyle = {
            normal: {
                color: '#FD1050',
                color0: '#0CF49B',
                borderColor: '#FD1050',
                borderColor0: '#0CF49B'
            }
        };
        this.option = {
            //backgroundColor: '#21202D',
            color:['#6acafa', '#b7a2e7', '#f0ba4e', '#f88db9', '#71d398', '#8d9df2'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    }
                },
                formatter: function(params) {
                    let time  = params[0].name;
                    let tipHtml  = `${time}`;
                    _(params).map((v,k)=>{
                        console.log(v,k);
                        if( v['seriesType'] == 'candlestick' ){

                            let kd    = params[0].data;
                            tipHtml  += `<br>${v.seriesName}<br>开盘：${kd[1]}  最高：${kd[4]}<br>收盘：${kd[2]}  最低：${kd[3]} `;

                        }else{
                            tipHtml  += '<br> '+v.seriesName+'：'+v.value;
                        }
                    });

                    return tipHtml;
                }.bind(this)
            },
            xAxis: {
                type: 'category',
                name: '',
                data: this.state.echartDateList,

                axisLine: {
                lineStyle: { color: '#65607f' },
                textStyle: {
                    color: '#9db7c0'
                } }
            },
            yAxis: [
                {
                    show: false,
                    scale: true,
                    splitNumber:4,
                //    max: 7000,
		     //       min: 0,
                    position:'right',
                    axisLine: { lineStyle: { color: '#65607f' } },
                    //splitLine: { show: false }
                },
                {
		            type: 'value',
                    show: false,
		            scale: true,
		            name: '成交量',
		            nameGap:20,
		            //max: 3000,
		            //min: 0,
		            boundaryGap: [0.2, 1]
		        }

            ],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '6%',
                top: '30',
                containLabel: true
            },
            animation: false,
            series: [
                    {
                        type: 'candlestick',
                        name: '上证指数',
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        },
                        data:this.state.echartPriceList,
                    },
                    {
                        smooth: true,
                        yAxisIndex: 1,
                        name:'交易金额(万)',
                        type:'line',
            //            stack: '总量',
                        data:[1620, 932, 901, 934, 1290, 3330, 3620, 3932, 3901,3620, 3932, 3901, 2934, 3290, 3330, 2934]
                    }
                ]
        };
    }

    componentDidMount(){
        this.prepareOption();
        let containerEle = this.refs.container;
        this.ecObj = echarts.init(containerEle);
        this.ecObj.setOption(this.option);
    }

    resize(){
        this.ecObj.resize();
    }

    getSeriesData(seriesKData,seriesOtherData){
        let seriesData = [];
        if( seriesKData ){
            let kseries = {
                type: 'candlestick',
                name: seriesKData.name,
                itemStyle: this.klineItemStyle,
                data:seriesKData.data
            };
            seriesData.push(kseries);
        }

        if( seriesOtherData ){
            _(seriesOtherData).map((v,k)=>{
                v['smooth'] = true;
                v['type'] = 'line';
                v['yAxisIndex'] = 1;
                seriesData.push(v);
            });
        }

        return seriesData;
    }

    refreshGraph(xAxisData,seriesKData,seriesOtherData){

        this.option.series = this.getSeriesData(seriesKData,seriesOtherData);

        if( xAxisData ){
            this.option.xAxis.data = xAxisData;
        }

        this.ecObj.setOption(this.option);
    }


    prepareOption() {
        let _this = this;
        let extraOptions = this.props.extraOptions;
        if(this.props.extraOptions){
            $.extend(true,this.option,extraOptions);
        }

        if( extraOptions !=undefined && extraOptions.extra != undefined ){
            ///每系列label 显示格式等配置信息
            if( extraOptions.extra.klineItemStyle != undefined ){
                $.extend(true,this.klineItemStyle,extraOptions.extra.klineItemStyle);
            }
        }

        let seriesData = [];
        seriesData = this.getSeriesData(this.props.seriesKData,this.props.seriesOtherData);
        this.option.series = seriesData;

        if( this.props.xAxisData ){
            $.extend(this.option,{
                xAxis:{
                    type: 'category',
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    name:this.props.xAxisData.name,
                    data:this.props.xAxisData.data
                }
            });
        }
    }

    shouldComponentUpdate(){
        return false
    }

    render(){
        return (
            <JfCard title={this.state.title} bordered={false} >
                <div className="markets_exponent_line">
                    <div style={{width:'100%',height:'100%'}} ref="container" ></div>
                </div>
            </JfCard>
        )
    }
}
