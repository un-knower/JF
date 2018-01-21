import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {NewBar as Bar,KlineIndex,ChartLine, IndexDotTable,TableModal} from 'app_component';
import {getOrgOne,getRecruitData} from '../../api'
import _ from 'underscore'

import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;
const branchRankColumns = [
    {
        title: '一级部门/机构',
        dataIndex: 'org_name',
        key: 'org_name',
        className:'join_frist'
    }, {
        title: '计划内招聘人数',
        dataIndex: 'in_plan_num',
        key: 'in_plan_num',
    }, {
        title: '计划外招聘人数',
        dataIndex: 'out_plan_num',
        key: 'out_plan_num',
    }, {
        title: '面试人数',
        dataIndex: 'interview_num',
        key: 'interview_num',
    }, {
        title: '录用人数',
        dataIndex: 'offer_num',
        key: 'offer_num',
    }, {
        title: '观察月份',
        dataIndex: 'init_month',
        key: 'init_month',
    }
];

export default class Performancejoin extends Component {

    constructor(props){
        super(props);

        this.organizationType = '2';
        this.subOrgChild = [];            //机构的子节点
        this.prevSendParams = {};

        this.onRangMonthChange = this.onRangMonthChange.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.commonControllers = {
            start: {
                type: 'startMonth',
                name: 'startMonth',
                width: 4,
                label: '时间范围:',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.create_date,
                    formart:'YYYY-MM',
                    addType:'months',
                    addVal:-13
                }),
            },
            end: {
                type: 'endMonth',
                name: 'endMonth',
                width: 3,
                label: '至',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.create_date,
                    formart:'YYYY-MM',
                }),
            },
            branch: {
                type: 'treeSelect',
                name: 'groupCode',
                width: 6,
                label: '一级部门(机构):',
                className: 'ant-branch-left',
                placeholder: '请选择',
                defaultValue:['all'],
                treeData:[]
            },
            deptype: {
                type: 'radioGroup',
                name: 'organizationType',
                width: 8,
                label: '部门类型:',
                className: 'ant-branch-left',
                placeholder: '请选择',
                radioOptions: [{
                        label: '全部',
                        value: '1'
                    },{
                        label: '总部',
                        value: '2'
                    }, {
                        label: '分支机构',
                        value: '3'
                    }
                ],
                defaultValue:this.organizationType,
                onChangBtn:this.onDepTypeChange.bind(this)
            }
        };
        this.state = {
            commonControllers:[],
            keyIndex:{},
            branchRankData:[]
        }
    }

    async componentDidMount(){
        const  _this = this;
        window.onresize = function(){
            for(let key in _this.refs){
                if (key.substring(0,5) == 'graph') {
                    _this.refs[key].resize();
                }
            }
        }

        this.renderCommonControllers();
    }

    renderCommonControllers = async(flag=false)=>{
        const res = await getOrgOne({organizationType:this.organizationType})
        const params = this.organizationType==='1'?{all:{subOrg:[...res.headquarters.subOrg,...res.organization.subOrg],org_name:'全部'}}:res;
        const commonControllers = this.getControllers(params);

        this.setState({commonControllers},()=>{
            if (flag) {
                this.refs.filterController.setSignControllerData('groupCode',['all']);
                this.renderPage({...this.prevSendParams,groupCode:this.subOrgChild.join(',')});
            }else {
                let defaultControllerData = {};
                commonControllers.map(item=>{   //获取筛选条件默认参数集合
                    item.map(item_in=>{
                        if (item_in.defaultValue != undefined) {
                            defaultControllerData[item_in.name] = item_in.defaultValue;
                        }
                    })
                })
                let sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
                sendParams.groupCode = sendParams.groupCode[0] === 'all'?this.subOrgChild.join(','):sendParams.groupCode.join(',');
                this.renderPage(sendParams);
            }
        });

        // this.renderPage(commonControllers);
    }

    renderPage = async(sendParams) => {
        // let sendParams = {};
        // if (commonControllers) {
        //     let defaultControllerData = {};
        //     commonControllers.map(item=>{   //获取筛选条件默认参数集合
        //         item.map(item_in=>{
        //             if (item_in.defaultValue != undefined) {
        //                 defaultControllerData[item_in.name] = item_in.defaultValue;
        //             }
        //         })
        //     })
        //     sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
        //     sendParams.groupCode = sendParams.groupCode[0] === 'all'?this.subOrgChild.join(','):sendParams.groupCode.join(',');
        // }else{
        //     sendParams = this.prevSendParams;
        // }
        let {startMonth:startDate,endMonth:endDate,groupCode} = sendParams;
        const {recruitData,formartData} = await getRecruitData({startDate,endDate,groupCode},['in_plan_num','offer_num','come_num','come_rate','offer_rate']);
        const __tableData = recruitData.details;
        __tableData.map((item,key)=>{
            item.key = key;
        })
        this.setState({
            keyIndex:recruitData.keyIndex,
            branchRankData:__tableData
        })
        this.prevSendParams = sendParams;
        // in_plan_num;   计划内招聘
        // offer_num;  录用人数
        // come_num;   到岗人数
        // come_rate;   到岗率
        // offer_rate;   录用率
        let {in_plan_num,offer_num,come_num,come_rate,offer_rate,xAxisData} = formartData;
        //人员转化
        this.renderGraphChartline1(in_plan_num,offer_num,come_num,xAxisData);
        this.renderGraphChartline2(come_rate,offer_rate,xAxisData);
    }

    async onDepTypeChange(e){
        let _this = this;
        this.organizationType = e.target.value;
        this.renderCommonControllers(true);
    }

    onRangMonthChange(obj){
        this.prevSendParams = {...this.prevSendParams,...obj};
        this.renderPage(this.prevSendParams);
    }

    onDataChange(name,data){
        const groupCode = data[0] === 'all'?this.subOrgChild.join(','):data.join(',');
        this.prevSendParams = {...this.prevSendParams,[name]:groupCode};
        this.renderPage(this.prevSendParams);
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    getControllers(data){
        const _this = this;
        if(data){
            this.subOrgChild = [];
            this.commonControllers.branch.treeData = _.map(data,function(item,key) {
                return {
                    label:item.org_name,
                    value:'all',
                    key,
                    children:item.subOrg.map((item)=>{
                        _this.subOrgChild.push(item.org_code);
                        return {
                            label:item.org_name,
                            value:item.org_code,
                            key:item.org_code
                        }
                    })
                };
            });
        }
        let commonControllers = this.commonControllers;
        return [
            [
                {...commonControllers.deptype,labelCol:'21%',wrapperCol:'79%'},
                {...commonControllers.branch,labelCol:'40%',wrapperCol:'55%'},
                {...commonControllers.start,labelCol:'38%',wrapperCol:'62%'},
                {...commonControllers.end,labelCol:'10%',wrapperCol:'90%'}
            ]
        ];
    }

    renderGraphChartline2(a,b,x){
        const seriesData = [
                {name:'到岗率',data:a},
                {name:'录用率',data:b},
            ];
        const dataUnit = ['%','%'];
        const xAxisData = {data:x};
        const extraOption = {
            series:[{
                label:{
                    normal:{
                        show:true
                    }
                }
            },{
                label:{
                    normal:{
                        show:true
                    }
                }
            }],

            yAxis:{
                show:false,
                scale:true
            },
            color:['#6febff','#fefe97'],
            xAxis:{
                axisLabel:{
                    rotate:30,
                    textStyle: {
                         color:'#fff',
                         fontWeight:'100'
                     },
                     interval:0
                },
                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    }
                },
            },
            grid:{
                bottom:'8%',
                top:'18%'
            },
            legend:{
                show:true,
                top:'5.1%',
                left:'center',
                inactiveColor: '#92aae0',
            }
        };

        this.refs.graph_chartline1.refreshGraph({seriesData,dataUnit,xAxisData,extraOption});
    }

    renderGraphChartline1(a,b,c,x){

        const seriesData = [
                {name:'计划人数',data:a},
                {name:'录用人数',data:b},
                {name:'到岗人数',data:c},
            ];
        const dataUnit = ['人','人','人'];
        const xAxisData = {data:x};
        const extraOption={
            color:['#6febff',  '#dec4ff','#fffebb'],
            tooltip:{
                trigger: 'axis',
                backgroundColor:'rgba(50,50,50,0.7)',
                show:true,
                },
            legend:{
                show:true,
                orient:'horizontal',
                left:'center',
                top:'5.1%',
                inactiveColor: '#92aae0',
            },
            grid:{
                bottom:'8%',
                left:'3%',
                right:'7%'
            },
            xAxis:{
                axisLabel:{
                    rotate:30,
                    textStyle: {
                    color: '#fff',
                    fontWeight:'100'
                }
                },
                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    }
                },
            },
            yAxis:{
                show:false
            },
            series:seriesData.map(()=>({label:{normal:{show:false}}}))
        }

        this.refs.graph_bar.refreshGraph({dataUnit,seriesData,xAxisData,extraOption});
    }

    render() {
        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onRangMonthChange={this.onRangMonthChange}
            onDataChange={this.onDataChange}
        />;
        return (
            <div>
                <div className="conditional_filtering">
                    <PanelContainer
                        hasFilter={<div > <div className="pull-left">条件筛选</div> {filterContent} </div>}
                        >
                    </PanelContainer>
                </div>
                <PanelContainer title='关键指标' hasTip={()=>{return this.returnTipTable('16')}}>
                    <Row gutter={16}>
                        <Col >
                        <JfCard className="org_card_bg join_card_width">
                            <Col xs={24} sm={8} md={8} lg={5} xl={5}>
                                <div className="org_card_title">
                                    <i>计划内招聘</i>
                                    <span>{this.state.keyIndex?this.state.keyIndex.in_plan_num:'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={5} xl={5}>
                                <div className="org_card_title">
                                    <i>计划外招聘</i>
                                    <span>{this.state.keyIndex?this.state.keyIndex.out_plan_num:'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={5} xl={5}>
                                <div className="org_card_title">
                                    <i>面试人数</i>
                                    <span>{this.state.keyIndex?this.state.keyIndex.interview_num:'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={5} xl={5}>
                                <div className="org_card_title">
                                    <i>录用人数</i>
                                    <span>{this.state.keyIndex?this.state.keyIndex.offer_num:'-'}</span><em>人</em>
                                </div>
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={5} xl={5}>
                                <div className="org_card_title">
                                    <i>到岗人数</i>
                                    <span>{this.state.keyIndex?this.state.keyIndex.come_num:'-'}</span><em>人</em>
                                </div>
                            </Col>


                        </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='趋势分析'>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Bar
                                ref='graph_bar'
                                title="招聘完成情况分布"
                                hasTip={()=>{return this.returnTipTable('16')}}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <ChartLine
                                title="人员转化"
                                ref="graph_chartline1"
                                hasTip={()=>{return this.returnTipTable('18')}}
                            />
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='明细数据'>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard title="招聘明细" hasTip={()=>{return this.returnTipTable('19')}}>
                                <Table columns={branchRankColumns} dataSource={this.state.branchRankData} />
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Performancejoin;
