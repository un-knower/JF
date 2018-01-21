import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,message,Table,DatePicker,Select,Button } from 'antd';
import moment from 'moment';
import CONSTANTS from 'app_constants';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {NewBar as Bar,ChartPie,ChartLine, IndexDotTable,TableModal} from 'app_component';
import axios from 'axios';
import {getBusinessStatistics,getBusinessProdCode,getBusinessTrend,getBusinessChange} from '../../api';
import $ from 'jquery';
import 'app_css/app/dashboard/index.css';
import immutable from 'immutable';

require('es6-promise').polyfill();

const Option = Select.Option;
const { Column, ColumnGroup } = Table;

const returnBranchRankColumns = type => (
    [
        {
            title: '资产区间',
            dataIndex: type==='1'?'asset_section_name':'amount_section_name',
            key: type==='1'?'asset_section_name':'amount_section_name'
        }, {
            title: '客户数量',
            dataIndex: 'cust_num',
            key: 'cust_num',

        }, {
            title: type==='1'?'资产分布(万)':'份额分布(万)',
            dataIndex: 'asset',
            key: 'asset',
        }
    ]
)

//板块说明配置
export default class BusinessAnalysis extends Component {

    constructor(props){
        super(props);
        //this.startDateDefault = moment().format('YYYY-MM-DD')
        //this.endDateDefault = moment().format('YYYY-MM-DD')
        this.commonControllers = {
            day: {
                type: 'day',
                name: 'day',
                width: 6,
                label: '查询日期：',
                // defaultValue:moment(this.props.date.c_cashclient_asset_01,'YYYY-MM-DD').add(-1,'months'),
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_asset_01,
                    formart:'YYYY-MM-DD'
                }),
                labelCol:'38%',
                wrapperCol:'62%'
            },
            start: {
                type: 'startDate',
                name: 'startDate',
                width: 5,
                label: '统计开始时间：',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_asset_01,
                    formart:'YYYY-MM-DD',
                    addType:'months',
                    addVal:-1
                }),
                labelCol:'48%',
                wrapperCol:'52%'
            },
            end: {
                type: 'endDate',
                name: 'endDate',
                width: 5,
                label: '统计结束时间：',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_asset_01,
                    formart:'YYYY-MM-DD',
                }),
                labelCol:'48%',
                wrapperCol:'52%'
            },
            productid: {
                type: 'treeSelect',
                name: 'prodCode',
                placeholder: '请选择',
                width: 5,
                label: '产品编号:',
                labelCol:'35%',
                wrapperCol:'65%',
                treeData: [],
                defaultValue:''
            },
            queryBtn: {
                type: 'button',
                name: 'query',
                width: 2,
                label: '查询',
                className: 'ant-btn-primary',
                labelCol:'2%',
                wrapperCol:'98%'
            }
        };

        this.prevSendParams = {
            a:{},
            b:{},
            c:{}
        }

        this.state = {
            commonControllers_a:[],
            commonControllers_b:[],
            commonControllers_c:[],
            branchRankData_1:[],
            branchRankData_2:[],
        }

        this.allProdCode = [];
    }

    returnDeafultValue(commonControllers){
        let defaultControllerData = {};
        commonControllers.map(item=>{   //获取筛选条件默认参数集合
            item.map(item_in=>{
                if (item_in.defaultValue != undefined) {
                    defaultControllerData[item_in.name] = item_in.defaultValue;
                }
            })
        })
        return defaultControllerData
    }

    getControllers(reportType) {
        let controllers = [
            []
        ];
        let commonControllers = this.commonControllers;
        switch (reportType) {
            case 'a':
                controllers = [
                    [
                        commonControllers.day,
                        commonControllers.productid,
                        {...commonControllers.queryBtn,onClickBtn:this.clickQueryBtn.bind(this,'a')}
                    ]
                ];
                break;
            case 'b':
                controllers = [
                    [
                        commonControllers.start,
                        commonControllers.end,
                        commonControllers.productid,
                        {...commonControllers.queryBtn,onClickBtn:this.clickQueryBtn.bind(this,reportType)}
                    ]
                ];
                break;
            case 'c':
                controllers = [
                    [
                        commonControllers.start,
                        commonControllers.end,
                        commonControllers.productid,
                        {...commonControllers.queryBtn,onClickBtn:this.clickQueryBtn.bind(this,reportType)}
                    ]
                ];
                break;
            default:;
        }
        return controllers;
    }

    async componentDidMount(){
        const _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }

        const prodCode = await getBusinessProdCode();
        this.commonControllers.productid.treeData = [{value:'all',label:'全部',key:'all',children:prodCode.map(item=>{
            this.allProdCode.push(item.prod_code);
            return {value:item.prod_code,label:item.prod_code,key:item.prod_code}
        })}]
        this.commonControllers.productid.defaultValue = ['all'];
        const ctrl_1 = this.getControllers('a');
        const sendParams_1 = this.refs['filterController_a'].setControllerData(this.returnDeafultValue(ctrl_1));
        if (sendParams_1.prodCode === 'all') {
            sendParams_1.prodCode = this.allProdCode.join(',');
        }

        const ctrl_2 = this.getControllers('b');
        const sendParams_2 = this.refs['filterController_b'].setControllerData(this.returnDeafultValue(ctrl_2));
        if (sendParams_2.prodCode === 'all') {
            sendParams_2.prodCode = this.allProdCode.join(',');
        }

        const ctrl_3 = this.getControllers('c');
        const sendParams_3 = this.refs['filterController_c'].setControllerData(this.returnDeafultValue(ctrl_3));
        if (sendParams_3.prodCode === 'all') {
            sendParams_3.prodCode = this.allProdCode.join(',');
        }
        this.prevSendParams = {
            a:sendParams_1,
            b:sendParams_2,
            c:sendParams_3
        }
        this.setState({commonControllers_a:ctrl_1,commonControllers_b:ctrl_2,commonControllers_c:ctrl_3});
        this.setGrapgFn('a',sendParams_1);
        this.setGrapgFn('b',sendParams_2);
        this.setGrapgFn('c',sendParams_3);
    }

    setGrapgFn(type,params){
        if (type === 'a') {

            getBusinessStatistics(params).then(res=>{
                let table_1 = res['01'];
                let pie_1 = [];
                let pie_2 = [];
                let x_1 = [];
                table_1.map((item,key)=>{
                    item.key = key;
                    item.asset_section_name = $.trim(item.asset_section_name)+'万';
                    x_1.push({name:item.asset_section_name})
                    pie_1.push({name:item.asset_section_name,value:item.cust_num});
                    pie_2.push({name:item.asset_section_name,value:item.asset});
                })

                let pie_3 = [];
                let pie_4 = [];
                let x_2 = [];
                let table_2 = res['02'];
                table_2.map((item,key)=>{
                    item.key = key;
                    item.amount_section_name = $.trim(item.amount_section_name)+'万';
                    x_2.push({name:item.amount_section_name});
                    pie_3.push({name:item.amount_section_name,value:item.cust_num});
                    pie_4.push({name:item.amount_section_name,value:item.asset});
                })

                this.setState({
                    branchRankData_1:table_1,
                    branchRankData_2:table_2
                })

                this.returnCharPie(pie_1,x_1,'1');
                this.returnCharPie(pie_2,x_1,'2');

                this.returnCharPie(pie_3,x_2,'3');
                this.returnCharPie(pie_4,x_2,'4');
            })
        }else if(type === 'b'){
            getBusinessTrend(params,['sign_num','remove_num']).then(res=>{
                this.returnBar(res.sign_num,res.remove_num,res.xAxisData);
            })
        }else if(type === 'c'){
            getBusinessChange(params,['Amount']).then(res=>{
                this.returnCharLine(res.Amount,res.xAxisData);
            })
        }
    }

    returnCharPie(a,b,c){
        const seriesData = [{
            name:c==='1'||c==='3'?'按资产区间统计客户数量':'按资产区间统计客户资产分布',
            data:a
        }];
        const extraOptions = {
            legend:{
                show:true,
                top:'45%',
                left:'73%',
                icon:'circle',
                itemWidth: 8,
                itemHeight: 8,
                data:b
            },

            series:[{
                label:{
                    normal:{
                        show:false
                    }
                },
                selectedMode:true,
                center: ['40%', '49%'],
                radius:[0,'70%']
            }],
            color:['#7be5ff', '#1386cd', '#006bae','#0090ce', '#00a2e1', '#1ec0ff']
        }
        this.refs['graph_chartpie'+c].refreshGraph({seriesData,extraOptions})
    }

    returnBar(a,b,x){
        const seriesData = [{
            name:'签约数',
            data:a
        },{
            name:'解约数',
            data:b
        }];
        const xAxisData = {name:'',data:x};
        const extraOption = {
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
            yAxis:{
                show:true,
                name:'客户数量',
                nameLocation:'middle',
                nameTextStyle:{
                    padding:0
                },
                nameGap:55
            },
            legend:{
                show:true,
                orient:'horizontal',
                top:'25',

                left:'center'
            },tooltip:{backgroundColor:'rgba(50,50,50,0.7)',trigger:'axis',show:true,},
            grid:{
                left:'60',
                right:'60',
                top:'70'
            },
            xAxis:{
                axisLabel:{
                    rotate:30,
                },
            }
        };const dataUnit = ['人','人'];
        this.refs.graph_bar.refreshGraph({dataUnit,seriesData,xAxisData,extraOption})
    }

    returnCharLine(a,x){
        const seriesData = [{name:'产品份额',data:a}];
        const xAxisData = {name:'',data:x};
        const extraOption = {
            title: {
                subtext: '单位：亿份',
                padding:[25,100,20,40],
                left:'right'
            },
            xAxis:{
                axisLine:{
                    lineStyle:{
                        color: '#748c93'
                    }
                },
                axisLabel:{
                    textStyle: {
                        color: '#748c93'
                    }
                }
            },
            yAxis:{
                name:'份额',nameGap:45, nameLocation:'middle'
            },
            grid:{
                left:'60',
                right:'60',
                top:'70'
            },
            legend:{
                show:true,
                orient:'horizontal',
                top:'25',
                left:'center'
            }
        };
        this.refs.graph_chartline.refreshGraph({seriesData,xAxisData,extraOption})
    }

    returnCommonControllers(flag){
        return <FilterController
            ref={'filterController_'+flag}
            controllers={this.state['commonControllers_'+flag]}
        />
    }

    clickQueryBtn(type){
        const params = this.refs['filterController_'+type].getControllerData();
        if (!immutable.is(immutable.fromJS(params),immutable.fromJS(this.prevSendParams[type]))) {

            this.setGrapgFn(type,params);
            if (params.prodCode === 'all') {
                params.prodCode = this.allProdCode.join(',');
            }

            this.prevSendParams[type] = params;
        }
    }
    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }
    render() {
        return (
            <div>
                <PanelContainer
                    title='客户统计'

                    hasFilter={
                        <div>
                            {this.returnCommonControllers('a')}
                        </div>
                    }
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="businessanalysis_chartpie_height">
                                <ChartPie
                                    title='按资产区间统计客户数量'
                                    hasTip={()=>{return this.returnTipTable('66')}}
                                    ref='graph_chartpie1'
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="businessanalysis_chartpie_height">
                                <ChartPie
                                    hasTip={()=>{return this.returnTipTable('67')}}
                                    title='按资产区间统计客户资产分布'
                                    ref='graph_chartpie2'
                                />
                            </div>
                        </Col>

                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <JfCard title='按资产区间客户数量及资产分布统计' hasTip={()=>{return this.returnTipTable('68')}}>
                                <div className="businessanalysis_table">
                                    <Table columns={returnBranchRankColumns('1')} dataSource={this.state.branchRankData_1} pagination={false}/>
                                </div>
                            </JfCard>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="businessanalysis_chartpie_height">
                                <ChartPie
                                    hasTip={()=>{return this.returnTipTable('69')}}
                                    title='按产品份额区间统计客户数量'
                                    ref='graph_chartpie3'
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className="businessanalysis_chartpie_height">
                                <ChartPie
                                    hasTip={()=>{return this.returnTipTable('70')}}
                                    title='按产品份额区间统计份额分布'
                                    ref='graph_chartpie4'
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <JfCard title='按产品份额区间统计客户数量及份额分布' hasTip={()=>{return this.returnTipTable('71')}}>
                                <div className="businessanalysis_table">
                                    <Table columns={returnBranchRankColumns('2')} dataSource={this.state.branchRankData_2} pagination={false}/>
                                </div>
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>
                <PanelContainer
                    title='签约趋势'

                    hasFilter={
                        <div>
                            {this.returnCommonControllers('b')}
                        </div>
                    }
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Bar
                                title='每日签约和解约客户数量'
                                ref='graph_bar'
                                hasTip={()=>{return this.returnTipTable('72')}}
                            />
                        </Col>
                    </Row>
                </PanelContainer>
                <PanelContainer
                    title='现金理财产品份额变化'

                    hasFilter={
                        <div>
                            {this.returnCommonControllers('c')}
                        </div>
                    }
                >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <ChartLine
                                title='现金理财产品份额变化'
                                hasTip={()=>{return this.returnTipTable('73')}}
                                ref='graph_chartline'
                            />
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至 {this.props.date.c_cashclient_asset_01}</div>
            </div>
        )
    }
}

module.exports = BusinessAnalysis;
