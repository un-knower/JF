import React, {Component} from 'react'
import {Row, Col, Table,Radio} from 'antd';
import moment from 'moment';
import {PanelContainer,JfCard,TipTable} from 'app_common';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {getKpiGraph,getBranchKpiRank,getBranchKpiRankAeraData} from '../../api';
import {NewBar as Bar,LinesBars,ChartLine,ConnectedMap,ConnectedLines} from 'app_component';
import CONSTANTS from 'app_constants';
// Top30家券商交易量(股+基)排名 (按当月)
const { Column, ColumnGroup } = Table;
import $ from 'jquery';

const branchRankColumns = [
    {
        title: '分公司名称',
        dataIndex: 'branch_name',
        key: 'branch_name',
        width:90

    }, {
        title: '考核市占率%',
        dataIndex: 'market_rate',
        key: 'market_rate',


        sorter: (a, b) => {
             let x = a.market_rate;
             let y = b.market_rate;
             if (a.market_rate === '-') {
                x = -99999999;
             }
             if (b.market_rate === '-') {
                y = -99999999;
             }
             return x - y
        }
    }, {
        title: '达成率%',
        dataIndex: 'market_rate_complete_rate',
        key: 'market_rate_complete_rate',
        sorter: (a, b) => {
             let x = a.market_rate_complete_rate;
             let y = b.market_rate_complete_rate;
             if (a.market_rate_complete_rate === '-') {
                x = -99999999;
             }
             if (b.market_rate_complete_rate === '-') {
                y = -99999999;
             }
             return x - y
        }
    }, {
        title: '考核利润(万元)',
        dataIndex: 'profit',
        key: 'profit',
        className:'table_color',
        sorter: (a, b) => {
             let x = a.profit;
             let y = b.profit;
             if (a.profit === '-') {
                x = -99999999;
             }
             if (b.profit === '-') {
                y = -99999999;
             }
             return x - y
        }
    }, {
        title: '达成率%',
        dataIndex: 'profit_complete_rate',
        key: 'profit_complete_rate',
        sorter: (a, b) => {
             let x = a.profit_complete_rate;
             let y = b.profit_complete_rate;
             if (a.profit_complete_rate === '-') {
                x = -99999999;
             }
             if (b.profit_complete_rate === '-') {
                y = -99999999;
             }
             return x - y
        }
    }
];

export default class DashboardBusiness extends Component {

    constructor(props) {
        super(props);

        this.state = {
            top25TableData:[],
            top25TableTitle:[],
            branchKpiRankTableData:[],
            branchKpiRankLoading:true
        }

        this.areaDataList = [];

        this.getProvinceData = this.getProvinceData.bind(this);
    }

    getProvinceData(province){

        const {provinceList,cityList,scatterData} = this.getCityData(province)
        return {
            provinceData:{name:'业务量',data:cityList},
            provinceScatterData:scatterData,
        };
        // this.refs.graph_map1.refreshGraph({
        //     countryData:{name:['业务量'],data:provinceList},
        //     provinceData:{name:'业务量',data:cityList},
        //     provinceScatterData:scatterData,
        //     provinceScatterName:['交易量','资产总额','客户数'],
        // });
    }

