import React, {Component} from 'react'
import {Row, Col} from 'antd';
import $ from 'jquery';
import moment from 'moment';
import {JfCard,TipTable} from 'app_common';

import {WaterfallBarPie,ChartLine,NewBar as Bar,Scatter,ConnectedLines,WaterfallBar} from 'app_component';
import {getKpiGraph02} from '../../api';
import CONSTANTS from 'app_constants';
const yAxisOption = {
    name:'',
    splitNumber:4,
    nameLocation:'middle',
    nameGap:40,
    nameTextStyle:{
        color:'#7d919e'
    },
    // scale:true,
    splitLine:{
        lineStyle:{
            color:'#7d919e'
        }
    },
    axisLabel:{
        color:'#7d919e'
    },
    axisTick:{
        show:false
    },
    axisLine:{
        show:false
    }
};

export default class DashboardCustomer extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }

        const seriesFilterParams01 = ['month_id','buy_sell_net_income','buy_sell_market_rate','buy_sell_rank','buy_sell_rank_label'];
        getKpiGraph02({},'01',true,seriesFilterParams01).then(res=>{
            // * month_id                    月份
            // * buy_sell_net_income         代理买卖净收入（千万）
            // * buy_sell_market_rate        代理买卖市占率
            // * buy_sell_rank               排名
            // * buy_sell_rank_label         排名标签
            const totalData=[
                {name:'行业占比',data:res.buy_sell_market_rate},
                {name:'净收入',data:res.buy_sell_net_income}
            ];
            const branchData = [{name:'代理买卖市场排名',data:res.buy_sell_rank}];
            const xAxisData = {name:'',data:res.xAxisData};
            const dataUnit =[''];
            const extraOptions={
                base:{
                    series:[{
                        areaStyle:{
                            normal:{
                                opacity:0
                            }
                        },
                        stack:false
                    }],
                    grid:{
                        left:'12%',
                        right:'14%',
                        width:'auto',
                        top:'25%',
                        bottom:'20'
                    }

                },
                totalOption:{
                    legend:{
                        show:true,
                        orient:'horizontal',
                        left:'center',
                        top:'11%'
                    },

                    tooltip:{
                        formatter:function(params) {
                            let time = moment(params[0].name,'YYYYMM').format('YYYY年M月 ');
                            let unit = ['%','万元']
                            return time+params.map(function(item) {
                                return '公司代理买卖'+item.seriesName+item.value+unit[item.seriesIndex];
                            }).join('，');
                        },
                        textStyle:{
                            fontSize:'12px'
                        }
                    },
                    series:[{
                        smooth:true
                    },{
                        type:'bar',
                        yAxisIndex:1,
                        z:2
                    }],
                    yAxis:[$.extend(true,{splitNumber:3},yAxisOption,{
                        name:'代理买卖净收入行业占比（%）'
                    }),$.extend(true,{},yAxisOption,{
                        name:'公司代理买卖净收入（万元）',
                        nameRotate:270,
                        nameGap:53
                    })]
                },
                branchOption:{
                    series:[{
                        symbolSize:25,
                        showAllSymbol:true,
                        label:{
                            normal:{
                                show:true,
                                position:'inside',
                                color:'#000'
                            }
                        }
                    }],
                    grid:{
                        top:'17%',
                        bottom:'40',
                        right:'14%'
                    },
                    yAxis:{
                        splitNumber:3,
                        show:true
                    },
                    tooltip:{
                        position:['10',0],
                        formatter:function(params) {
                            let time = moment(params[0].name,'YYYYMM').format('YYYY年M月 ');
                            let unit = ['%','万元']
                            return time+params.map(function(item) {
                                return item.seriesName+res.buy_sell_rank_label[item.dataIndex]+'.';
                            }).join('，');
                        },
                        textStyle:{
                            fontSize:'12px'
                        }
                    }
                }
            }
            this.refs.graph_connectedlines.refreshGraph({totalData,branchData,xAxisData,dataUnit,extraOptions});
        })

        getKpiGraph02({},'02',false).then(res=>{
            // broker_fee_commission_income;   手续费及佣金收入万元)
            // broker_interest_income;   利息净收入
            // margin_trading_balance_divid;   两融息费收入 / 两融余额息费分成
            // broker_inte_service_income;   综合业务收入
            // broker_fee_commission_income_rate;   手续费及佣金收入占比
            // broker_interest_income_rate;   利息净收入占比
            // margin_trading_balance_divid_rate;   两融息费收入占比
            // broker_inte_service_income_rate;   综合业务收入占比

            let seriesData = [];
            let percentData = [];
            res.xAxisData.map(date=>{
                let {broker_fee_commission_income:a,broker_interest_income:b,margin_trading_balance_divid:c,broker_inte_service_income:d,
                broker_fee_commission_income_rate:e,broker_interest_income_rate:f,margin_trading_balance_divid_rate:g,broker_inte_service_income_rate:h} = res.seriesData[date]
                seriesData.push({name:date,data:[a,b,c,d]});
                percentData.push([e,f,g,h]);
            })


            const xAxisData  = {name:'',data:['手续费及佣金净收入','利息净收入','两融息费收入','综合业务收入']};
            const extraOption = {
                legend:{
                    show:true,
                    left:'center',
                    orient:'horizontal',
                    top:'15'
                },
                series:seriesData.map(()=>({label:{normal:{show:false}}})),
                grid:{
                    right:'5%',
                    bottom:'20'
                },yAxis:{
                    name:'单位：万元'
                },
                tooltip:{
                    show:true,
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:(params)=>(
                        params[0].name+'<br />'+params.map((pItem)=>(
                            pItem.seriesName+'：'+pItem.value+'万元，'
                            +"占比："+percentData[pItem.seriesIndex][pItem.dataIndex]+'%'
                        )).join('<br />')
                    )
                }
            };
            this.refs.graph_bar1.refreshGraph({seriesData,xAxisData,extraOption});
        })

        const seriesFilterParams03 = ['broker_fee_commission_income','broker_fee_commission_income_mom'];
        getKpiGraph02({},'03',true,seriesFilterParams03).then(res=>{
            // broker_fee_commission_income;      手续费及佣金收入占比(万元)
            // broker_fee_commission_income_mom;  手续费及佣金收入环比
            const extraOptions = {
                grid:{
                    bottom:'10%',
                    left:'6%'

                },
                legend:{
                    show:true,
                    data:['单月佣金收入(万元)','本年累计佣金收入(万元)']
                },
                yAxis:{name:'佣金收入(万元)',nameLocation:'middle',nameGap:57},
                xAxis:{
                    axisLabel:{
                        rotate:30
                    }
                }
            };
            const totalSeriseData = {
                name:"本年累计佣金收入(万元)",
                position:'last',
                show:true
            }
            const viewType = "up";
            const xAxisData= {name:'日期',data:[...res.xAxisData,'本年累计']};
            const seriesData={
                name:"单月佣金收入(万元)",
                data:res.broker_fee_commission_income,
            }
            const tooltipData=[{
                name:'环比',
                data:res.broker_fee_commission_income_mom,
                unit:'%'
            }];
            this.refs.graph_waterfallbar.refreshGraph({extraOptions,totalSeriseData,viewType,xAxisData,seriesData,tooltipData});
        })

        const seriesFilterParams04 = ['margin_trading_balance_divid','margin_trading_balance_divid_mom','margin_trading_balance_divid_sum','margin_trading_balance_divid_sum_yoy'];
        getKpiGraph02({},'04',true,seriesFilterParams04).then(res=>{
            // margin_trading_balance_divid;                两融息费收入占比 / 两融余额息费分成
            // margin_trading_balance_divid_mom;            两融余额息费分成环比
            // margin_trading_balance_divid_sum;            累计两融余额息费分成
            // margin_trading_balance_divid_sum_yoy;        累计两融余额息费分成环比
            const seriesData=[{name:'两融余额息费分成',data:res.margin_trading_balance_divid}];
            const xAxisData={name:'',data:res.xAxisData};
            const extraOption={
                tooltip:{
                    show:true,
                    backgroundColor:'rgba(50,50,50,0.7)'
                },
                yAxis:{
                    name:'两融息费分成（万元）',
                    nameLocation:'middle',
                    nameGap:47,
                    show:true
                },
                legend:{
                    show:true,
                    data:['两融余额息费分成'],
                    left:'center',
                    top:'18'
                },
                grid:{right:'5%',},
                xAxis:{
                    axisLabel:{
                        rotate:30
                    }
                },
                series:[{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                }]
            };
            const tooltipData = [
                {seriesIndex:0},
                {name:'两融余额息费分成环比',data:res.margin_trading_balance_divid_mom,unit:'%'},
                {name:'累计两融余额息费分成',data:res.margin_trading_balance_divid_sum,unit:'万元'},
                {name:'累计两融余额息费分成同比',data:res.margin_trading_balance_divid_sum_yoy,unit:'%'}

            ];
            const dataUnit=['万元'];
            this.refs.graph_bar2.refreshGraph({seriesData,extraOption,xAxisData,dataUnit,tooltipData});
        })

        const seriesFilterParams05 = ['all_expenses','all_expenses_mom','taxes_expenses','taxes_expenses_mom','protection_fund_expenses',
        'protection_fund_expenses_mom','management_fee_expenses','management_fee_expenses_mom','fixed_expenses','fixed_expenses_mom','change_expenses',
        'change_expenses_mom','hr_expenses','hr_expenses_mom'];
        getKpiGraph02({},'05',true,seriesFilterParams05).then(res=>{
            // all_expenses;   当月营业支出
            // all_expenses_mom;   当月营业支出环比
            // taxes_expenses;   营业税金及附加
            // taxes_expenses_mom;   营业税金及附加环比
            // protection_fund_expenses;   投资者保护基金
            // protection_fund_expenses_mom;   投资者保护基金环比
            // management_fee_expenses;   业务及管理费
            // management_fee_expenses_mom;   业务及管理费环
            // fixed_expenses;   固定费用
            // fixed_expenses_mom;   固定费用环比
            // change_expenses;   变动费用
            // change_expenses_mom;   变动费用环比
            // hr_expenses;  人力成本
            // hr_expenses_mom;   人力成本环比

            const pieSeriesData = [
                [
                    {name:' 业务及管理费',data:res.management_fee_expenses},
                    {name:'投资者保护基金',data:res.protection_fund_expenses},
                    {name:'营业税金及附加',data:res.taxes_expenses}
                ],
                [
                    {name:'人力成本',data:res.hr_expenses},
                    {name:'固定费用',data:res.fixed_expenses},
                    {name:'变动费用',data:res.change_expenses}
                ]
            ];
            let __all_expenses_total = 0
            const __all_expenses = res.all_expenses.map(v=>{
                let num = v
                if (!isNaN(v)) {
                    num = Number(v)
                }
                __all_expenses_total += num;
                return num
            })
            const __all_expenses_mom = res.all_expenses_mom.map(v=>{
                if (!isNaN(v)) return Number(v)
                return v
            })
            const xAxisData = {name:'日期',data:[...res.xAxisData,'本年累计']};
            const singleData = {name:'当月营业支出',data:__all_expenses};
            const totalData = {name:'',value:__all_expenses_total}
            const dataUnit = '万元';
            const tooltipData = [{
                name:'当月营业支出环比',
                data:__all_expenses_mom,
                unit:'%'
            }];
            this.refs.garph_waterfallbarpie.refreshGraph({pieSeriesData,xAxisData,singleData,totalData,dataUnit,tooltipData});

            const seriesData_bar = [
                {name:'业务及管理费用',data:res.management_fee_expenses},
                {name:'投资者保护基金',data:res.protection_fund_expenses},
                {name:'营业税金及附加',data:res.taxes_expenses},
                {name:'人力成本',data:res.hr_expenses},
                {name:'固定费用',data:res.fixed_expenses},
                {name:'变动费用',data:res.change_expenses}
            ];
            const tooltipData_bar = [
                {data:res.management_fee_expenses_mom,unit:'%'},
                {data:res.protection_fund_expenses_mom,unit:'%'},
                {data:res.taxes_expenses_mom,unit:'%'},
                {data:res.hr_expenses_mom,unit:'%'},
                {data:res.fixed_expenses_mom,unit:'%'},
                {data:res.change_expenses_mom,unit:'%'},
            ];
            const extraOption_bar = {
                tooltip:{
                    show:true,
                    backgroundColor:'rgba(50,50,50,0.7)',
                    formatter:function(params) {
                        let tooltipItem = tooltipData_bar[params[0].seriesIndex];
                        return params[0].name+'<br />'+params[0].seriesName+' : '+params[0].value+'万元'
                        +'<br />'+params[0].seriesName+'环比: '+tooltipItem.data[params[0].dataIndex]+tooltipItem.unit;
                    }
                },
                legend:{
                        show:true,
                        orient:'horizontal',
                        left:'center',
                        selectedMode:'single',
                        top:'4%',
                        // data:['业务及管理费用','投资者保护基金','营业税金及附加','人力成本','固定费用','变动费用']

                },
                grid:{right:'5%',
                left:'5%'},
                yAxis:{
                    // name:'营业支出（万元）',
                    nameLocation:'middle',
                    nameGap:48,
                    show:true,
                    scale:true
                },
                xAxis:{
                    axisLabel:{
                        rotate:30
                    }
                },
                series:[{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                    },{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                    },{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                    },{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                    },{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                    },{
                    label:{
                        normal:{
                            show:false
                        }
                    }
                }]
            };
            this.refs.graph_bar3.refreshGraph({xAxisData:{name:'',data:res.xAxisData},seriesData:seriesData_bar,extraOption:extraOption_bar});
        })

        const seriesFilterParams06 = ['broker_profit_goal','broker_profit','broker_profit_goal_mom','broker_profit_goal_sum','broker_profit_index_goal_sum','broker_profit_goal_rate']
        getKpiGraph02({},'06',true,seriesFilterParams06).then(res=>{
            // broker_profit_goal;   当月考核利润
            // broker_profit;   当月总共利润
            // broker_profit_goal_mom;   当月考核利润环比
            // broker_profit_goal_sum;   年累计考核利润
            // broker_profit_index_goal_sum;   年累计考核利润指标
            // broker_profit_goal_rate;   年累计达成率
            const totalData = [
                {name:' 累计考核利润',data:res.broker_profit_goal_sum},
                {name:'KPI进度指标',data:res.broker_profit_index_goal_sum}
            ];
            const branchData = [
                {name:' 考核利润',data:res.broker_profit_goal},
                {name:'利润总额',data:res.broker_profit}
            ];
            const tooltipData = {
                total:[{
                    name:'进度完成率',
                    data:res.broker_profit_goal_rate,
                    unit:'%'
                }],
                branch:[{
                    name:'单月考核利润环比',
                    data:res.broker_profit_goal_mom,
                    unit:'%'
                }]
            };
            const xAppendtoTip = true;
            const dataUnit = [['万元','万元'],['万元','万元']];
            const xAxisData = {name:'',data:res.xAxisData};
            const extraOptions = {
                base:{
                    series:[{
                        stack:false
                    }],
                    title: {
                        text: '当月',
                        padding:10,
                        textStyle : { fontSize : 12 ,color: '#7d7a97'}
                    },
                    grid:{
                        left:'15%',
                        right:'5%',
                        top:'27%',
                        width:'auto'
                    },
                    xAxis:{
                        axisTick:{
                            show:false
                        }
                    },
                    yAxis:{
                        name:'利润（万元）',
                        nameLocation:'middle',
                        nameGap:62,
                        nameTextStyle:{
                            padding:0
                        },
                        show:true
                    },
                    legend:{
                        show:true,
                        left:'center',
                        top:'2%',
                        orient:'horizontal'
                    },tooltip:{
                        position:['1%','10%'],
                        textStyle:{
                             fontSize:'12px'
                        },

                    }
                },
                totalOption:{
                    grid:{
                        bottom:5
                    },
                    title: {
                        text: '累计'
                    },
                    series:[{
                        smooth:true
                    }],
                    xAxis:{
                        axisLabel:{
                            show:false
                        }
                    }
                },
                branchOption:{
                    series:[{
                        type:'bar',
                        barMinHeight:1
                    }],

                    yAxis:{
                        min:'dataMin',
                        boundaryGap:['10%',0]
                    }
                }
            }
            this.refs.graph_connectedlines2.refreshGraph({totalData,branchData,tooltipData,xAppendtoTip,dataUnit,xAxisData,extraOptions});
        })

        const seriesFilterParams07 = ['center_branch_profit','a_branch_profit','b_branch_profit','c_branch_profit','d_branch_profit','x_branch_profit','second_branch_profit',
        'center_branch_market_rate','a_branch_market_rate','b_branch_market_rate','c_branch_market_rate','d_branch_market_rate','x_branch_market_rate','second_branch_market_rate'];
        getKpiGraph02({},'07',true,seriesFilterParams07).then(res=>{
            // center_branch_profit;   中心类考核利润
            // a_branch_profit;   A类考核利润
            // b_branch_profit;   B类考核利润
            // c_branch_profit;   C类考核利润
            // d_branch_profit;   D类考核利润
            // x_branch_profit;   X类考核利润
            // second_branch_profit;   二级网点考核利润
            // center_branch_market_rate;   中心类考核市占率
            // a_branch_market_rate;   A类考核市占率
            // b_branch_market_rate;   B类考核市占率
            // c_branch_market_rate;   C类考核市占率
            // d_branch_market_rate;   D类考核市占率
            // x_branch_market_rate;   X类考核市占率
            // second_branch_market_rate;   二级网点考核市占率
            const totalData = [
                {name:'中心类 ',data:res.center_branch_market_rate},
                {name:'A类 ',data:res.a_branch_market_rate},
                {name:'B类 ',data:res.b_branch_market_rate},
                {name:'C类 ',data:res.c_branch_market_rate},
                {name:'D类 ',data:res.d_branch_market_rate},
                {name:'X类 ',data:res.x_branch_market_rate},
                {name:'二级网点 ',data:res.second_branch_market_rate}
            ];
            const branchData = [
                {name:'中心类 ',data:res.center_branch_profit},
                {name:'A类 ',data:res.a_branch_profit},
                {name:'B类 ',data:res.b_branch_profit},
                {name:'C类 ',data:res.c_branch_profit},
                {name:'D类 ',data:res.d_branch_profit},
                {name:'X类 ',data:res.x_branch_profit},
                {name:'二级网点 ',data:res.second_branch_profit}
            ];
            const xAxisData = {name:'',data:res.xAxisData};
            const dataUnit = ['',''];
            const showTopN = {total:3,branch:3};
            const extraOptions = {
                base:{
                    series:[{
                        areaStyle:{
                            normal:{
                                opacity:0
                            }
                        },
                        stack:false
                    }],
                    grid:{
                        left:'12%',
                        right:'5%',
                        top:'30%',
                        width:'auto'
                    },

                    yAxis:{
                        show:true

                    },
                    tooltip:{
                        position:['1%','10%'],
                        textStyle:{
                             fontSize:'12px'
                        },
                        axisPointer:{
                            type:'shadow'
                        }
                    }
                },
                totalOption:{
                    legend:{
                        show:true,
                        left:'center',
                        top:'3',
                        orient:'horizontal'
                    },

                    yAxis:{
                        axisLabel:{
                            formatter:'{value}%'
                        }
                    },
                    tooltip:{
                        formatter:function(params) {
                            return '考核市占率: '+'<span >'+params.map(function(item) {
                                return item.seriesName+''+item.value+'%';
                            }).join(',')+'</span>';
                        }
                    },
                    series:[{
                        smooth:true
                    }]
                },
                branchOption:{
                    series:[{
                        type:'bar'
                    }],
                    legend:{
                        top:'0',
                    },
                    grid:{
                        top:'22%',
                    },
                    yAxis:{
                        splitNumber:3
                    },
                    tooltip:{
                        position:['1%','0%'],
                        formatter:function(params) {
                            return '考核利润（万元）: '+'<span >'+params.map(function(item) {
                                return item.seriesName+''+item.value;
                            }).join('，') +'</span>';
                        }
                    }
                }
            }
            this.refs.graph_connectedlines3.refreshGraph({totalData,branchData,xAxisData,dataUnit,showTopN,extraOptions});
        })
    }
    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    render(){
        return (
            <div>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ConnectedLines
                                ref = 'graph_connectedlines'
                                title='代理买卖净收入市占率及排名'
                                hasTip={()=>{return this.returnTipTable('09')}}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Bar
                            ref='graph_bar1'
                            title="经纪业务主要收入占比变动"
                            hasTip={()=>{return this.returnTipTable('10')}}
                        />
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        {/* <Bar
                            ref='graph_bar1'
                            title={'客户业务类型（截止到目前所有客户）'}
                            seriesData={[{name:'',data:[976,435,222,123,50]}]}
                            yAxisData={{name:'',data:['限售股','约定式购回','股票质押','港股通','个股期权']}}
                            visualMap={true}
                            dataUnit={['人']}
                            percentData={[['49%','20%','10%','6%','3%']]}
                        /> */}

                        <WaterfallBar
                            ref='graph_waterfallbar'
                            title="手续费及净佣金收入增长趋势图"
                            hasTip={()=>{return this.returnTipTable('11')}}
                        />

                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Bar
                            ref='graph_bar2'
                            title='两融余额息费分成'
                            hasTip={()=>{return this.returnTipTable('12')}}
                        />
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} className="kpi_cust_cb">
                    <WaterfallBarPie

                        ref='garph_waterfallbarpie'
                        title="成本支出变化趋势图"
                        hasTip={()=>{return this.returnTipTable('13')}}
                    />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="kpi_customer_cb">营业支出（万元）</div>
                    <Bar
                        ref='graph_bar3'
                        title={'成本支出结构趋势图'}
                        hasTip={()=>{return this.returnTipTable('14')}}
                    />
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <ConnectedLines
                        ref='graph_connectedlines2'
                        title='经纪业务利润变化趋势'
                        hasTip={()=>{return this.returnTipTable('15')}}
                    />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="kpi_cust_width">
                    <ConnectedLines
                        ref='graph_connectedlines3'
                        title='各类网点考核市占率及利润变化趋势'
                        hasTip={()=>{return this.returnTipTable('16')}}
                    /></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
