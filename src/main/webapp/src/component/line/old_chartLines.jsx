import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Card} from 'antd';
import {JfCard} from '../../common';
import _ from 'underscore';
const $ =  require('jquery');
const echarts = require('echarts');

//import './css/index.css';

/*
xAxisData:{name:'日期',data:[]},
    示例： data:["2015/1/5","2015/1/6","2015/1/7"

seriesData:[{"name":'12312','data':'[]},{"name":'12312','data':'[]}],
    示例：
    [{
        name:'视频广告',
        data:[150, 232, 201, 154, 190, 330, 410]
    }]

extraOptions:{} //扩展配置
showTopN:number //仅显示前n个系列
dataUnit:[] 单位
tooltipData:[{seriesIndex:number},{name:'',data:[],unit:''}]提示条数据 数据中已存在采取前一种形式，否则采取后一种
*/

export default class ChartLine extends Component{
    constructor(props){
        super(props);

        this.state={
            title:this.props.title,
        };
        let _this = this;
        let dataUnit = _this.props.dataUnit||[];
        this.itemAreaStyle = {};//{normal: {areaStyle: {type: 'default'}}} 面积图时配置
        this.option = {
            color:['#00d1fa', '#b7a2e7', '#f0ba4e', '#f88db9', '#71d398', '#8d9df2'],
            grid: {
                left: '5%',
                right: '9%',
                bottom: '6%',
                top: '10%',
                containLabel: true
            },
            legend: {
                show:false,
                data:[],
                top: '5%',
                left:'9%',
                icon: 'circle',
               itemWidth: 8,
                inactiveColor: '#7d7996',
                textStyle: {
                    color: '#fff'
                }
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            tooltip: {
                trigger: 'axis',
                bordeRadius: 10,

                position: "top",
                textStyle: {
                    fontSize: 14,
                    color: '#ffffff'
                },
                formatter:function(params) {
                    //提示条没有额外配置则使用原有数据
                    if(!_this.props.tooltipData){
                        return params[0].name+'<br />'
                        +params.map(function(item) {
                            return item.seriesName+' : '+item.value+(dataUnit[item.seriesIndex]||'');
                        }).join('<br />');
                    }
                    //提示条有额外配置
                    return params[0].name+'<br />'
                    +_this.props.tooltipData.map(function(item) {
                        //数据来自系列中的数据
                        if(item.seriesIndex!==undefined){
                            let tar = _this.props.seriesData[item.seriesIndex];
                            return tar.name+' : '+tar.data[params[0].dataIndex]+(dataUnit[item.seriesIndex]||'');
                        }
                        //数据额外配置
                        return item.name+' : '+item.data[params[0].dataIndex]+(item.unit||'');
                    }).join('<br />');
                }
                // formatter: function(params) {
                    //console.log(params);
                    // var divHtml = params[0]['name']+"<br />";
                    // _(params).map((v,k)=>{
                    //     divHtml += v.seriesName+'：'+v.value+"<br />";
                    //     //console.log(v);
                    // });
                    // //var data = params[0]['data']['name'][0];
                    // let color = "#26203d";
                    // var a = "<div padding: 5px 10px;text-align:left;color:white;font-size: 10px;'>"+divHtml+"</div>";
                    //
                    //
                    // return a;
                // }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: { //网格线
                    show: false,
                    lineStyle: {
                        color: ['#7d919e'],
                        type: 'dashed'
                    }
                },
                axisLine: {
                lineStyle: { color: '#65607f' },
                textStyle: {
                    color: '#a2b7c5'
                } },
                data: [],
                axisLabel: {
                        show: true,
                        interval: 0, //表示x轴值所有显示

                        textStyle: {
                            color: '#a2b7c5'
                        }
                    }
            },
            yAxis: {
                show: true,
                offset:0,
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#a2b7c5'
                    }
                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine: { //网格线
                    show: true,
                    lineStyle: {
                        color: ['#65607f'],
                        type: 'solid'
                    }
                },
                nameLocation:'middle',
                nameGap:38,
                nameTextStyle:{
                    color:'#7d919e'
                }
            },
            series: [
                {
                    smooth: true,
                    name:'邮件营销',
                    type:'line',

            //        stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    smooth: true,
                    name:'联盟广告',
                    type:'line',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    smooth: true,
                    name:'视频广告',
                    type:'line',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    smooth: true,
                    name:'直接访问',
                    type:'line',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    smooth: true,
                    name:'搜索引擎',
                    type:'line',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

    }

    componentDidMount(){

        this.prepareOption(this.props.xAxisData,this.props.seriesData,this.props.extraOptions);
        //console.log("11111111111111111111111111");
        let containerEle = this.refs.container;
        //console.log(containerEle);
        //console.log(this.option);
        this.ecObj = echarts.init(containerEle);
        this.ecObj.setOption(this.option);
    }

    getSeriesData(data){
        let seriesDataRes = [];
        let legendRes = [];
        // _(data).map((v,k)=>{
        //     v['smooth'] = true;
        //     v['type'] = 'line';
        //     seriesData.push(v);
        // });
        let dataUnit = this.props.dataUnit||[];

        _(data).map((v,k)=>{
            v['smooth'] = true;
            v['type'] = 'line';
            //if( itemAreaStyleShow  ){
            v['itemStyle'] = this.itemAreaStyle;
            //}
            v['label'] = {
                normal:{
                    show:false,
                    formatter:'{c}'+(dataUnit[k]||'')
                }
            };
            seriesDataRes.push(v);
            legendRes.push(v['name']);
        });

        return {seriesDataRes:seriesDataRes,legendRes:legendRes};
    }

    prepareOption(xAxisData,seriesData,extraOptions) {

        let _this = this;
        let seriesDataRes = [];
        let legendRes = [];
        let itemAreaStyleShow = false;
        if(extraOptions){
            $.extend(true,this.option,extraOptions);

            //this.label
            if( extraOptions.extra != undefined){
                if(  extraOptions.extra.itemAreaStyle != undefined  ){
                    itemAreaStyleShow = true;
                    $.extend(true,this.itemAreaStyle,extraOptions.extra.itemAreaStyle);
                }
            }


        }

        if( seriesData ){
            // _(seriesData).map((v,k)=>{
            //     v['smooth'] = true;
            //     v['type'] = 'line';
            //     if( itemAreaStyleShow  ){
            //         v['itemStyle'] = this.itemAreaStyle;
            //     }
            //     seriesDataRes.push(v);
            //     legendRes.push(v['name']);
            // });
            let resList = this.getSeriesData(seriesData);
            //{seriesDataRes:seriesDataRes,legendRes:legendRes};
            this.option.series = resList['seriesDataRes'];
            this.option.legend.data = resList['legendRes'];
        }
        //console.log("piepiepie");
        //console.log(this.option);

        if( this.props.xAxisData ){
            $.extend(true,this.option,{
                xAxis:{
                    name:this.props.xAxisData.name,
                    data:this.props.xAxisData.data
                }
            });
        }
        if(this.props.showTopN){
            this.option.legend.selected = {};
            let legendData = this.option.legend.data;
            for(let i=0;i<legendData.length;i++){
                if(i>=this.props.showTopN){
                    this.option.legend.selected[legendData[i]] = false;
                }
            }
        }

        $.extend(true,this.option,extraOptions);

    }

    resize(){
        this.ecObj.resize();
    }

    refreshGraph(xAxisData,seriesData){
        //console.log(xAxisData,seriesData);
        this.option.xAxis.data = xAxisData.data;
        this.option.xAxis.name = xAxisData.name;

        let sData = this.getSeriesData(seriesData);
        let resList = this.getSeriesData(seriesData);
        //{seriesDataRes:seriesDataRes,legendRes:legendRes};
        this.option.series = resList['seriesDataRes'];
        this.option.legend.data = resList['legendRes'];

        this.ecObj.setOption(this.option);
    }

    render(){
        return (

            <JfCard title={this.state.title} bordered={false} >
                <div className="chart_height" >
                    <div style={{width:'100%',height:'100%'}} ref="container" > </div>
                </div>
            </JfCard>
        )
    }
}