    getCityData(name){
        let provinceList = [];
        let cityList = [];
        let scatterData = [];
        this.areaDataList.map(item=>{
            provinceList.push({name:item.provinceName,value:[item.tradeAmountSum]});
            if (item.provinceName === name) {
                item.cityList.map(city=>{
                    let {cityName,branchList,tradeAmountSum} = city;
                    cityList.push({name:cityName,value:tradeAmountSum});
                    branchList.map(brach=>{
                        let {branchName,kpiIncome,lat,lng,profit,tradeAmount} = brach;
                        scatterData.push({name:branchName,value:[lat,lng,tradeAmount,kpiIncome,profit]});
                    })
                })
            }
        })
        return {provinceList,cityList,scatterData}
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

        const seriesFilterParams01 = ['buy_sell_amount','buy_sell_amount_rate','buy_sell_market_rate','buy_sell_market_rate_sum','buy_sell_rate_zhejiang','buy_sell_rate_zhejiang_sum'];
        getKpiGraph({},'01',true,seriesFilterParams01).then(res=>{
            //         buy_sell_amount,                    //单月公司代买交易量
            //         buy_sell_amount_rate,               //单月公司股基交易量环比
            //         buy_sell_market_rate,               //单月公司市场占有率（全国）
            //         buy_sell_market_rate_sum,           //累计公司市场占有率（全国）
            //         buy_sell_rate_zhejiang,             //单月公司市场占有率（浙江）
            //         buy_sell_rate_zhejiang_sum          //累计公司市场占有率（浙江）
            const seriesData = [{
                name:'单月公司股基交易量',
                data:res.buy_sell_amount,
                type:'bar'
            },{
                name:'单月公司市场占有率（浙江）',
                data:res.buy_sell_rate_zhejiang,
                type:'line',
                yAxisIndex:1
            },{
                type:'line',
                name:'单月公司市场占有率（全国）',
                data:res.buy_sell_market_rate,
                yAxisIndex:1
            }];
            const dataUnit = ['亿元','%','%'];
            const xAxisData = {name:'',data:res.xAxisData};
            const extraOption={
                yAxis:[{name:'交易量（亿元）',nameLocation:'middle',nameGap:45},{name:'市占率（%）'}],
                grid:{
                    left:'16%',

                }};
            const tooltipData=[
                {seriesIndex:0},
                {name:'单月公司股基交易量环比',data:res.buy_sell_amount_rate,unit:'%'},
                {seriesIndex:1},
                {name:'累计公司市场占有率（浙江）',data:res.buy_sell_rate_zhejiang_sum,unit:'%'},
                {seriesIndex:2},
                {name:'累计公司市场占有率（全国）',data:res.buy_sell_market_rate_sum,unit:'%'}];
            this.refs.graph_linesbars.refreshGraph({seriesData,dataUnit,xAxisData,extraOption,tooltipData});
        })

        const seriesFilterParams02 = ['all_trading_market_rate','all_trading_market_rate_mom','margin_trading_market_rate','margin_trading_market_rate_mom'];
        getKpiGraph({},'02',true,seriesFilterParams02).then(res=>{
                    // all_trading_market_rate,                    //总交易量市占率
                    // all_trading_market_rate_mom,               // 总交易量市占率环比
                    // margin_trading_market_rate,               // 两融交易市占率
                    // margin_trading_market_rate_mom,           //两融交易市占率环比
            const seriesData = [{
                name:'两融交易市占率',
                data:res.margin_trading_market_rate,
            },{
                name:'股基交易市占率',
                data:res.all_trading_market_rate,
            }];
            const dataUnit = ['%','%'];
            const xAxisData = {name:'',data:res.xAxisData};
            const extraOption={legend:{show:true,left:'center'},grid:{top:'18%',right:'8%',bottom:'15'},xAxis:{axisLine:{lineStyle:{color: '#748c93'}},axisLabel:{textStyle: {color: '#748c93',}},},yAxis:{name:'市占率（%）',nameLocation:'middle',nameGap:35}};
            const tooltipData=[
                {seriesIndex:1},
                {name:'股基交易市占率环比',data:res.all_trading_market_rate_mom,unit:'个百分点'},
                {seriesIndex:0},
                {name:'两融交易市占率环比',data:res.margin_trading_market_rate_mom,unit:'个百分点'}
            ];
            this.refs.graph_chartline1.refreshGraph({seriesData,dataUnit,xAxisData,extraOption,tooltipData});
        })

        const seriesFilterParams03 = ['stock_trading_fee_rate','margin_trading_fee_rate','ctzq_net_commission_fee_rate','market_net_commission_fee_rate'];
        getKpiGraph({},'03',true,seriesFilterParams03).then(res=>{
            // stock_trading_fee_rate 股票交易费率
            // margin_trading_fee_rate 信用交易费率
            // ctzq_net_commission_fee_rate 净佣金费率（公司）
            // market_net_commission_fee_rate 净佣金费率（行业）
            const totalData=[
                {name:'股票交易费率',data:res.stock_trading_fee_rate},
                {name:'信用交易费率',data:res.margin_trading_fee_rate}
            ];
            const branchData=[
                {name:'公司',data:res.ctzq_net_commission_fee_rate},
                {name:'行业',data:res.market_net_commission_fee_rate}
            ];
            const xAxisData={name:'',data:res.xAxisData};
            const dataUnit="‰";
            const extraOptions={
                base:{
                    series:[{
                        stack:false,
                        areaStyle:{
                            normal:{
                                opacity:0
                            }
                        }
                    }],
                    xAxis:{
                        axisTick:{
                            show:false
                        }
                    },
                    legend:{
                        show:true,
                        icon:'circle',
                        itemWidth: 8,
                        top:'10',
                        left:'center',
                        orient:'horizontal'

                    },
                    tooltip:{
                        position:['5%',27],
                        textStyle:{
                             fontSize:'12px'
                        }
                    },
                    yAxis:{
                        nameGap:28,
                        show:true,
                        name:'费率 ( ‰ )',
                        splitNumber:3,
                        nameLocation:'middle',
                        nameTextStyle:{
                            padding:[0,0,20,0],
                            color:'#7d919e'
                        }
                    },
                    grid:{
                        left:'13%',
                        right:'5%',
                        top:'30%',
                        width:'auto'
                    }
                },
                totalOption:{
                    // color:[]
                    tooltip:{
                        formatter:function(params) {
                            let time = moment(params[0].name,'YYYYMM').format('YYYY年M月 ');
                            return time+params.map(function(item) {
                                return item.seriesName+item.value+'‰';
                            }).join('，');
                        }
                    }
                },
                branchOption:{
                    // color:[]
                    legend:{
                        top:'0'
                    },
                    grid:{
                        top:'24%',
                        left:'13%'
                    },
                    tooltip:{
                        position:['5%',14],
                        formatter:function(params) {
                            let time = moment(params[0].name,'YYYYMM').format('YYYY年M月 ');
                            return time+params.map(function(item) {
                                return item.seriesName+'净佣金费率'+item.value+'‰';
                            }).join('，');
                        }
                    }
                }
            }
            this.refs.graph_connectedlines.refreshGraph({totalData,branchData,xAxisData,dataUnit,extraOptions});
        })

        const seriesFilterParams04 = ['margin_trading_balance','margin_trading_balance_mom','margin_trading_balance_yoy','margin_trading_market_rate','margin_trading_market_rate_mom'];
        getKpiGraph({},'04',true,seriesFilterParams04).then(res=>{
                    // margin_trading_balance,                    // 两融余额（亿元）
                    // margin_trading_balance_mom,               //两融余额环比
                    // margin_trading_balance_yoy,               //两融余额同比
                    // margin_trading_market_rate,               // 两融交易市占率
                    // margin_trading_market_rate_mom,             // 两融交易市占率环比
            const seriesData = [{
                name:'两融余额',
                data:res.margin_trading_balance,
                type:'bar',
                yAxisIndex:1
            },{
                name:'两融市占率',
                data:res.margin_trading_market_rate,
                type:'line'
            }];
            const dataUnit = ['亿元','%'];
            const xAxisData = {name:'',data:res.xAxisData};
            const extraOption={
                grid:{
                    top:'15%',
                    right:'10%',
                    width:'80%'

                },
                yAxis:[
                    {name:'两融市占率（%）'},
                    {name:'两融余额（亿元）',nameGap:13, nameLocation:'middle'}
                ]
            };
            const tooltipData=[
                {seriesIndex:0},
                {name:'两融余额环比',data:res.margin_trading_balance_mom,unit:'%'},
                {name:'两融余额同比',data:res.margin_trading_balance_yoy,unit:'%'},
                {seriesIndex:1},
                {name:'两融市占率环比',data:res.margin_trading_market_rate_mom,unit:'个百分点'},
            ];
            this.refs.graph_linesbars2.refreshGraph({seriesData,dataUnit,xAxisData,extraOption,tooltipData});
        })

        getBranchKpiRank().then(res=>{
            // 按默认排序
            res.sort((a,b)=>{
                let _a = Number(a.market_rate);
                let _b = Number(b.market_rate);
                return _b - _a
            })
            res.map((item,key)=>{
                item.key = key;
            })
            this.setState({branchKpiRankTableData:res,branchKpiRankLoading:false})
        })

        getKpiGraph({},'06',false).then(res=>{
            this.areaDataList = res;
            const {provinceList,cityList,scatterData} = this.getCityData('浙江');
            this.refs.graph_map1.refreshGraph({
                countryData:{name:['累计股基交易量'],data:provinceList},
                provinceData:{name:'累计股基交易量',data:cityList},
                provinceScatterData:scatterData,
                provinceMapUnit:'万元',
                countryMapUnit:'万元',
                provinceScatterUnit:['万元','万元','万元'],
                provinceScatterName:['累计股基交易量','累计考核收入','累计考核利润'],
            });
        })

        //top25 数据获取
        this.__rankChangeData = {
            mom:[],
            yoy:[]
        };
        this.__seriesData = {
            mom:[],
            yoy:[]
        };
        this.__yAxisData = [];
        getKpiGraph({},'07',false).then(res=>{
            let top25TableTitle = CONSTANTS.kpi_top_25_rank_table_title;
            top25TableTitle[2].title = res.date1;
            top25TableTitle[3].title = res.date2;
            let top25TableData = res.left;
            top25TableData.map(item=>{
                item.key = item.market_rank;
                if (item.secu_name === '财通证券') {
                    item.secu_name = <span className='ct_flag'>{item.secu_name}</span>
                }
            })
            this.setState({
                top25TableData,
                top25TableTitle,
                top25CardTitle:`${res.date1.substring(0,4)}年${Number(res.date1.substring(5,7))}月TOP25家券商交易量(股+基)及市场份额排行`},()=>{
                    $('.ct_flag').parent().parent().addClass('kpi-active');
                }
            );
            res.right.map(item=>{
                this.__seriesData.mom.push(item.secu_rate);
                this.__seriesData.yoy.push(item.all_secu_rate);
                this.__yAxisData.push(item.secu_name);
                this.__rankChangeData.mom.push(item.market_rank_change);
                this.__rankChangeData.yoy.push(item.market_rank_change_yoy);
            })
            this.renderGraphBar('mom');
        })
    }

