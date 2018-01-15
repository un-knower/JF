import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,message,Select,Table} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import _ from 'underscore';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {RingPie,LinesBars} from 'app_component';
import axios from 'axios';
import {getStaffingData,getOrgOne} from '../../api';

import 'app_css/app/hr/index.css';

require('es6-promise').polyfill();

//板块说明配置
const panelExplanation = CONSTANTS.panel_explanation.cockpit.market;

const branchRankColumns = [
    {
        title: '一级部门/机构',
        dataIndex: 'org_name',
        key: 'org_name',
         width: '20%',
         className:'join_frist'
    }, {
        title: '在岗人数',
        dataIndex: 'on_num',
        key: 'on_num',
         width: '10%',
    }, {
        title: '编制人数',
        dataIndex: 'plan_num',
        key: 'plan_num',
         width: '10%',
    }, {
        title: '编制空缺',
        dataIndex: 'less_num',
        key: 'less_num',
         width: '10%',
    }, {
        title: '超编人数',
        dataIndex: 'more_num',
        key: 'more_num',
         width: '10%',
    }, {
        title: '观察月份',
        dataIndex: 'init_month',
        key: 'init_month',
         width: '10%',
    }
];

export default class Hrstaff extends Component {


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
                    formart:'YYYY',
                    addType:'month',
                    addVal:-11
                }),
            },
            end: {
                type: 'endMonth',
                name: 'endMonth',
                width: 3,
                label: '至',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.create_date,
                    formart:'YYYY',
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
            branchRankData:[]
        }
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

        this.renderCommonControllers();
    }

    renderCommonControllers = async(flag=false)=>{
        const res = await getOrgOne({organizationType:this.organizationType});
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
        const {recruitData} = await getStaffingData({startDate,endDate,groupCode});
        const __tableData = recruitData.details;
        __tableData.map((item,key)=>{
            item.key = key;
        })
        this.setState({
            branchRankData:__tableData
        })
        this.prevSendParams = sendParams;
        // graph_data_on_num;    每月在岗人数
        // graph_data_plan_num;    每月在编人数
        let graph_data_on_num = {};
        let graph_data_plan_num = {};
        let __isCheck = [];

        recruitData.trend.xAxisData.map(key=>{
            let __data = recruitData.trend.seriesData[key];
            graph_data_on_num[key.substring(0,4)+'-'+key.substring(4)] = __data.on_num;
            let __num = key.substring(0,4);
            if (!__isCheck.indexOf(__num) > -1) {
                __isCheck.push(__isCheck);
                graph_data_plan_num[__num] = Number(__data.plan_num);
            }else{
                graph_data_plan_num[__num] = graph_data_plan_num[__num] + Number(__data.plan_num);
            }
        })
        this.renderGraphLinebars1(graph_data_on_num,graph_data_plan_num);
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

    onDepTypeChange(e){
        let _this = this;
        this.organizationType = e.target.value;
        this.renderCommonControllers(true);
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

    renderGraphLinebars1(a,b){
        /*#######需要替换的参数#########*/
        // console.log(a,b)
        //每月在岗人数
        const zgStaffMonthData = a;

        //每年编制数据
        const zbStaffData = b;
        /*#########END##########*/
        const zbSeriesDataList = {};
        const zgSeriesDataList = [];
        const xAxisKeyList = [];
        _(zgStaffMonthData).map(function(v,k){
            zgSeriesDataList.push(v);
            xAxisKeyList.push(k);
            _(zbStaffData).map(function(cv,ck) {
                //let reg =/ck/;
                if( zbSeriesDataList[ck] == undefined ){
                    zbSeriesDataList[ck] = {
                        name:'在编人数',
                        type:'line',
                        data:[]
                    };
                }

                let patt=new RegExp("^"+ck+"-");
                //console.log(ck,patt);
                if( patt.test(k) ){
                    //console.log(ck,v,k);
                    zbSeriesDataList[ck]['data'].push(cv);
                }else{
                    zbSeriesDataList[ck]['data'].push('-');
                }
            });
        });
        //console.log(zbSeriesDataList);
        const seriesData=[
            {
                name:'在岗人数',
                type:'bar',
                data:zgSeriesDataList
            },
        ];

        _(zbSeriesDataList).map(function(zv,zk) {
            seriesData.push(zv);
        });

        const xAxisData={name:'',data:xAxisKeyList};

        const extraOption={
            legend:{
                show:true,
                data:['在岗人数','在编人数'],
                left:'center',
                itemHeight:8,
                inactiveColor: '#92aae0',
            },
            grid:{
                left:'3%',
                right:'3%'
            },

            tooltip:{

                formatter:function(params) {
                    let wData = 0; //在岗人数
                    let zbData = 0; //在编人数
                    let cgData = 0; //超岗人数
                    let kqData = 0; //空缺人数
                    _(params).map(function(v,k) {
                        if(v.seriesName == '在编人数' && v.value != '-'){
                            zbData = v.value;
                        }
                        if( v.seriesName == '在岗人数'){
                            wData = v.value;
                        }
                    });
                    if( wData < zbData ){
                        kqData = zbData - wData;
                    }else{
                        cgData = wData - zbData;
                    }
                    return "在岗人数："+wData+"人"+"<br / >"+"在编人数："+zbData+"人"+"<br / >"+"超岗人数："+cgData+"人"+"<br / >"+"缺岗人数："
                    +kqData+"人";
                }
            },

            color:['#10FFDE',  '#faffa9'],
            xAxis:{
                axisLabel:{
                    color:'#fff'
                },
                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    }
                },
            },
            yAxis:[
                {show: false},
                {show: false}
            ],
            series:[
                {
                    type:'bar',
                    barWidth: 25,
                },{
                    symbol:'',
                    type:'line',
                    smooth:true,
                    showSymbol:false,
                    hoverAnimation:false,
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                            width: 2,
                            color: '#FFE829'
                        }
                    },
                },
                {
                    type:'line',
                    smooth:true,

                    symbol:'',
                    //symbol:'dashed',
                    showSymbol:false,
                    hoverAnimation:false,
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                            width: 2,
                            color: '#FFE829'
                        }
                    },
                }
            ]
        };

        this.refs.graph_linebars1.refreshGraph({seriesData,xAxisData,extraOption});
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
                <PanelContainer title='趋势分析'>
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                            <LinesBars
                                ref='graph_linebars1'
                                title={'在岗人数及编制人数趋势'}
                                hasTip={()=>{return this.returnTipTable('12')}}
                            />
                        </Col>
                    </Row>
                </PanelContainer>
                <PanelContainer title='详细数据'  >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className='staff_table_bg'>
                            <JfCard title="在岗及编制人数明细" hasTip={()=>{return this.returnTipTable('13')}}>
                                <Table columns={branchRankColumns} dataSource={this.state.branchRankData} scroll={{ y: 490 }}/>
                            </JfCard>
                            </div>
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Hrstaff;
