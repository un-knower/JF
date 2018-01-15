import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Row,Col,Select,Table, Menu, Dropdown, Icon,Button } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import moment from 'moment';
import {PanelContainer,FilterController,JfCard,TipTable} from 'app_common';
import {RingPie,LinesBars,NewBar as Bar} from 'app_component';
import axios from 'axios';
import _ from 'underscore';
import $ from 'jquery';
import {getPortraitFilter,getPortraitDetails,getOrgOne,getPortraitExport} from '../../api';
import immutable from 'immutable';

import 'app_css/app/hr/index.css';
require('es6-promise').polyfill();

// const menu = (
//   <Menu>
//     <Menu.Item>
//         <a target="_blank" rel="noopener noreferrer" href=""><div className="pdf_ico">PDF</div></a>
//     </Menu.Item>
//     <Menu.Item>
//         <a target="_blank" rel="noopener noreferrer" href=""><div className="xlsx_ico">XLSX</div></a>
//     </Menu.Item>
//     <Menu.Item>
//         <a target="_blank" rel="noopener noreferrer" href=""><div className="csv_ico">CSV</div></a>
//     </Menu.Item>
//     <Menu.Item>
//         <a target="_blank" rel="noopener noreferrer" href=""><div className="docx_ico">DOCX</div></a>
//     </Menu.Item>
//   </Menu>
// );

const tableTitle = [
    {
        title: '姓名',
        dataIndex: 'staff_name',
        key: 'staff_name',
        width:80
    }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width:50
    }, {
        title: '一级部门',
        dataIndex: 'org_name',
        key: 'org_name',
        width:220
    }, {
        title: '职务',
        dataIndex: 'job_name',
        key: 'job_name',
        width:90
    }, {
        title: '岗位',
        dataIndex: 'post_name',
        key: 'post_name',
        width:180
    }, {
        title: '司龄',
        dataIndex: 'company_age',
        key: 'company_age',
        width:80
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width:50
    }, {
        title: '最高学历',
        dataIndex: 'edu_name',
        key: 'edu_name',
        width:90
    },
     {
        title: '工龄',
        dataIndex: 'work_age',
        key: 'work_age',
        width:80
    },
     {
        title: '专业技能',
        dataIndex: 'pro_cert_names',
        key: 'pro_cert_names',
    }
];