    renderGraphBar(type){
        this.refs.graph_bar.refreshGraph(
            {
                seriesData:[{name:'',data:this.__seriesData[type]}],
                yAxisData:{name:'',data:this.__yAxisData},
                rankChangeData:this.__rankChangeData[type],
                extraOption:{grid:{
                        top:9,
                        bottom:0,
                        right:10
                    },

                    yAxis:{
                        boundaryGap:false,
                        axisLine:{
                            lineStyle:{
                                color:'#c6c3cf'
                            }
                        }
                    },

                    graphic:[{
                        type: 'text',
                        z: 100,
                        top:'17.5%',
                        left:'30%',

                        style: {
                            fill: '#fff',
                            text: 'TOP10',
                            font: '25px Microsoft YaHei'
                        }
                    },{
                        type: 'text',
                        z: 100,
                        top:'57.6%',
                        left:'30%',
                        style: {
                            fill: '#fff',
                            text: 'TOP20',
                            font: '25px Microsoft YaHei'
                        }
                    },{
                        type: 'text',
                        z: 100,
                        top:'87.5%',
                        left:'30%',
                        style: {
                            fill: '#fff',
                            text: 'TOP25',
                            font: '25px Microsoft YaHei'
                        }
                    }]
                }
            }
        )
    }

    onDateRadioChange(e){
        this.renderGraphBar(e.target.value);
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    render(){
        const dateRadio = (
            <RadioGroup  defaultValue="mom" size='' onChange={this.onDateRadioChange.bind(this)}>
                <RadioButton value="mom">环比</RadioButton>
                <RadioButton value="yoy">同比</RadioButton>
            </RadioGroup>
        )

        return (
            <div>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                            <LinesBars
                                ref='graph_linesbars'
                                title="公司股基交易量单月及累计市占率趋势"
                                hasTip={()=>{return this.returnTipTable('02')}}
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="markets_exponent_chart">
                            <ChartLine
                                ref='graph_chartline1'
                                title='公司两融交易市占率和股基交易市占率的单月趋势对比图'
                                hasTip={()=>{return this.returnTipTable('03')}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="business_line_height">
                            <ConnectedLines
                                ref='graph_connectedlines'
                                title="公司和市场的单月净佣金费率趋势对比图"
                                hasTip={()=>{return this.returnTipTable('04')} }
                            />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <LinesBars
                            title="两融余额及市占率趋势"
                            ref='graph_linesbars2'
                            hasTip={()=>{return this.returnTipTable('05')} }
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col >
                        <JfCard>
                            <Col xs={24} sm={12} md={10} lg={10} xl={10}>
                                <div className="business_top ">
                                    <JfCard title='分公司KPI指标完成情况' loading={this.state.branchKpiRankLoading} hasTip={()=>{return this.returnTipTable('06')} }>
                                        <Table columns={branchRankColumns} dataSource={this.state.branchKpiRankTableData} pagination={false} scroll={{ y: 380 }} />
                                    </JfCard>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={14} lg={14} xl={14}>
                                <div className="business_height">
                                    <ConnectedMap
                                        ref='graph_map1'
                                        title="营业部经营情况"
                                        getProvinceData={this.getProvinceData}
                                        hasTip={()=>{return this.returnTipTable('07')} }
                                    />
                                </div>
                            </Col>
                        </JfCard>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col >
                        <JfCard title={this.state.top25CardTitle} hasTip={()=>{return this.returnTipTable('08')} }>
                            <Col xs={24} sm={13} md={13} lg={13} xl={13}>
                                <div className="kpi_business_table">
                                    <Table dataSource={this.state.top25TableData} pagination={false} bordered columns={this.state.top25TableTitle} />
                                </div>
                            </Col>
                            <Col xs={24} sm={11} md={11} lg={11} xl={11}>
                                <div className="kpi_business_radio">
                                    <PanelContainer hasRadio={dateRadio} >
                                    </PanelContainer>
                                </div>
                                <div className="kpi_business_table_left">


                                    <div className="kpi_business_table_left_1"></div>
                                    <div className="kpi_business_table_left_1 kpi_business_table_left_2"></div>
                                    <div className="kpi_business_table_left_1 kpi_business_table_left_3"></div>
                                    <Bar ref='graph_bar' />

                                </div>

                            </Col>
                        </JfCard>
                    </Col>
                </Row>
            </div>
        )
    }
}
