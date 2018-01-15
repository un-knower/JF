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
        this.state = {
            loading:this.props.loading ||true
        }
        //两个折线图公共的默认option
        this.defaultOption = {

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
                center:["27%","22%"],
                radius:[0,"33%"],
                hoverAnimation:false,
                label:{
                    normal:{
                        position:'inside',
                        formatter:'{b}\n{d}%'
                    }
                },
                animation:false,
                z:100
            }],
            grid:{
                top:'23%',
                bottom:'17%',
                left:'center',
                width:'80%'

            },

            yAxis:{
                splitNumber:4,
                show:true,
                scale:true,
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
    }
    //触发时间轴组件切换事件，切换饼图数据
    setTimeline(type,index){
        this[type+"Chart"].dispatchAction({
            type: 'timelineChange',
            currentIndex: index
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            loading:nextProps.loading
        })
    }
    //组件加载完成后对两个折线图setOption
    componentDidMount(){
        //渲染图形的容器
        let totalDom = this.refs.totalChart;
        this.totalChart = echarts.init(totalDom);
        let branchDom = this.refs.branchChart;
        this.branchChart = echarts.init(branchDom);
        echarts.connect([this.totalChart,this.branchChart]);
        // this.prepareOption();
        // this.totalChart.setOption(this.totalOption);
        // this.branchChart.setOption(this.branchOption);
    }
    resize(){
        this.totalChart.resize();
        this.branchChart.resize();
    }
    //更新数据 totalData/branchData同props，xAxisDataList同props中xAxisData.data
    // refreshGraph(totalData,branchData,xAxisDataList){
    //     this.totalData = totalData;
    //     this.branchData = branchData;
    //     this.defaultOption.timeline.data = xAxisDataList;
    //     this.defaultOption.timeline.currentIndex = xAxisDataList.length-1;
    //     this.defaultOption.xAxis.data = xAxisDataList;
    //     this.prepareOption();
    //     this.totalChart.setOption(this.totalOption);
    //     this.branchChart.setOption(this.branchOption);
    // }
    refreshGraph(arg){
        const params = {...arg};
        this.totalData = params.totalData.slice();
        this.branchData = params.branchData.slice();
        this.totalChart.clear();
        this.branchChart.clear();
        this.prepareOption(params);
        this.totalChart.setOption(this.totalOption);
        this.branchChart.setOption(this.branchOption);
        this.setState({
            loading:false
        })
        // this.setState({title:name+'各项支出趋势图'});
    }

    //根据数据组合两个option
    prepareOption(arg={}) {
        let _this = this;
        this.extraOptions = arg.extraOptions||{};
        const addOption = {
            //时间轴组件，用于折线图提示条变化时切换饼图数据
            timeline:{
                data:arg.xAxisData.data,
                show:false,
                currentIndex:arg.xAxisData.data.length-1
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
                name:arg.xAxisData.name,
                //x轴数据
                data:arg.xAxisData.data
            }
        }
        this.defaultOption.xAxis = {};
        // const __defaultOption = {...this.defaultOption,...addOption,...this.extraOptions.base};
        // console.log({...this.defaultOption});
        // console.log(JSON.stringify(__defaultOption));
        $.extend(true,this.defaultOption,addOption,this.extraOptions.base||{});
        // console.log(JSON.stringify(this.defaultOption));

        let array = ['total','branch'];
        let showTopN = arg.showTopN||{};
        let dataUnit = arg.dataUnit||[[],[]];
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
            if(arg.showPie){
                //为timeline组件准备多个扩展的option, 每组饼图数据对应一个option
                let pieData = data;
                if(arg[type+'PieData']){
                    pieData = arg[type+'PieData'];
                }
                options = arg.xAxisData.data.map(function(xItem,index) {
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
                    if(arg.showPie){
                        //切换饼图数据
                        _this.setTimeline(type,params[0].dataIndex);
                    }
                    let sumValue = 0;
                    let tooltipString = params.map(function(item) {
                        //每个系列的总和
                        sumValue+=item.value;
                        return '<em >'+item.seriesName+"："+item.value+(dataUnit[i][item.seriesIndex]||'')+'</em>';
                    }).join("   ");
                    let sum = '';
                    //如果需要分别显示两个折线图的总和
                    if(arg.sumName){
                        sum = '<em >'+arg.sumName[type]+"："+sumValue+(dataUnit[i][0]||'')+'   '+'</em>';
                    }
                    //额外的提示条信息
                    let appendString = '';
                    if(arg.tooltipData&&arg.tooltipData[type]){
                        appendString='<em>'+arg.tooltipData[type].map(function(appendItem) {
                            return appendItem.name+appendItem.data[params[0].dataIndex]+(appendItem.unit||'');
                        }).join('</em><em>')+'</em>';
                    }
                    let xString = '';
                    //如果需要显示x轴信息
                    if(arg.xAppendtoTip){
                        let format = arg.xAppendtoTip.format;
                        //x轴时间格式化
                        if(format){
                            xString = moment(params[0].name,format[0]).format(format[1]);
                        }
                        else {
                            xString = params[0].name;
                        }
                        if(arg.showPie){
                            xString = '<em> '+xString+'</em>';
                        }
                    }
                    return xString+appendString+tooltipString+sum;
                }
            };
            if(arg.tooltipType==='plain'){
                tooltip = {
                    position:'auto',
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:function(params) {
                        if(arg.showPie){
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
                        if(arg.sumName){
                            sum = arg.sumName[type]+"："+sumValue+(dataUnit[i][0]||'')+'<br />';
                        }
                        //额外的提示条信息
                        let appendString = '';
                        if(arg.tooltipData&&arg.tooltipData[type]){
                            appendString='<br />'+arg.tooltipData[type].map(function(appendItem) {
                                return appendItem.name+': '+appendItem.data[params[0].dataIndex]+(appendItem.unit||'');
                            }).join('<br />');
                        }
                        let xString = '';
                        //如果需要显示x轴信息
                        if(arg.xAppendtoTip){
                            let format = arg.xAppendtoTip.format;
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
            this[type+"Option"].baseOption = $.extend(true,{},this.defaultOption,addOption,{
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
        return (<JfCard title={this.props.title} loading={this.state.loading} hasTip={this.props.hasTip}>
            <div className="markets_exponent_chart">
                <div ref="totalChart" style={{width:'100%',height:'50%'}}></div>
                <div ref="branchChart" style={{width:'100%',height:'50%'}}></div>
            </div>
        </JfCard>);
    }
}

export default ConnectedLines;