export default class Hrstaff extends Component {
    constructor(props){
        super(props);

        this.state = {
            commonControllers:[],
            tableData:[]
        }

        this.organizationType = '2';
        this.subOrgChild = [];
        this.proCertIdChild = [];

        this.handleTableExport = this.handleTableExport.bind(this);

        this.commonControllers = {
            sex:{
                type: 'checkbox',
                name: 'sexId',
                width: 4,
                label: '性别:',

                options : [
                    {
                        label: '男',
                        value: '1'
                    }, {
                        label: '女',
                        value: '2'
                    }
                ],
                defaultValue:['1','2'],
                labelCol:'32%',
                wrapperCol:'68%',
            },
            education: {
                type: 'radio',
                name: 'educationId',
                width: 12,
                label: '学历:',
                className: 'xl_width ',
                placeholder: '请选择',
                radioOptions: [],
                defaultValue:'B',
                labelCol:'8%',
                wrapperCol:'92%'
            },
            branch: {
                type: 'radioGroup',
                name: 'butype',
                width: 8,
                label: '部门类型:',
                className: 'xl_width ',
                placeholder: '请选择',
                radioOptions: [
                    {
                        label: '全部',
                        value: '1'
                    }, {
                        label: '总部',
                        value: '2'
                    }, {
                        label: '分支机构',
                        value: '3'
                    }
                ],
                labelCol:'25%',
                wrapperCol:'75%',
                defaultValue:this.organizationType,
                onChangBtn:this.onDepTypeChange.bind(this)
            },
            companyage: {
                type: 'radio',
                name: 'companyAgeId',
                width: 11,
                label: '司龄:',
                placeholder: '请选择',

                radioOptions: [],
                defaultValue:'B',
                labelCol:'11%',
                wrapperCol:'89%'
            },
            workage: {
                type: 'radio',
                name: 'workAgeId',
                width: 12,
                label: '工龄:',
                placeholder: '请选择',

                radioOptions: [],
                defaultValue:'B',
                labelCol:'12.6%',
                wrapperCol:'87%'
            },
            procert: {
                type: 'treeSelect',
                name: 'proCertId',
                placeholder: '请选择',
                width: 7,
                label: '专业技能:',
                treeData: [],
                className: 'ant-branch-left ',
                defaultValue:[''],
                labelCol:'25%',
                wrapperCol:'70%'
            },
            indicator: {
                type: 'treeSelect',
                name: 'groupCode',
                width: 7,
                label: '所有部门:',
                className: 'ant-branch-left ',
                treeData:[],
                placeholder: '请选择',
                defaultValue:['all'],
                labelCol:'25%',
                wrapperCol:'60%'
            },
            queryBtn: {
                type: 'button',
                name: 'query',
                width: 2,
                label: '查询',
                className:'ant-btn-primary',
                labelCol:'2%',
                wrapperCol:'98%',
                onClickBtn:this.clickQueryBtn.bind(this)
            }
        };
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
        const filterData = await getPortraitFilter();
        const {companyAgeId,index,proCertId,workAgeId,educationId} = filterData;

        //学历option
        let educationOptions_all = [];
        const educationOptions = educationId.map(item=>{
            educationOptions_all.push(item.edu_id);
            return {
                label:item.edu_name,
                value:item.edu_id
            }
        })
        this.commonControllers.education.radioOptions = [{label:'全部',value:educationOptions_all.join(',')},...educationOptions];
        this.commonControllers.education.defaultValue = educationOptions_all.join(',');

        //司龄option
        let companyAgeOptions_all = [];
        const companyAgeOptions = companyAgeId.map(item=>{
            companyAgeOptions_all.push(item.company_age_id);
            return {
                label:item.company_age_name,
                value:item.company_age_id
            }
        })
        this.commonControllers.companyage.radioOptions = [{label:'全部',value:companyAgeOptions_all.join(',')},...companyAgeOptions];
        this.commonControllers.companyage.defaultValue = companyAgeOptions_all.join(',');

        //工龄
        let workAgeOptions_all = [];
        const workAgeOptions = workAgeId.map(item=>{
            workAgeOptions_all.push(item.work_age_id);
            return {
                label:item.work_age_name,
                value:item.work_age_id
            }
        })
        this.commonControllers.workage.radioOptions = [{label:'全部',value:workAgeOptions_all.join(',')},...workAgeOptions];
        this.commonControllers.workage.defaultValue = workAgeOptions_all.join(',');

        //专业技能options
        const proCertOptions = proCertId.map(item=>{
            this.proCertIdChild.push(item.pro_cert_id);
            return {
                label:item.pro_cert_name,
                value:item.pro_cert_id,
                key:item.pro_cert_id
            }
        })
        this.commonControllers.procert.treeData = [{label:'全部',value:'all',key:'all',children:proCertOptions}];

        this.renderCommonControllers();
    }

    renderCommonControllers = async(flag=false)=>{
        const res = await getOrgOne({organizationType:this.organizationType});
        const params = this.organizationType==='1'?{all:{subOrg:[...res.headquarters.subOrg,...res.organization.subOrg],org_name:'全部'}}:res;

        const commonControllers = this.getControllers(params);
        this.setState({commonControllers},()=>{
            if (flag) {
                this.refs.filterController.setSignControllerData('groupCode',['all']);
            }else {
                let defaultControllerData = {};
                commonControllers.map(item=>{   //获取筛选条件默认参数集合
                    item.map(item_in=>{
                        if (item_in.defaultValue != undefined) {
                            defaultControllerData[item_in.name] = item_in.defaultValue;
                        }
                    })
                })
                const sendParams = {...this.refs.filterController.setControllerData(defaultControllerData),organizationType:this.organizationType};
                this.renderPage(sendParams);
            }
        });
    }

