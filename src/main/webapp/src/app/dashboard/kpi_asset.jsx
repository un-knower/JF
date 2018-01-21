import React, {Component} from 'react'
import {Row, Col} from 'antd';
import moment from 'moment';
import {JfCard,TipTable} from 'app_common';
import {LinesBars,ChartLine,ChartPie,NewBar,Bar,Scatter,ConnectedLines} from 'app_component';
import {getKpiGraph03} from '../../api';
import CONSTANTS from 'app_constants';

export default class DashboardAsset extends Component {

    componentDidMount(){
        const _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }

        const seriesFilterParams01 = ['asset','asset_mom','market_balance','market_balance_mom','assecu_balance','secu_balance_mom'];
        getKpiGraph03({},'01',true,seriesFilterParams01).then(res=>{

            const xAxisData = {name:'',data:res.xAxisData};

            /**
             * 单月客户资产
             */
            const asset = res.asset;

            /**
             * 单月客户资产环比%
             */
            const asset_mom = res.asset_mom;

            /**
             * 单月市场规模（千亿）
             */
            const market_balance = res.market_balance;

            /**
             * 单月市场环比%
             */
            const market_balance_mom = res.market_balance_mom;

            /**
             * 单月客户持仓（亿）
             */
            const assecu_balance = res.assecu_balance;

            /**
             * 单月客户市值环比%
             */
            const secu_balance_mom = res.secu_balance_mom;


            let mom_data = [asset_mom,market_balance_mom,secu_balance_mom];

            this.refs.graph_connectedlines.refreshGraph({
                totalData:[{name:'客户资产',data:asset}],
                branchData:[
                    {name:'市场规模',data:market_balance},
                    {name:'客户持仓',data:assecu_balance}
                ],
                xAxisData:xAxisData,
                extraOptions:{
                    base:{
                        series:[{
                            type:'bar',
                            stack:false,
                            barMaxWidth:30
                        }],

                        tooltip:{
                            axisPointer:{
                                type:'shadow'
                            },
                            position:['14%','6%'],
                            textStyle:{
                                fontSize:'12px'
                            }
                        }
                    },
                    totalOption:{
                        yAxis:{
                            name:'（亿元）'
                        },
                        grid:{
                            bottom:5,
                            left:'15%',
                            width:'75%',

                        },
                        xAxis:{
                            axisTick:{
                                show:false
                            },
                            axisLabel:{
                                show:false
                            }
                        },
                        tooltip:{
                            formatter:function(params) {
                                let time = moment(params[0].name,"YYYYMM").format("YYYY年M月 ");
                                return time+params[0].seriesName+params[0].value+'亿，环比'
                                +mom_data[0][params[0].dataIndex]+'%';
                            }
                        }
                    },
                    branchOption:{
                        series:[{},{
                            type:'line',
                            areaStyle:{
                                normal:{
                                    opacity:0
                                }
                            },
                            yAxisIndex:1
                        }],
                        grid:{
                            left:'15%',
                            width:'75%',
                            top:'28%'

                        },
                        yAxis:[{
                            name:'（万亿）',

                            nameTextStyle:{
                                color:'#7d919e',
                                padding:[0,50,0,0]
                            },
                            splitNumber:4,
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
                        },{
                            name:'（亿元）',

                            nameTextStyle:{
                                color:'#7d919e',
                                padding:[0,0,0,50]
                            },
                            splitNumber:4,
                            splitLine:{
                                show:false
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
                        }],
                        tooltip:{
                            formatter:function(params) {
                                let time = moment(params[0].name,"YYYYMM").format("YYYY年M月 ");
                                return time+params.map(function(item,index) {
                                    if(index===0){
                                        return item.seriesName+item.value+'万亿，环比'
                                        +mom_data[1][item.dataIndex]+'%。';
                                    }
                                    else {
                                        return '<em>'+'公司客户市值'+item.value+'亿，环比'
                                        +mom_data[2][item.dataIndex]+'%。'+'</em>'
                                    }
                                }).join('');
                            }
                        },
                        legend:{
                            show:true,
                            orient:'horizontal',
                            top:'top',
                            left:'10%'
                        },
                        color:['#b7a2e7', '#f0ba4e', '#f88db9', '#71d398', '#8d9df2','#6acafa']
                    }
                }
            });
        })
        const seriesFilterParams02 = ['asset_turnover_rate_sum','asset_hedge_rate_sum','asset_hedge_rate','asset_turnover_rate'];
        getKpiGraph03({},'02',true,seriesFilterParams02).then(res=>{
            const dataUnit = ['%','%','%','%'];
            this.refs.graph_linesbars.refreshGraph({
                seriesData:[
                    {
                        name:'资产周转率',
                        data:res.asset_turnover_rate,
                        type:'bar',
                        barMinHeight:1,
                        yAxisIndex:1
                    },
                    {
                        name:'累计资产周转率',
                        data:res.asset_turnover_rate_sum,
                        type:'bar',
                        barMinHeight:1,
                        yAxisIndex:1
                    },
                    {
                        name:'资产保值率',
                        data:res.asset_hedge_rate,
                        type:'line'
                    },
                    {
                        name:'累计资产保值率',
                        data:res.asset_hedge_rate_sum,
                        type:'line'
                    }
                ],
                xAxisData:{data:res.xAxisData},
                extraOption:{
                    grid:{
                        left:'13%',
                        right:'13%'
                    },
                    yAxis:[
                        {name:'资产保值率（%）',nameGap:30, nameLocation:'middle'},
                        {name:'资金周转率（倍）',nameGap:30, }
                    ],
                    tooltip:{
                        formatter:function(params) {
                            let time = moment(params[0].name,"YYYYMM").format('M月');
                            return time+'<br />'+params.map(function(item) {
                                let seriesIndex = item.seriesIndex;
                                if(seriesIndex%2===0){
                                    return item.seriesName+' : '+item.value
                                    +dataUnit[seriesIndex];
                                }
                                else {
                                    return '1-'+time+item.seriesName+' : '+item.value
                                    +dataUnit[seriesIndex];
                                }
                            }).join('<br />');
                        }
                    }
                }
            });
        });
        getKpiGraph03({},'03',false).then((res)=>{
            let barIndex = ['1','2'];
            for(let key in barIndex){
                let index = barIndex[key];
                let percentData = [];
                let yAxisData = [];
                let seriesData = res['0'+index].map((item)=>{
                    percentData.push(item.rate);
                    yAxisData.push(item.businessFlagName);
                    return item.custNum;
                });
                this.refs['graph_bar'+index].refreshGraph({
                    seriesData:[{data:seriesData}],
                    yAxisData:{data:yAxisData},
                    visualMap:true,
                    dataUnit:['人'],
                    percentData:[percentData],
                    extraOption:{
                        grid:{
                            left:'3%',
                            top:'5%',
                            bottom:'5%',
                            right:'18%'
                        },yAxis:{
                            axisLine:{
                                lineStyle:{
                                    color:'#fff'
                                }
                            }}
                    }
                });
            }
        });
        const seriesFilterParams04 = ['in_value','in_capital','in_capital_sum','in_value_sum'];
        getKpiGraph03({},'04',true,seriesFilterParams04).then((res)=>{
            let tooltip = [{
                name:'本年累计',
                data:res.in_capital_sum,
                unit:'亿元'
            },{
                name:'本年累计',
                data:res.in_value_sum,
                unit:'亿元'
            }];
            this.refs.graph_bar3.refreshGraph({
                seriesData:[
                    {name:' 净存入资金',data:res.in_capital},
                    {name:' 净转入市值',data:res.in_value}
                ],
                xAxisData:{data:res.xAxisData},
                extraOption:{
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
                    }],
                    tooltip:{
                        show:true,
                        position:['10%','5%'],
                        formatter:function(params) {
                            let time = moment(params[0].name,'YYYYMM').format('YYYY年MM月');
                            return params.map(function(item,index) {
                                return time+item.seriesName+item.value+'亿元'+'，'
                                +tooltip[index].name+tooltip[index].data[item.dataIndex]
                                +tooltip[index].unit;
                            }).join('<br />');
                        },
                        textStyle:{
                            fontSize:'12px'
                        }
                    },
                    grid:{

                        top:'17%',
                        bottom:'5%',
                        right:'5%'

                    },
                    yAxis:{
                        show:true,
                        splitLine:{
                            show:true
                        },
                        axisLine:{
                            show:true
                        }
                    },
                    legend:{
                        show:true,
                        left:'center',
                        top:'1%',
                        orient:'horizontal'
                    },
                    xAxis:{
                        axisLabel:{
                            interval:'auto'
                        }
                    }
                }
            });
        });
        const seriesFilterParams05 = ['new_custom','new_custom_market_rate'];
        getKpiGraph03({},'05',true,seriesFilterParams05).then(res=>{
            // new_custom;   公司新增开户数
            // new_custom_market_rate;   全国占比
            const seriesData = [
                {
                    name:'公司新增开户数',
                    data:res.new_custom,
                    type:'bar',
                    yAxisIndex:1
                },
                {
                    name:'全国占比',
                    data:res.new_custom_market_rate,
                    type:'line'
                }
            ];
            const xAxisData = {name:'',data:res.xAxisData};
            const extraOption = {
                legend:{
                    left:'center',

                },grid:{
                    right:'14%',
                    left:'12%'
                },
                yAxis:[{
                    name:'全国占比',
                    nameGap:25,
                    axisLabel:{
                        formatter:'{value}%'
                    }
                },{
                    name:'公司新增开户数',
                    nameGap:38,

                }]
            };
            const dataUnit = ['人','%'];
            this.refs.graph_linesbars2.refreshGraph({seriesData,xAxisData,extraOption,dataUnit});
        })

        const seriesFilterParams06 = ['new_custom_sum_ly','new_custom_market_rate_sum_ly','new_custom_sum','new_custom_market_rate_sum'];
        getKpiGraph03({},'06',true,seriesFilterParams06).then(res=>{
            // new_custom_sum_ly;   去年公司累计新增开户数
            // new_custom_market_rate_sum_ly;   去年累计全国占比
            // new_custom_sum;   公司累计新增开户数
            // new_custom_market_rate_sum;   累计全国占比
            //
            const seriesData = [
                {
                    name:'2017公司累计新增开户数',
                    data:res.new_custom_sum,
                    type:'bar',
                    yAxisIndex:1
                },
                {
                    name:'2016公司累计新增开户数',
                    data:res.new_custom_sum_ly,
                    type:'bar',
                    yAxisIndex:1
                },
                {
                    name:'2017全国累计占比',
                    data:res.new_custom_market_rate_sum,
                    type:'line',
                },
                {
                    name:'2016全国累计占比',
                    data:res.new_custom_market_rate_sum_ly,
                    type:'line'
                }
            ];
            const __xAxisData = res.xAxisData.map(v=>CONSTANTS.month_en_ch_map[v])
            const xAxisData = {name:'',data:__xAxisData};
            const graph_linesbars_dataUnit3 = ['人','人','%','%'];
            const extraOption = {
                legend:{
                    left:'center',
                    top:'2%',
                    width:'80%'
                },
                grid:{
                    top:'18%',
                    right:'15%',
                    left:'12%'
                },
                yAxis:[{
                    name:'全国累计占比',
                    nameGap:25,
                    axisLabel:{
                        formatter:'{value}%'
                    }
                },{
                    name:'累计开户数',
                    nameLocation:'middle',
                    nameGap:40,
                }],
                tooltip:{
                    formatter:function(params) {
                        let time = '1-'+params[0].name;
                        return time+'<br />'+params.map(function(item) {
                            return item.seriesName.substring(0,6)+time+item.seriesName.substring(6)
                            +' : '+item.value+graph_linesbars_dataUnit3[item.seriesIndex];
                        }).join('<br />');
                    }
                }
            };
            this.refs.graph_linesbars3.refreshGraph({seriesData,xAxisData,extraOption});
        })

        const seriesFilterParams07 = ['new_custom_asset','new_custom_commission'];
        getKpiGraph03({},'07',true,seriesFilterParams07).then(res=>{
            // new_custom_asset;   新增开户贡献资产额（亿元）
            // new_custom_commission;   新增开户贡献交易佣金收入（万元）
            const seriesData = [
                {
                    name:'新增开户贡献资产额',
                    data:res.new_custom_asset,
                    type:'bar'
                },
                {
                    name:'新增开户贡献交易佣金收入',
                    data:res.new_custom_commission,
                    type:'bar',
                    yAxisIndex:1
                }
            ];
            const xAxisData = {name:'',data:res.xAxisData};
            const extraOption = {
                yAxis:[{
                    name:'资产额（亿元）'
                },{
                    name:'交易佣金（万元）'
                }]
            };
            const dataUnit = ['亿元','万元'];
            this.refs.graph_linesbars4.refreshGraph({seriesData,xAxisData,extraOption,dataUnit});
        })

        const seriesFilterParams08 = ['new_custom_asset_sum_ly','new_custom_commission_sum_ly','new_custom_asset_sum','new_custom_commission_sum'];
        getKpiGraph03({},'08',true,seriesFilterParams08).then(res=>{
            // new_custom_asset_sum_ly;   去年新增开户贡献资产额累计（亿元）
            // new_custom_commission_sum_ly;   去年新增开户贡献交易佣金收入累计（万元）
            // new_custom_asset_sum;   新增开户贡献资产额累计（亿元）
            // new_custom_commission_sum;   新增开户贡献交易佣金收入累计（万元）
            const seriesData = [
                {
                    name:'2017累计贡献资产额',
                    data:res.new_custom_asset_sum,
                    type:'bar'
                },
                {
                    name:'2016累计贡献资产额',
                    data:res.new_custom_asset_sum_ly,
                    type:'bar'
                },
                {
                    name:'2017累计贡献交易佣金',
                    data:res.new_custom_commission_sum,
                    type:'line',
                    yAxisIndex:1
                },
                {
                    name:'2016累计贡献交易佣金',
                    data:res.new_custom_commission_sum_ly,
                    type:'line',
                    yAxisIndex:1
                }
            ];
            const __xAxisData = res.xAxisData.map(v=>CONSTANTS.month_en_ch_map[v])
            const xAxisData = {name:'',data:__xAxisData};
            const dataUnit = ['亿元','亿元','万元','万元'];
            const extraOption = {
                legend:{
                    left:'center',
                    top:'2%',
                    width:'60%'
                },
                grid:{
                    top:'21%',
                },
                yAxis:[{
                    name:'资产额（亿元）'
                },{
                    name:'交易佣金（万元）'
                }],
                tooltip:{
                    formatter:function(params) {
                        let time = '1-'+params[0].name;
                        return time+'<br />'+params.map(function(item) {
                            return item.seriesName.substring(0,4)+'年'+time+item.seriesName.substring(4)
                            +' : '+item.value+dataUnit[item.seriesIndex];
                        }).join('<br />');
                    }
                }
            };
            this.refs.graph_linesbars5.refreshGraph({seriesData,xAxisData,extraOption,dataUnit});
        })
        getKpiGraph03({},'09',false).then(res=>{
            this.refs.graph_scatter1.refreshGraph({
                chartData:res.map((item)=>(
                    {
                        name:item.province,
                        value:[item.open_sum,item.reward_sum,item.commission_sum]
                    }
                )),
                extraOption:{
                    dataZoom:[{
                        backgroundColor: 'rgba(105,101,116,0.1)',
                        handleColor: '#fff',
                        fillerColor: 'rgba(105,101,116,.3)',
                        dataBackgroundColor: 'rgba(131,126,145,0.5)',
                        textStyle:{
                            color:'#fff'
                        },

                        bottom:'2%',
                        height:17,
                        realtime:false
                    },{
                        backgroundColor: 'rgba(105,101,116,0.1)',
                        handleColor: '#fff',
                        fillerColor: 'rgba(105,101,116,.3)',
                        dataBackgroundColor: 'rgba(131,126,145,0.5)',
                        yAxisIndex:0,
                        textStyle:{
                            color:'#fff'
                        },
                        width:17,
                        left:'95%',
                        right:'1%',
                        realtime:false
                    }]
                },
                dataUnit:['人','人','亿元'],
                dataNames:['新增开户','有效奖励','交易佣金'],
                axisNames:['新增开户客户数','有效奖励客户'],
                markLineLabel:["平均新增开户客户数","  平\n  均\n  有\n  效\n  奖\n  励\n  客\n  户\n"]
            });
        });
        getKpiGraph03({},'10',false).then(res=>{
            this.refs.graph_scatter2.refreshGraph({
                chartData:res.map((item)=>(
                    {
                        name:item.city,
                        value:[item.open_sum,item.reward_sum,item.commission_sum]
                    }
                )),
                dataUnit:['人','人','亿元'],
                extraOption:{
                    dataZoom:[{
                        backgroundColor: 'rgba(105,101,116,0.1)',
                        handleColor: '#fff',
                        fillerColor: 'rgba(105,101,116,.3)',
                        dataBackgroundColor: 'rgba(131,126,145,0.5)',
                        textStyle:{
                            color:'#fff'
                        },
                        height:17,
                        top:'94%',
                        bottom:'1%',
                        realtime:false
                    },{
                        yAxisIndex:0,
                        backgroundColor: 'rgba(105,101,116,0.1)',
                        handleColor: '#fff',
                        fillerColor: 'rgba(105,101,116,.3)',
                        dataBackgroundColor: 'rgba(131,126,145,0.5)',
                        textStyle:{
                            color:'#fff'
                        },
                        left:'95%',
                        width:17,
                        right:'1%',
                        realtime:false
                    }]
                },
                dataNames:['新增开户','有效奖励','交易佣金'],
                axisNames:['新增开户客户数','有效奖励客户'],
                markLineLabel:["平均新增开户客户数","  平\n  均\n  有\n  效\n  奖\n  励\n  客\n  户\n"]
            });
        });
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
                        <div className="business_line_height kpi_asset_width">
                        <ConnectedLines title="公司客户资产变动与市场规模对标"
                        hasTip={()=>{return this.returnTipTable('17')}}
                        ref="graph_connectedlines" />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="">
                            <LinesBars
                                ref='graph_linesbars'
                                title="资产保值率及资产周转率趋势"
                                hasTip={()=>{return this.returnTipTable('18')}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col  xs={24} sm={24} md={24} lg={12} xl={12}>
                        <JfCard  className="kpi_asset_bg" >
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="business_line_height asset_ywlx">
                                    {/* <div className="branch_container_title "> <span>（截止到目前所有客户）</span></div> */}

                                <NewBar
                                    ref='graph_bar1'
                                    title={'客户业务类型'}
                                    hasTip={()=>{return this.returnTipTable('19')}}
                                />
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="business_line_height asset_zcjg">
                                <NewBar
                                    ref='graph_bar2'
                                    title={'客户资产结构'}
                                    hasTip={()=>{return this.returnTipTable('20')}}
                                />
                                </div>
                            </Col>
                        </JfCard>
                    </Col>


                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                            <NewBar title="净存入资金与净转入市值变化趋势"
                            hasTip={()=>{return this.returnTipTable('21')}}
                            ref="graph_bar3"/>
                        </div>
                    </Col>

                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                            <LinesBars
                                ref='graph_linesbars2'
                                title="公司及全国新增开户数趋势"
                                hasTip={()=>{return this.returnTipTable('22')}}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                        <LinesBars
                            ref='graph_linesbars3'
                            title="公司及全国累计新增开户数趋势"
                            hasTip={()=>{return this.returnTipTable('23')}}
                        />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                            <LinesBars
                                ref='graph_linesbars4'
                                title="新开户资产额及交易佣金趋势"
                                hasTip={()=>{return this.returnTipTable('24')}}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                        <LinesBars
                            ref='graph_linesbars5'
                            title="新开户资产额及交易佣金累计趋势"
                            hasTip={()=>{return this.returnTipTable('25')}}
                        />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                        <Scatter
                            ref='graph_scatter1'
                            title="近一月新增客户及佣金分布"
                            hasTip={()=>{return this.returnTipTable('26')}}
                        />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                        <Scatter
                            ref='graph_scatter2'
                            title="浙江省的新客及新客交易佣金"
                            hasTip={()=>{return this.returnTipTable('27')}}
                        />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
