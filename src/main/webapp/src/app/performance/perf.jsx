import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select} from 'antd';
import _ from 'underscore';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {GroupBar,NewBar,ChartLine, IndexDotTable,TableModal} from 'app_component';
import {getEffectiveness} from '../../api';

import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;

export default class Performanceperf extends Component {

    constructor(props){
        super(props);

        this.radioOnChange = this.radioOnChange.bind(this);
        this.options = Tools.getYearOptions({date:this.props.date.create_date});
        this.commonControllers = {
            start: {
                type: 'select',
                name: 'startYear',
                width: 4,
                label: '时间范围:',
                options:this.options,
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.create_date,
                    formart:'YYYY',
                    addType:'years',
                    addVal:-5
                }).year()+'',
            },
            end: {
                type: 'select',
                name: 'endYear',
                width: 3,
                label: '至',
                options:this.options,
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.create_date,
                    formart:'YYYY',
                }).year()+'',
            },

            deptype: {
                type: 'radioGroup',
                name: 'organizationType',
                width: 6,
                label: '部门类型:',
                className: 'ant-branch-left',
                placeholder: '请选择',
                radioOptions: [
                    {
                        label: '总部',
                        value: '2'
                    }, {
                        label: '分支机构',
                        value: '3'
                    }
                ],
                defaultValue:'2',
                onChangBtn:this.radioOnChange
            }

        };
        this.state = {
            commonControllers:[],
            echartDateList:[],
            echartPriceList:[],
            allTableData:{
                stock_fund_trading:[],
                stock_trading:[],
                fund_trading:[],
                margin_trading:[]
            },
            keyIndex:{},
            klineLoading:true
        }
    }

    radioOnChange(e){
        this.prevSendParams.organizationType = e.target.value;
        this.renderPage();
    }

    getControllers(){
        let commonControllers = this.commonControllers;

        let controllers = [
            [
                {...commonControllers.deptype,labelCol:'30%',wrapperCol:'70%'},
                {...commonControllers.start,labelCol:'38%',wrapperCol:'62%'},
                {...commonControllers.end,labelCol:'10%',wrapperCol:'90%'}
            ]
        ];
        return controllers;
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
        const commonControllers = this.getControllers();
        //先渲染筛选组件
        this.setState({commonControllers});
        this.renderPage(commonControllers);
    }

    renderPage = async(commonControllers) => {
        let sendParams = {};
        if (commonControllers) {
            let defaultControllerData = {};
            commonControllers.map(item=>{   //获取筛选条件默认参数集合
                item.map(item_in=>{
                    if (item_in.defaultValue != undefined) {
                        defaultControllerData[item_in.name] = item_in.defaultValue;
                    }
                })
            })
            sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
        }else{
            sendParams = this.prevSendParams;
        }
        let {organizationType} = sendParams;
        const {keyIndex,trend1,trend2} = await getEffectiveness({
            startDate:sendParams.startYear,
            endDate:sendParams.endYear,
            organizationType
        });
        for(let key in keyIndex){
            keyIndex[key] = parseFloat(keyIndex[key]);
        }
        this.setState({keyIndex});
        this.prevSendParams = sendParams;
        let series = [];
        //部门类型为总部
        if(sendParams.organizationType==='2'){
            series = [{
                data:_.map(trend1.xAxisData,
                    (item)=>(trend1.seriesData[item]?(trend1.seriesData[item][item]['income']||'-'):'-')
                ),
                name:'收入',
                label:{
                    normal:{
                        show:false
                    }
                }
            },{
                name:'利润',
                data:_.map(trend1.xAxisData,
                    (item)=>(trend1.seriesData[item]?(trend1.seriesData[item][item]['profit']||'-'):'-')
                ),
                label:{
                    normal:{
                        show:false
                    }
                }
            }];
        }
        else {
            let nameMap = {
                profit:'利润',
                income:'收入'
            };
            let xkey = trend1.xAxisData[0];
            for(let branch in trend1.seriesData[xkey]){
                for(let key in trend1.seriesData[xkey][branch]){
                    series.push({
                        name:branch+'-'+nameMap[key],
                        data:_.map(trend1.seriesData,(item)=>(
                            item[branch][key]
                        )),
                        stack:branch,
                        label:{
                            normal:{
                                show:false
                            }
                        }
                    })
                }
            }
        }
        this.refs.graph_newbar.refreshGraph({
            seriesData:series,
            xAxisData:{
                data:trend1.xAxisData
            },
            showTopN:4,
            extraOption:{
                color:['#00eeff','#82bde7','#59b5ac','#7ccfc6','#7aae89','#8ccaa2','#b3b45c','#c8c965'  ,'#bca544','#f5dd5d','#eea93f','#ffc15a','#d88536','#fba757'],
                tooltip:{
                    trigger: 'axis',
                    backgroundColor:'rgba(50,50,50,0.7)',

                    show:true,
                    },
                yAxis:{
                    splitLine : {
                      show:true,
                      lineStyle: {
                          color: '#5972a1',

                      }
                    },
                },
                xAxis:{
                    axisLine:{
                        show:false,

                    },
                    axisLabel:{
                        color:'#fff'
                    },
                },
                grid:{

                    right:'15%',
                    left:'3%',
                    top:'12%',
                    bottom:'7%'
                },
                legend:{
                    show:true,
                    icon:'circle',
                    itemWidth: 8,
                    itemHeight:8,
                    inactiveColor: '#92aae0',
                }
            },
            dataUnit:['万','万']
        });
        this.refs.graph_groupbar.refreshGraph({
            seriesGroupData:_.map(trend2.seriesData[trend2.xAxisData[0]],(item,key)=>(
                {
                    groupName:key,
                    seriesData:_.map(item,(itemData,key1)=>{
                        return _.map(trend2.xAxisData,(xAxis)=>(
                            trend2.seriesData[xAxis][key][key1]
                        ))
                    })
                }
            )),
            xAxisData:{
                data:trend2.xAxisData
            },
            extraOption:{

                xAxis:{
                    axisLabel:{
                        color:'#fff'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#6783b9'
                        }
                    },
                },
                yAxis:{
                    splitLine : {
                                show:true,
                                lineStyle: {
                                    color: '#5972a1',

                                }
                              },
                },
                grid:{

                    right:'18%',
                    left:'3%',
                    top:'10%',
                    bottom:'5%'
                },

            },
            legendTitles:['收入','利润'],
            showTopN:5,
            dataUnit:['万','万']
        });
    }

    returnTipTable(a){
        let __data = CONSTANTS.TARGETTIPLIST['领导驾驶舱'];
        let __info = __data?__data['市场环境'][a].index:'no_desc';
        return <TipTable info={__info} />
    }

    onFilterChange(name,data){
        let controller = this.state.commonControllers[0].slice();
        if(name==='startYear'){
            let options = this.options.map((item)=>(
                {
                    ...item,
                    disabled:(item.value)<data
                }
            ));
            controller[2].options = options;
            this.setState({commonControllers:[controller]});
        }
        else if (name==='endYear') {
            let options = this.options.map((item)=>(
                {
                    ...item,
                    disabled:(item.value)>data
                }
            ));
            controller[1].options = options;
            this.setState({commonControllers:[controller]});
        }
        this.prevSendParams[name] = data;
        this.renderPage();
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    render() {
        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onDataChange={this.onFilterChange.bind(this)}
        />;
        let {income_avg,income_avg_rate,profit_avg,profit_avg_rate,
            income_growth,income_growth_rate,profit_growth,profit_growth_rate} = this.state.keyIndex;
        let income_avg_rate_string = '-';
        let profit_avg_rate_string = '-';
        let income_growth_rate_string = '-';
        let profit_growth_rate_string = '-';
        if(income_avg_rate>0){
            income_avg_rate_string = '↑ '+income_avg_rate;
        }
        else if (income_avg_rate<0) {
            income_avg_rate_string = '↓ '+(-income_avg_rate);
        }
        if(profit_avg_rate>0){
            profit_avg_rate_string = '↑ '+profit_avg_rate;
        }
        else if (profit_avg_rate<0) {
            profit_avg_rate_string = '↓ '+(-profit_avg_rate);
        }
        if(income_growth_rate>0){
            income_growth_rate_string = '↑ '+income_growth_rate;
        }
        else if (income_growth_rate<0) {
            income_growth_rate_string = '↓ '+(-income_growth_rate);
        }
        if(profit_growth_rate>0){
            profit_growth_rate_string = '↑ '+profit_growth_rate;
        }
        else if (profit_growth_rate<0) {
            profit_growth_rate_string = '↓ '+(-profit_growth_rate);
        }
        return (
            <div>
                <div className="conditional_filtering">
                    <PanelContainer
                        hasFilter={<div > <div className="pull-left">筛选条件</div> {filterContent} </div>}
                        >
                    </PanelContainer>
                </div>
                <PanelContainer title='关键指标' hasTip={()=>{return this.returnTipTable('20')}}>
                    <Row gutter={16}>
                        <Col >
                        <JfCard className="org_card_bg perf_card_bg">
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div className="org_card_title">
                                    <i>人均创收</i>
                                    <span><b>¥</b>{income_avg}</span><em>万元</em>
                                    <div className={income_avg_rate>0?"card_tab_red":"card_tab_green"}>
                                        {income_avg_rate_string}%
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div className="org_card_title">
                                    <i>人均利润</i>
                                    <span><b>¥</b>{profit_avg}</span><em>万元</em>
                                    <div className={profit_avg_rate>0?"card_tab_red":"card_tab_green"}>
                                        {profit_avg_rate_string}%
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div className="org_card_title">
                                    <i>创收年均增长</i>
                                    <span><b>+</b>{income_growth}</span><em>%</em>
                                    <div className={income_growth_rate>0?"card_tab_red":"card_tab_green"}>
                                        {income_growth_rate_string}个百分点
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div className="org_card_title">
                                    <i>利润年均增长</i>
                                    <span><b>+</b>{profit_growth}</span><em>%</em>
                                    <div className={profit_growth_rate>0?"card_tab_red":"card_tab_green"}>
                                        {profit_growth_rate_string}个百分点
                                    </div>
                                </div>
                            </Col>


                        </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='趋势分析'>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="perf_sr_height">
                            <NewBar ref="graph_newbar"
                                title="收入及利润年趋势分布"
                                hasTip={()=>{return this.returnTipTable('21')}}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className="perf_height">
                                <GroupBar ref="graph_groupbar"
                                title="各个部门利润及收入分布"
                                hasTip={()=>{return this.returnTipTable('22')}}
                            />
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Performanceperf;