    clickQueryBtn(){
        const sendParams = {...this.refs.filterController.getControllerData(),organizationType:this.organizationType};
        if (!immutable.is(immutable.fromJS(sendParams),immutable.fromJS(this.prevSendparams))) {
            this.renderPage(sendParams);
        }
    }

    async renderPage(sendParams){
        this.prevSendparams = sendParams;
        const {groupCode,proCertId,organizationType,...elseArg} = sendParams;
        const snedGroupCode = groupCode[0] === 'all'?this.subOrgChild:groupCode;
        const sendProCertId = proCertId[0] === 'all'?this.proCertIdChild:proCertId;
        const res = await getPortraitDetails({...elseArg,groupCode:snedGroupCode.join(','),proCertId:sendProCertId.join(',')});
        //1. set table
        const tableData = res.details;
        tableData.map((item,key)=>{item.key = key});
        this.setState({tableData});

        //set ringpie
        const {ageType,education,sex} = res.statistics;
        let sexArg = [];
        let sexStr = '';
        sex.map(item=>{
            sexArg.push({value:item.sexNum,name:item.sexPCT});
            if (item.sexNum != '0' || item.sexNum != 0) {
                sexStr = (sexStr===''?'':sexStr+',') + `${item.sexName}-${item.sexNum}人`;
            }
        })
        sexArg.sort((a,b)=>{
            return b.value - a.value;
        })
        this.renderGraphRingPie([sexArg,sexStr]);

        //set bar 1
        let eduA = [];
        let eduB = [];
        let eduX = [];
        education.map(item=>{
            eduA.push(item.educationPCT.substring(0,item.educationPCT.length-1));
            eduB.push(item.educationNum);
            eduX.push(item.educationName);
        })
        this.renderGraphBar1(eduA,eduB,eduX);

        //set age
        let ageA = [];
        let ageX = [];
        ageType.sort((a,b)=>{
            return Number(a.ageTypeName.substring(0,2)) - Number(b.ageTypeName.substring(0,2))
        })
        ageType.map(item=>{
            ageX.push(item.ageTypeName);
            ageA.push(item.ageTypeNum);
        })
        this.renderGraphBar2(ageA,ageX);
    }

    renderGraphRingPie([a,e]){
        const seriesData=[
            {
                "name":'财通',
                'data':a
            }
        ];
        const extraOption={
            title : [
                {
                    text:e,
                    left:'45%',
                    bottom:'5%',
                    textAlign: 'center',
                    textStyle:{
                        fontWeight:'100',
                        color: "#fff",
                        fontSize:14,


                    }
                }
            ],
            series:[
                {
                    //radius: ['39%', '45%'],
                    center: ['50%', '50%'],
                    avoidLabelOverlap:false,
                    silent:true,
                    itemStyle: {
                        normal: {
                            color: {  // 完成的圆环的颜色
                                colorStops: [{
                                  offset: 0, color: '#00ffe1' // 0% 处的颜色
                                }, {
                                  offset: 1, color: '#2abcee' // 100% 处的颜色
                                }]
                             },
                            label: {
                                show: true,
                                color:'#fff',
                                position: 'center',
                                fontSize:20
                            },
                        }
                    },
                },
            ]
        };

        this.refs.graph_ringpie.refreshGraph({seriesData,extraOption});
    }

    renderGraphBar1(a,b,x){
        const seriesData = [{name:'',data:a}];
        const visualMap = true;
        const dataUnit = ['%'];
        const axisAppendData = {data:b,unit:'人'}
        const _x = x.map((v,k)=>v+' - '+b[k]+'人');
        const yAxisData = {name:'',data:_x};

        const extraOption = {

            series:[{
                barWidth: '40%',
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        textStyle: {
                            color: "#fff",
                        }
                    }
                },
            }],

