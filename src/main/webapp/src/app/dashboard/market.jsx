import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Modal} from 'antd';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import {PanelContainer,JfCard,TipTable} from 'app_common';
import {ConnectedLines,KlineIndex,ChartLine, IndexDotTable,TableModal} from 'app_component';
import axios from 'axios';
import {getKlineDate,getTableDate,getRankTable,getmarketMarketLine} from '../../api';

import 'app_css/app/dashboard/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;
export default class CockpitMarket extends Component {

    constructor(props){
        super(props);

        this.radioOnChange = this.radioOnChange.bind(this);

        this.state = {
            echartDateList:[],
            echartPriceList:[],
            allTableData:{
                stock_fund_trading:[],
                stock_trading:[],
                fund_trading:[],
                margin_trading:[]
            },
            tableLoading:true,
            klineLoading:true,
            rankingTableData:[],
            rank_caitong:0,
            modalDate:'',

        }
    }
    setModalVisible(modalVisible,key) {
        let state = {};
        state['modalVisible_'+key] = modalVisible;
        let {dateList,priceList} = this.klineData['graph_kline'+key];
        this.setState(state,()=>{
            if(modalVisible){
                this.refs['graph_kline'+key+'_modal'].refreshGraph({xAxis:dateList,series:priceList});
            }
        });
    }
    radioOnChange(e){
        this.setState({
            tableLoading:true,
            graphLoading:true
        },()=>{
            this.getTableDateFn(e.target.value);
            this.getGraphDataFn(e.target.value);
        })
    }

    componentDidMount(){
        const  _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }
        _this.klineData = {};

        //指数概览数据获取及渲染
        getKlineDate({secuCode:'000001,399001,399005,399006',startDate:'20171010'}).then(res=>{
            for (let key in res) {
                let dateList = [];
                let priceList = [];
                res[key].map(item=>{
                    const {close_price,high_price,init_date,low_price,open_price} = item;
                    dateList.push(init_date);
                    priceList.push([open_price,close_price,low_price,high_price]);
                })
                _this.klineData[CONSTANTS.market_kine_name_map[key]] = {
                    dateList,priceList
                };
                _this.refs[CONSTANTS.market_kine_name_map[key]].refreshGraph({xAxis:dateList,series:priceList});
            }
        })

