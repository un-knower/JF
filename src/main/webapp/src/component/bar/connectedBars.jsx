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
class ConnectedBars extends React.Component {
    constructor(props) {
        super(props);
        let _this = this;
        this.state = {
            loading:true
        }
        //公共的默认option
        this.defaultOption = {
            //系列公共配置
            series:{
                type:'bar'
            },
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
                axisLabel:{
                    color:'#eee'
                }
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
                splitLine:{
                    show:false,
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
                axisPointer:{
                    type:'shadow'
                }
            },
            legend:{
                show:false,
                orient:'vertical',
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
        //两个图的option, totalOption为上方的图，branchOption为下方的图
        this.totalOption = {};
        this.branchOption = {};
    }
    //组件加载完成后对两个折线图setOption
    componentDidMount(){
        //渲染图形的容器
        let totalDom = this.refs.totalChart;
        this.totalChart = echarts.init(totalDom);
        let branchDom = this.refs.branchChart;
        this.branchChart = echarts.init(branchDom);
    }
    resize(){
        this.totalChart.resize();
        this.branchChart.resize();
    }
    //更新数据 totalData/branchData同props，xAxisDataList同props中xAxisData.data
    refreshGraph(arg){
        const params = {...arg};
        this.prepareOption(params);
        this.totalChart.clear();
        this.branchChart.clear();
        this.totalChart.setOption(this.totalOption);
        this.branchChart.setOption(this.branchOption);
        echarts.connect([this.totalChart,this.branchChart]);
        this.setState({loading:false})
    }
    //根据数据组合两个option
    prepareOption(params={}) {
        this.totalData = params.totalData.slice();
        this.branchData = params.branchData.slice();
        let _this = this;
        this.extraOptions = params.extraOptions||{};
        $.extend(true,this.defaultOption,this.extraOptions.base||{});
        let array = ['total','branch'];
        let showTopN = this.props.showTopN||{};
        let dataUnit = params.dataUnit||[[],[]];
        //对两个option操作
        for(let i=0;i<array.length;i++){
            let type = array[i];
            let data = this[type+'Data'];
            let legendData = [];
            //仅显示n条
            let selectedN = showTopN[type];
            //图例列表
            let selected = {};
            let series = data.map(function(item,index) {
                legendData.push(item.name);
                if(selectedN&&index>=selectedN){
                    selected[item.name] = false;
                }
                return $.extend(true,{},_this.defaultOption.series,item);
            });
            //最终组合形成两个折线图的option
            let tooltip = {
                //位置固定在左上角
                position:[10,0],
                backgroundColor:'transparent',
                formatter:function(tipParams) {
                    let tooltipString = '';
                    if(params.tooltipData&&params.tooltipData[type]){
                        tooltipString=params.tooltipData[type].map(function(tooltipItem) {
                            if(tooltipItem.seriesIndex!=undefined){
                                let seriesData = params[type+'Data'][tooltipItem.seriesIndex];
                                return seriesData.name+' : '+seriesData.data[tipParams[0].dataIndex]
                                +(dataUnit[i][tooltipItem.seriesIndex]||'');
                            }
                            return tooltipItem.name+tooltipItem.data[tipParams[0].dataIndex]+(tooltipItem.unit||'');
                        }).join('  ');
                    }
                    else {
                        tooltipString = tipParams.map(function(item) {
                            return item.seriesName+"："+item.value+(dataUnit[i][item.seriesIndex]||'');
                        }).join("  ");
                    }
                    let xString = '';
                    //如果需要显示x轴信息
                    if(_this.props.xAppendtoTip){
                        let format = _this.props.xAppendtoTip.format;
                        //x轴时间格式化
                        if(format){
                            xString = moment(tipParams[0].name,format[0]).format(format[1]);
                        }
                        else {
                            xString = tipParams[0].name;
                        }
                    }
                    return xString+tooltipString;
                }
            };
            if(_this.props.tooltipType==='plain'){
                tooltip = {
                    position:'auto',
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:function(tipParams) {
                        let tooltipString = '';
                        if(params.tooltipData&&params.tooltipData[type]){
                            tooltipString=params.tooltipData[type].map(function(tooltipItem) {
                                if(tooltipItem.seriesIndex!=undefined){
                                    let seriesData = params[type+'Data'][tooltipItem.seriesIndex];
                                    return seriesData.name+' : '+seriesData.data[tipParams[0].dataIndex]
                                    +(dataUnit[i][tooltipItem.seriesIndex]||'');
                                }
                                return tooltipItem.name+tooltipItem.data[tipParams[0].dataIndex]+(tooltipItem.unit||'');
                            }).join('<br />');
                        }
                        else {
                            tooltipString = tipParams.map(function(item) {
                                return item.seriesName+"："+item.value+(dataUnit[i][item.seriesIndex]||'');
                            }).join("<br />");
                        }
                        let xString = '';
                        //如果需要显示x轴信息
                        if(_this.props.xAppendtoTip){
                            let format = _this.props.xAppendtoTip.format;
                            //x轴时间格式化
                            if(format){
                                xString = moment(tipParams[0].name,format[0]).format(format[1]);
                            }
                            else {
                                xString = tipParams[0].name;
                            }
                            xString+='<br />';
                        }
                        return xString+tooltipString;
                    }
                };
            }
            this[type+"Option"].baseOption = $.extend(true,{},this.defaultOption,{
                series,
                legend:{
                    data:legendData,
                    selected
                },
                //配置提示条组件显示内容
                tooltip,
                xAxis:{
                    name:params.xAxisData.name,
                    //x轴数据
                    data:params.xAxisData.data
                }
            },this.extraOptions[type+'Option']||{});
        }
    }
    render(){
        return (<JfCard title={this.props.title} hasTip={this.props.hasTip} loading={this.state.loading}>
            <div className="markets_exponent_chart">
                <div ref="totalChart" style={{width:'100%',height:'50%'}}></div>
                <div ref="branchChart" style={{width:'100%',height:'50%'}}></div>
            </div>
        </JfCard>);
    }
}

export default ConnectedBars;