            xAxis:{
                scale:true,

            },
            yAxis:{
                axisLabel:{
                    inside:true,
                     padding:[40,0,0,0],
                    interval:0,
                    textStyle: {
                      color: '#93c2e2',
                      }
                }
            },
            // tooltip:{
            //     trigger: 'axis',
            //     backgroundColor:'rgba(50,50,50,0.7)',
            //
            //     show:true,
            //     },
            grid:{
                top:'5%',
                bottom:'0%',
                right:'14%',
                containLabel: true
            }
        };
        this.refs.graph_bar1.refreshGraph({visualMapColor:['#6febff'],seriesData,visualMap,dataUnit,axisAppendData,yAxisData,extraOption});
    }

    renderGraphBar2(a,x){
        const seriesData = [
            {name:'',data:a},
        ];
        const dataUnit = ['人'];
        const xAxisData = {data:x};
        const extraOption = {
            series:[{
                itemStyle:{
                normal: {
                    show: true,

                }
            },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                        }
                    }
                }
            }],
            color:['#10FFDE', '#dcc7f3'],
            yAxis:{
                show:false,
            },
            grid:{
                top:'10%',

            },
            tooltip:{
                trigger: 'axis',
                backgroundColor:'rgba(50,50,50,0.7)',
                formatter:'{b}{a}:{c}人',
                show:true,
                },
            xAxis:{
                axisLine:{
                    lineStyle:{
                        color:'#88aede'
                    }
                },
                axisLabel:{
                    color:'#93c2e2',
                    formatter:'{img|}\n{value}',
                    rich:{
                        img:{
                            backgroundColor:{
                                image:CONSTANTS.APP_BASE_URL+'/resources/images/icon_i.png'
                            }
                        }
                    }
                }
            }
        }
        this.refs.graph_bar2.refreshGraph({seriesData,dataUnit,xAxisData,extraOption});
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
            this.commonControllers.indicator.treeData = _.map(data,function(item,key) {
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

        const commonControllers = this.commonControllers;

        const controllers = [
            [
                commonControllers.sex,
                commonControllers.education,
                commonControllers.branch,
                commonControllers.companyage,
                commonControllers.workage,
                commonControllers.procert,
                commonControllers.indicator,
                commonControllers.queryBtn
            ]
        ];
        return controllers;
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    handleTableExport(){

        const {groupCode,proCertId,organizationType,...elseArg} = this.prevSendparams;
        const snedGroupCode = groupCode[0] === 'all'?this.subOrgChild:groupCode;
        const sendProCertId = proCertId[0] === 'all'?this.proCertIdChild:proCertId;
        const urlParams = $.param({...elseArg,groupCode:snedGroupCode.join(','),proCertId:sendProCertId.join(',')});
        //console.log(CONSTANTS.APP_BASE_URL+'/api/portrait/export?'+urlParams);
        //window.open(CONSTANTS.APP_BASE_URL+'/api/portrait/export?'+urlParams);
        getPortraitExport(urlParams).then(res=>{
            console.log(res);
        });
    }

    render() {
        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
        />;

        let personas_p3_c1_data = {
            name:'男',
            percent:82,
            value:78,
            unit:'人'
        };

        return (
            <div>
                <div className="conditional_filtering">
                    <PanelContainer
                        hasFilter = {
                            <div>
                                <div className="pull-left">组合查询</div>
                                    <div className="personas_search">
                                        {filterContent}
                                    </div>
                                <div className="clearfix"></div>
                            </div>
                        }
                    >
                    </PanelContainer>
                </div>

                <PanelContainer title='详细数据' hasTip={()=>{return this.returnTipTable('14')}} >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <JfCard title="人员画像明细" className="personas_export">
                                <div  >

                                         <Button type="primary" icon="export" onClick={this.handleTableExport}>导出 XLSX</Button>

                                </div>
                                <Table columns={tableTitle} dataSource={this.state.tableData} />
                            </JfCard>
                        </Col>
                    </Row>
                </PanelContainer>

                <PanelContainer title='分布图' hasTip={()=>{return this.returnTipTable('15')}} >
                    <Row gutter={8}>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <RingPie
                                ref='graph_ringpie'
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <Bar
                                ref='graph_bar1'
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                            <Bar
                                ref='graph_bar2'
                            />
                        </Col>
                    </Row>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.create_date}</div>
            </div>
        )
    }
}

module.exports = Hrstaff;