        _this.getTableDateFn();
        getRankTable({}).then((res)=>{
            let rank_caitong = 0;
            let rankingTableData = res.branch.map((item,key)=>{
                if(item.secu_name==='财通证券股份有限公司'){
                    rank_caitong = key;
                }
                return {...item,key};
            });
            this.setState({rankingTableData,rank_caitong,modalDate:res.date});
        });
        this.getGraphDataFn();
    }

    async getGraphDataFn(dateType='D'){

        const getParamObj = {
            stockFund:['total_sf','sf','sf_rate'],
            stock:['total_s','total_s_sh','total_s_sz','total_s_stb','s','s_sh','s_sz','s_stb','s_sh_rate','s_sz_rate'],  //s_hk   其中有港股通暂时去掉
            fund:['total_f','total_f_sh','total_f_sz','f','f_sh','f_sz','f_sh_rate','f_sz_rate'],
            margin:['fin_slo','fin_slo_rate','total_fin_slo']
        }
        const xformat = {
            D:['YYYYMMDD','YYYY年M月D日 '],
            M:['YYYYMM','YYYY年M月 '],
            Y:['YYYY','YYYY年 ']
        };
        let format = xformat[dateType];

        const resData = await getmarketMarketLine({endDate:'',dateType},getParamObj);
        const {re_stockFund,re_stock,re_fund,re_margin} = resData;

        // total_sf;全国总市值
        // sf;公司总市值
        // sf_rate;公司占有率
        //graph_1
        const params_1 = {
            totalData:[{name:'全国',data:re_stockFund.total_sf}],
            branchData:[{name:'公司',data:re_stockFund.sf}],
            xAxisData:{data:re_stockFund.xAxisData},
            dataUnit:[['亿元'],['亿元']],
            xAppendtoTip:{
                format
            },
            extraOptions:{
                base:{
                    grid:{
                        left:'20%',
                        top:'16%',
                        bottom:'15%',
                        width:'75%'
                    },
                    tooltip:{
                        position:['1%','0%'],
                        textStyle:{
                             fontSize:'12px'
                        },
                        tooltip:{
                            position:['1%','0%'],
                            textStyle:{
                                 fontSize:'12px'
                            }
                        },
                        yAxis: {
                            splitNumber:3,
                            axisLabel:{
                                color:'#9db7c0'

                            },
                            axisLine: {show:false, lineStyle: { color: '#65607f' } },
                            splitLine: {
                                show: true,
                                lineStyle:{
                                    color:'#65607f'
                                }
                            }
                        },
                    }
                }
        }}
        this.refs.graph_connectedLines.refreshGraph({...params_1});

        //graph_2

        const params_2 = {
            dataUnit:[['%']],
            xAxisData:{name:'',data:re_stockFund.xAxisData},
            seriesData:[{name:'公司股基交易金额市占率',data:re_stockFund.sf_rate}],
            extraOption:{
                xAxis:{
                    axisLine:{
                        lineStyle:{
                            color:'#646076'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#7d919e'
                      }
                    },
                }
            },

        }
        this.refs.graph_chartLine.refreshGraph({...params_2});

        // total_s;全国沪深股票总市值
        // total_s_sh;全国沪市股票总市值
        // total_s_sz;全国深市股票总市值
        // total_s_stb;全国转股股票总市值
        // s;公司沪深股票总市值
        // s_sh;公司沪市股票总市值
        // s_hk;港股通股
        // s_sz;公司深市股票总市值
        // s_stb;公司转股股票总市值
        // s_sh_rate;公司沪市股票总市值市占率
        // s_sz_rate;公司深市股票总市值市占率
        //graph_3
        const params_3 = {
            totalData:[{name:'沪市',data:re_stock.total_s_sh},{name:'深市',data:re_stock.total_s_sz},{name:'股转',data:re_stock.total_s_stb}],
            branchData:[{name:'沪市',data:re_stock.s_sh},{name:'深市',data:re_stock.s_sz},{name:'股转',data:re_stock.s_stb}],
            xAxisData:{name:'',data:re_stock.xAxisData},
            showPie:true,
            xAppendtoTip:{
                format
            },
            dataUnit:[['亿元','亿元','亿元'],['亿元','亿元','亿元']],
            tooltipData:{
                total:[{
                    name:'全国：',
                    data:re_stock.total_s,
                    unit:'亿元'
                }],
                branch:[{
                    name:'公司：',
                    data:re_stock.s,
                    unit:'亿元'
                }]
            },
            extraOptions:{
                base:{
                    grid:{
                        left:'20%',
                        top:'27%',
                        bottom:'15%',
                        width:'75%'
                    },
                    tooltip:{
                        position:['1%','0%'],
                        width:'100%',
                        textStyle:{
                             fontSize:'12px'
                        },
                        alwaysShowContent:true
                    },
                },

            },
        }
        this.refs.graph_connectedLines2.refreshGraph({...params_3});

        //graph_4
        const params_4 = {
            dataUnit:[['%'],['%']],
            xAxisData:{name:'',data:re_stock.xAxisData},
            seriesData:[
                {name:'沪市客户股票市占率',data:re_stock.s_sh_rate},
                {name:'深市客户股票市占率',data:re_stock.s_sz_rate}
            ],

            extraOption:{
                xAxis:{
                    axisLine:{
                        lineStyle:{
                            color:'#646076'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#7d919e'
                      }
                    },
                }
            },
        }
        this.refs.graph_chartLine2.refreshGraph({...params_4});

        // total_f;全国沪深基金总市值
        // total_f_sh;全国沪市基金总市值
        // total_f_sz;全国深市基金总市值
        // f;公司沪深基金总市值
        // f_sh;公司沪市基金总市值
        // f_sz;公司深市基金总市值
        // f_sh_rate;公司沪市基金总市值市占率
        // f_sz_rate;公司深市基金总市值市占率
        //graph_5
        const params_5 = {
            xAppendtoTip:{
                format
            },
            totalData:[{name:'沪市',data:re_fund.total_f_sh},{name:'深市',data:re_fund.total_f_sz}],
            branchData:[{name:'沪市',data:re_fund.f_sh},{name:'深市',data:re_fund.f_sz}],
            xAxisData:{name:'',data:re_fund.xAxisData},
            showPie:true,
            dataUnit:[['亿元','亿元'],['亿元','亿元']],
            tooltipData:{
                total:[{
                    name:'全国：',
                    data:re_fund.total_f,
                    unit:'亿元'
                }],
                branch:[{
                    name:'公司：',
                    data:re_fund.f,
                    unit:'亿元'
                }]
            },
            extraOptions:{
                base:{
                    grid:{
                        left:'16%',
                        top:'27%',
                        bottom:'15%',
                        width:'80%'
                    },
                    tooltip:{
                        position:['1%','0%'],
                        textStyle:{
                             fontSize:'12px'
                        },
                        alwaysShowContent:true
                    },

                }},
        }
        this.refs.graph_connectedLines3.refreshGraph({...params_5});

        //graph_6
        const params_6 = {
            dataUnit:[['%'],['%']],
            xAxisData:{name:'',data:re_fund.xAxisData},
            seriesData:[{name:'沪市基金市占率',data:re_fund.f_sh_rate},{name:'深市基金市占率',data:re_fund.f_sz_rate}],
            extraOption:{
                xAxis:{
                    axisLine:{
                        lineStyle:{
                            color:'#646076'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#7d919e'
                      }
                    },
                }
            },
        }
        this.refs.graph_chartLine3.refreshGraph({...params_6});

        // total_fin_slo   全国融资融券余额走势
        // fin_slo         公司余额走势
        // fin_slo_rate    公司余额市占率走势
        //graph_7
        const params_7 = {
            xAppendtoTip:{
                format
            },
            totalData:[{name:'全国',data:re_margin.total_fin_slo}],
            branchData:[{name:'公司',data:re_margin.fin_slo}],
            xAxisData:{name:'',data:re_margin.xAxisData},
            dataUnit:[['亿元'],['亿元']],
            extraOptions:{
                base:{
                    grid:{
                        left:'16%',
                        top:'20%',
                        bottom:'15%',
                        width:'80%'
                    },
                    tooltip:{
                        position:['1%','0%'],
                        textStyle:{
                             fontSize:'12px'
                        }
                    },
                }},
        }
        this.refs.graph_connectedLines4.refreshGraph({...params_7});

        //graph_8
        const params_8 = {
            dataUnit:[['%']],
            xAxisData:{name:'',data:re_margin.xAxisData},
            seriesData:[{name:'融资融券余额市占率',data:re_margin.fin_slo_rate}],
            extraOption:{
                xAxis:{
                    axisLine:{
                        lineStyle:{
                            color:'#646076'
                        }
                    },
                    axisLabel:{
                      textStyle: {
                      color: '#7d919e'
                      }
                    },
                }
            },
        }
        this.refs.graph_chartLine4.refreshGraph({...params_8});
        this.setState({graphLoading:false});
    }

    //获取并渲染4个表格数据
    getTableDateFn(dateType='D'){
        const _this = this;
        getTableDate({endDate:"20150319",dateType}).then(res=>{
            let tableData = {}
            for(let key in res){
                tableData[key] = res[key].map((item,index)=>{
                    let __mom = item.mom;
                    let momSpan = __mom=='-'?'-':Number(__mom)>0?<span className="anticon-upp">{`+${__mom}%`}</span>:<span className="anticon-downn">{`${__mom}%`}</span>
                    return {...item,key:index,mom:momSpan}
                })
            }
            _this.setState({
                allTableData:tableData,
                tableLoading:false
            })
        })
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }



    render() {
        const PcRadio_1 = (
            <RadioGroup onChange={this.radioOnChange} defaultValue="D" size='large'>
                <RadioButton value="D">按天</RadioButton>
                <RadioButton value="M">按月</RadioButton>
                <RadioButton value="Y">按年</RadioButton>
            </RadioGroup>
        )
        return (
            <div>
                <PanelContainer title='指数概览' hasTip={()=>{return this.returnTipTable('28')}} >
                    <Row gutter={8}>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <div className="market_height">
                                <KlineIndex title='上证指数' ref='graph_kline1' loading={this.state.klineLoading} />

                                <i className="anticon anticon-arrows-alt"  onClick={() => this.setModalVisible(true,'1')}></i>
                                <Modal
                                    title="上证指数"
                                    width={1000}
                                    visible={this.state.modalVisible_1}
                                    onOk={() => this.setModalVisible(false,'1')}
                                    onCancel={() => this.setModalVisible(false,'1')}
                                     className="market_modal_footer"
                                   >
                                   <KlineIndex ref='graph_kline1_modal'/>

                                   </Modal>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <div className="market_height">
                                <KlineIndex title='深圳指数' ref='graph_kline2' loading={this.state.klineLoading}/>
                                <i className="anticon anticon-arrows-alt"  onClick={() => this.setModalVisible(true,'2')}></i>
                                <Modal
                                    title="深圳指数"
                                    width={1000}
                                    visible={this.state.modalVisible_2}
                                    onOk={() => this.setModalVisible(false,'2')}
                                    onCancel={() => this.setModalVisible(false,'2')}
                                     className="market_modal_footer"
                                   >
                                   <KlineIndex ref='graph_kline2_modal'/>

                                   </Modal>

                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <div className="market_height">
                                <KlineIndex title='创业板指' ref='graph_kline4' loading={this.state.klineLoading}/>
                                <i className="anticon anticon-arrows-alt"  onClick={() => this.setModalVisible(true,'4')}></i>
                                <Modal
                                    title="创业板指"
                                    width={1000}
                                    visible={this.state.modalVisible_4}
                                    onOk={() => this.setModalVisible(false,'4')}
                                    onCancel={() => this.setModalVisible(false,'4')}
                                     className="market_modal_footer"
                                   >
                                   <KlineIndex ref='graph_kline4_modal'/>

                                   </Modal>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <div className="market_height">
                                <KlineIndex title='中小板指' ref='graph_kline3' loading={this.state.klineLoading}/>
                                <i className="anticon anticon-arrows-alt"  onClick={() => this.setModalVisible(true,'3')}></i>
                                <Modal
                                    title="中小板指"
                                    width={1000}
                                    visible={this.state.modalVisible_3}
                                    onOk={() => this.setModalVisible(false,'3')}
                                    onCancel={() => this.setModalVisible(false,'3')}
                                     className="market_modal_footer"
                                   >
                                   <KlineIndex ref='graph_kline3_modal'/>

                                   </Modal>
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='股基交易'  hasRadio={PcRadio_1}>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="market_table_first">
                                <IndexDotTable title='股基交易信息概览' hasTip={()=>{return this.returnTipTable('29')}} loading={this.state.tableLoading} dataSource={this.state.allTableData.stock_fund_trading} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="market_modal_5">
                            <ConnectedLines
                                title='全国及公司股基总市值变化'
                                ref='graph_connectedLines'
                                hasTip={()=>{return this.returnTipTable('30')}}
                                loading={this.state.graphLoading}
                                largeModal={true}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <ChartLine
                                title='公司股基交易金额市占率变化'
                                ref='graph_chartLine'
                                hasTip={()=>{return this.returnTipTable('31')}}
                                loading={this.state.graphLoading}
                            />
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='股票交易' >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="market_table_two ">
                            <IndexDotTable title='股票交易信息概览' hasTip={()=>{return this.returnTipTable('32')}} loading={this.state.tableLoading} dataSource={this.state.allTableData.stock_trading} />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="market_height_two market_span market_modal_5">
                            <ConnectedLines
                                title='全国及公司沪深两市股票总市值趋势'
                                ref='graph_connectedLines2'
                                hasTip={()=>{return this.returnTipTable('33')}}
                                loading={this.state.graphLoading}
                                largeModal={true}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="market_height_two">
                            <ChartLine
                                title='客户股票市值市占率变化'
                                ref='graph_chartLine2'
                                hasTip={()=>{return this.returnTipTable('34')}}
                                loading={this.state.graphLoading}
                            />
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='基金交易'  >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="market_table_three">
                                <IndexDotTable
                                    title='基金交易信息概览'
                                    hasTip={()=>{return this.returnTipTable('35')}}
                                    loading={this.state.tableLoading}
                                    dataSource={this.state.allTableData.fund_trading}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="market_span market_modal_5">
                            <ConnectedLines
                                ref='graph_connectedLines3'
                                title='全国及公司沪深两市基金总市值趋势'
                                hasTip={()=>{return this.returnTipTable('36')}}
                                loading={this.state.graphLoading}
                                largeModal={true}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <ChartLine
                                ref='graph_chartLine3'
                                title='基金市值占率变化'
                                hasTip={()=>{return this.returnTipTable('37')}}
                                loading={this.state.graphLoading}
                            />
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='融资融券'  >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="market_table_three">
                                <IndexDotTable
                                    title='融资融券信息概览'
                                    hasTip={()=>{return this.returnTipTable('38')}}
                                    loading={this.state.tableLoading}
                                    dataSource={this.state.allTableData.margin_trading}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className="market_modal_5">
                            <ConnectedLines
                                title='全国及公司融资融券余额变化'
                                hasTip={()=>{return this.returnTipTable('39')}}
                                ref='graph_connectedLines4'
                                loading={this.state.graphLoading}
                                largeModal={true}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>

                            <ChartLine
                                title='融资融券余额市占率变化'
                                ref='graph_chartLine4'
                                hasTip={()=>{return this.returnTipTable('40')}}
                                loading={this.state.graphLoading}
                            />
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title={moment(this.state.modalDate,'YYYYMM').format('各大券商M月营业部变化情况')}  hasTip={()=>{return this.returnTipTable('41')}}>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="market_table">
                            <TableModal
                            tableData={this.state.rankingTableData}
                            rank={this.state.rank_caitong}
                            modalDate={this.state.modalDate}

                            >

                            </TableModal>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.c_kpi_dashboard_daily_data_01}</div>
            </div>
        )
    }
}

module.exports = CockpitMarket;
