import $ from 'jquery';
import React from 'react';
import echarts from 'echarts';
import JfCard from '../../common/jfCard/jfCard';
import moment from 'moment';

/*
extraOptions:{totalOption,branchOption,base},
totalData:[{name:'',data:[]}],上半部分系列
branchData:[{name:'',data:[]}],下半部分系列
xAxisData:{name:'',data:[]},x轴
showPie:boolean 是否显示饼图,
sumName:{total:'',branch:''}显示总和时标注的名称，没有则不配置
dataUnit:[[]]单位
totalPieData:[{name:'',data:[]}] 在showPie的情况下，使用额外的饼图数据
branchPieData:[{name:'',data:[]}]
tooltipData:{  附加的提示条数据
    total:[{}],
    branch:[{}]
}
tooltipType:'' 提示条类型 可选 plain/top 默认top;
xAppendtoTip:{
format:[originalFormat,toFormat]可选
}
*/
class ConnectedLines extends React.Component {
    constructor(props) {
        super(props);
        let _this = this;
        //两个折线图公共的默认option
        this.defaultOption = {
            //时间轴组件，用于折线图提示条变化时切换饼图数据
            timeline:{
                data:this.props.xAxisData.data,
                show:false,
                currentIndex:this.props.xAxisData.data.length-1
            },
            //折线及饼图系列公共配置
            series:[{
                type:'line',
                areaStyle:{
                    normal:{
                        opacity:0.5
                    }
                },
                //折线堆叠
                stack:'sum',
                z:50
            },{
                type:'pie',
                center:["25%","35%"],
                radius:[0,"40%"],
                hoverAnimation:false,
                label:{
                    normal:{
                        position:'inside',
                        formatter:'{b}\n{d}%'
                    }
                },
                z:100
            }],
            grid:{
                top:'23%',
                bottom:'17%',
                left:'center',
                width:'80%'

            },
            xAxis:{
                axisTick:{
                    alignWithLabel:true
                },
                axisLine:{
                    lineStyle:{
                        color:'#7d919e'
                    }
                },
                name:this.props.xAxisData.name,
                //x轴数据
                data:this.props.xAxisData.data
            },
            yAxis:{
                show:true,
                scale:true,
                splitNumber:4,
                //y轴适当向两边延伸
                nameTextStyle:{
                    color:'#7d919e',
                    padding:[0,50,0,0]
                },
                boundaryGap:['10%','10%'],
                splitLine:{
                    lineStyle:{
                        color:'#646076'
                    }
                },
                axisLabel:{
                    color:'#9db7c0'
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                }
            },
            tooltip:{
                trigger:'axis',
                //位置固定在左上角
                position:[10,0],
                backgroundColor:'transparent',
            },
            legend:{
                show:false,
                orient:'vertical',
                right:'0',

                icon: 'circle',
               itemWidth: 9,
               itemHeight: 9,
                inactiveColor: '#7d7996',
                top:'middle',
                textStyle:{
                    color:'#fff'
                }
            },
            color:['#00d1fa', '#b7a2e7', '#f0ba4e', '#f88db9', '#71d398', '#8d9df2']
        };
        //两个折线图的option, totalOption为上方折线图，branchOption为下方折线图
        this.totalOption = {};
        this.branchOption = {};
        this.totalData = this.props.totalData.slice();
        this.branchData = this.props.branchData.slice();
    }
    //触发时间轴组件切换事件，切换饼图数据
    setTimeline(type,index){
        this[type+"Chart"].dispatchAction({
            type: 'timelineChange',
            currentIndex: index
        });
    }
    //组件加载完成后对两个折线图setOption
    componentDidMount(){
        //渲染图形的容器
        let totalDom = this.refs.totalChart;
        this.totalChart = echarts.init(totalDom);
        let branchDom = this.refs.branchChart;
        this.branchChart = echarts.init(branchDom);
        this.prepareOption();
        this.totalChart.setOption(this.totalOption);
        this.branchChart.setOption(this.branchOption);
        echarts.connect([this.totalChart,this.branchChart]);
    }
    resize(){
        this.totalChart.resize();
        this.branchChart.resize();
    }
    //更新数据 totalData/branchData同props，xAxisDataList同props中xAxisData.data
    refreshGraph(totalData,branchData,xAxisDataList){
        this.totalData = totalData;
        this.branchData = branchData;
        this.defaultOption.timeline.data = xAxisDataList;
        this.defaultOption.timeline.currentIndex = xAxisDataList.length-1;
        this.defaultOption.xAxis.data = xAxisDataList;
        this.prepareOption();
        this.totalChart.setOption(this.totalOption);
        this.branchChart.setOption(this.branchOption);
    }
    //根据数据组合两个option
    prepareOption() {
        let _this = this;
        this.extraOptions = this.props.extraOptions||{};
        $.extend(true,this.defaultOption,this.extraOptions.base||{});
        let array = ['total','branch'];
        let showTopN = _this.props.showTopN||{};
        let dataUnit = this.props.dataUnit||[[],[]];
        //对两个option操作
        for(let i=0;i<array.length;i++){
            let type = array[i];
            let data = this[type+'Data'];
            let timelineSeries = [];
            let legendData = [];
            //额外的系列相关配置
            let extraSeriesOption = {};
            if(_this.extraOptions[type+'Option']&&_this.extraOptions[type+'Option'].series){
                extraSeriesOption = _this.extraOptions[type+'Option'].series;
            }
            //仅显示n条
            let selectedN = showTopN[type];
            //图例列表
            let selected = {};
            //基础Option的系列中添加折线图数据（折线图数据固定）
            let baseSeries = data.map(function(item,index) {
                //扩展的option中折线图系列无需替换数据
                timelineSeries.push({});
                legendData.push(item.name);
                if(selectedN&&index>=selectedN){
                    selected[item.name] = false;
                }
                return $.extend(true,{},_this.defaultOption.series[0],item,extraSeriesOption[0]);
            });
            let options = [];
            //是否需要显示饼图
            if(this.props.showPie){
                //为timeline组件准备多个扩展的option, 每组饼图数据对应一个option
                let pieData = data;
                if(this.props[type+'PieData']){
                    pieData = this.props[type+'PieData'];
                }
                options = this.props.xAxisData.data.map(function(xItem,index) {
                    return {
                        //不同x轴数据时，对应的饼图数据
                        series:timelineSeries.concat({
                            data:pieData.map(function(item) {
                                return {
                                    name:item.name,
                                    value:item.data[index]
                                };
                            })
                        })
                    };
                });
                this[type+"Option"].options = options;
                //基础option中增加饼图的基础配置
                baseSeries = baseSeries.concat(this.defaultOption.series[1]);
            }
            //最终组合形成两个折线图的option
            let tooltip = {
                formatter:function(params) {
                    if(_this.props.showPie){
                        //切换饼图数据
                        _this.setTimeline(type,params[0].dataIndex);
                    }
                    let sumValue = 0;
                    let tooltipString = params.map(function(item) {
                        //每个系列的总和
                        sumValue+=item.value;
                        return item.seriesName+"："+item.value+(dataUnit[i][item.seriesIndex]||'');
                    }).join("   ");
                    let sum = '';
                    //如果需要分别显示两个折线图的总和
                    if(_this.props.sumName){
                        sum = _this.props.sumName[type]+"："+sumValue+(dataUnit[i][0]||'')+'   ';
                    }
                    //额外的提示条信息
                    let appendString = '';
                    if(_this.props.tooltipData&&_this.props.tooltipData[type]){
                        appendString='，'+_this.props.tooltipData[type].map(function(appendItem) {
                            return appendItem.name+appendItem.data[params[0].dataIndex]+(appendItem.unit||'');
                        }).join('，');
                    }
                    let xString = '';
                    //如果需要显示x轴信息
                    if(_this.props.xAppendtoTip){
                        let format = _this.props.xAppendtoTip.format;
                        //x轴时间格式化
                        if(format){
                            xString = moment(params[0].name,format[0]).format(format[1]);
                        }
                        else {
                            xString = params[0].name;
                        }
                    }
                    return xString+sum+tooltipString+appendString;
                }
            };
            if(_this.props.tooltipType==='plain'){
                tooltip = {
                    position:'auto',
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:function(params) {
                        if(_this.props.showPie){
                            //切换饼图数据
                            _this.setTimeline(type,params[0].dataIndex);
                        }
                        let sumValue = 0;
                        let tooltipString = params.map(function(item) {
                            //每个系列的总和
                            sumValue+=item.value;
                            return item.seriesName+"："+item.value+(dataUnit[i][item.seriesIndex]||'');
                        }).join('<br />');
                        let sum = '';
                        //如果需要分别显示两个折线图的总和
                        if(_this.props.sumName){
                            sum = _this.props.sumName[type]+"："+sumValue+(dataUnit[i][0]||'')+'<br />';
                        }
                        //额外的提示条信息
                        let appendString = '';
                        if(_this.props.tooltipData&&_this.props.tooltipData[type]){
                            appendString='<br />'+_this.props.tooltipData[type].map(function(appendItem) {
                                return appendItem.name+' : '+appendItem.data[params[0].dataIndex]+(appendItem.unit||'');
                            }).join('<br />');
                        }
                        let xString = '';
                        //如果需要显示x轴信息
                        if(_this.props.xAppendtoTip){
                            let format = _this.props.xAppendtoTip.format;
                            //x轴时间格式化
                            if(format){
                                xString = moment(params[0].name,format[0]).format(format[1]);
                            }
                            else {
                                xString = params[0].name;
                            }
                            xString+='<br />';
                        }
                        return xString+sum+tooltipString+appendString;
                    }
                };
            }
            this[type+"Option"].baseOption = $.extend(true,{},this.defaultOption,{
                series:baseSeries,
                legend:{
                    data:legendData,
                    selected
                },
                //配置提示条组件显示内容
                tooltip
            },this.extraOptions[type+'Option']||{});
        }
    }
    render(){
        return (<JfCard title={this.props.title}>
            <div className="markets_exponent_chart">
                <div ref="totalChart" style={{width:'100%',height:'50%'}}></div>
                <div ref="branchChart" style={{width:'100%',height:'50%'}}></div>
            </div>
        </JfCard>);
    }
}

export default ConnectedLines;
