import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,Pagination,message,Modal} from 'antd';
import {PanelContainer,FilterController,Column, Cell, HeaderCell,Table,JfCard,TipTable} from 'app_common';
import {queryBranchList,queryCustomerName,getReportDate} from '../../api';
import 'rsuite-table/lib/less/index.less';
import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import immutable from 'immutable';

require('es6-promise').polyfill();

const childReportTitle = CONSTANTS.cooperatedevelop_table_title_count_child.map(item=>(
    <Column align="center" key={item.index_id} width={150} resizable>
        <HeaderCell width={41}>{item.name}</HeaderCell>
        <Cell dataKey={item.field_name} />
    </Column>
))

export default class Cooperatedevelop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targetList:[],
            reportDataSources:[],
            commonControllers:[],
            sortType:undefined,
            sortColumn:undefined,
            tableLoading:false,
            reportTitle:'',
            reportDataSourcesTotal:0,
            tableCurrentPage:1,
            moadlVisible:false,
            childReportDataSources:[],
            tipTableIndex:'59'
        };

        this.commonControllers = {
            startDate: {
                type: 'startDate',
                name: 'startDate',
                width: 5,
                label: '统计起始时间：',
                // defaultValue:moment('2017-11-02', 'YYYY-MM-DD'),
                labelCol:'48%',
                wrapperCol:'52%'
            },
            endDate: {
                type: 'endDate',
                name: 'endDate',
                width: 5,
                label: '统计结束时间：',
                // defaultValue:moment('2017-11-02', 'YYYY-MM-DD'),
                labelCol:'48%',
                wrapperCol:'52%'
            },
            customername: {
                type: 'select',
                name: 'customerNo',
                width: 10,
                label: '客户姓名：',
                labelCol:'23%',
                wrapperCol:'77%',
                placeholder: '输入客户号/客户名',
                className: 'ant-btn-primary',
                multiple:true,
                options: []
            },
            branchNo: {
                type: 'treeSelect',
                name: 'branchId',
                width: 5,
                label: '开户营业部：',
                placeholder: '请选择',
                className: 'ant-branch-left',
                treeData: this.state.treeNodeList,
                defaultValue:[],
                labelCol:'48%',
                wrapperCol:'52%'
            },
            queryBtn: {
                type: 'button',
                name: 'query',
                width: 2,
                label: '查询',
                className: 'ant-btn-primary',
                onClickBtn:this.clickQueryBtn.bind(this),
                labelCol:'2%',
                wrapperCol:'98%'
            },
            exportBtn: {
                type: 'dropdown',
                name: 'export',
                dropList: [
                    {
                        label:<div className="pdf_ico">PDF</div>,
                        id:'pdf'
                    },
                    {
                        label:<div className="xlsx_ico">XLSX</div>,
                        id:'xlsx'
                    },
                    // {
                    //     label:<div className="csv_ico">CSV</div>,
                    //     id:'csv'
                    // },
                    // {
                    //     label:<div className="docx_ico">DOCX</div>,
                    //     id:'docx'
                    // },
                ],
                width: 2,
                label: '导出',
                className: '',
                onClickBtn:this.exportReport.bind(this),
                labelCol:'2%',
                wrapperCol:'98%'
            }
        };

        this.radioDefaultValue = 'dev';    //默认radio 值
        this.branchChildrenList = {};         //分支机构父节点与子节点对应的集合
        this.cooperatedevelop_id_name = CONSTANTS.cooperatedevelop_id_name;
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.isSortAndList = {};              //判断是否排过序，并且把排序后的参数存进来
        this.childReportData = [];
        this.tipTableIndexMap = {
            dev:'59',
            count:'60'
        };
        this.lastUpdateDateMap = {
            dev:'c_coop_statistics_01',
            count:'c_coop_client_01'
        };
        this.reportRenderTime = {
            dev:0,
            count:0
        }
        this.paramsFormatRule = {
            dev:{
                startDate:'YYYY-MM-DD',
                endDate:'YYYY-MM-DD',
                startDate1:'YYYY-MM-DD',
                endDate1:'YYYY-MM-DD'
            },
            count:{
                startDate:'YYYY-MM-DD',
                endDate:'YYYY-MM-DD'
            }
        }

        this.radioOnChange = this.radioOnChange.bind(this);
        this.onClickReportDesc = this.onClickReportDesc.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handlePaginationOnChange = this.handlePaginationOnChange.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    async componentDidMount(){
        //获取分行分支机构列表
        const {branchList,childrenList} = await queryBranchList();
        this.branchChildrenList = childrenList;
        this.commonControllers.branchNo.treeData = branchList;
        this.commonControllers.branchNo.defaultValue = ['1000'];
        const customerNameList = await queryCustomerName();
        const options = customerNameList.map(item=>({
            label:item.customer,
            value:item.cust_no
        }))
        this.commonControllers.customername.options = options;
        this.filterReportFn();
    }

    async filterReportFn(reportId=this.cooperatedevelop_id_name[this.radioDefaultValue]){
        const _this = this;
        //1. show loading
        this.setState({tableLoading:true})
        //2. 获取指标列表，转化出默认表头，指标的子节点，
        // this.targetList = await queryTargetList({reportId});
        // let __targetchildrenList = [];
        // let __isDefaultList = [];
        // let __defaultTargetList = [];   //获取table表头信息
        // const __treeNodeList = this.targetList.map(item=>{   //转化树结构
        //     __targetchildrenList.push(item.index_id)
        //     if (item.is_default == '1' || item.is_default == 1) {
        //         __isDefaultList.push(item.index_id);
        //         __defaultTargetList.push(item);
        //     }
        //     return {label:item.name,value:item.index_id}
        // });
        // this.defaultTargetList = __defaultTargetList;
        // this.targetChildrenList = __targetchildrenList;     //父节点和子节点的map关系
        // //3. 配置筛选form的默认值，和相关配置（select-option）
        // this.commonControllers.indicator.treeData = [{label:'全部',value:'all',key:'all',children:__treeNodeList}];
        // this.commonControllers.indicator.defaultValue = __isDefaultList;
        const commonControllers = this.getControllers(this.radioDefaultValue);
        //4. 渲染筛选from
        this.setState({commonControllers});
        //5. 给筛选from设置默认值，并拿到转化后的参数，用默认的筛选条件第一次请求报表接口
        let defaultControllerData = {};
        commonControllers.map(item=>{   //获取筛选条件默认参数集合
            item.map(item_in=>{
                if (item_in.defaultValue != undefined) {
                    defaultControllerData[item_in.name] = item_in.defaultValue;
                }
            })
        })
        const sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
        //6. 把这一次的参数设置为上次一使用的参数，用于下次切换筛选条件后的查询，如果和一样，则不进行查询，还用于报表的筛选和翻页
        // this.prevInputData = sendParams;
        //7. 最后把默认表头和参数列表给到请求报表FN（如果没有指标就不传，会有默认表头）
        this.getReportDateFn(sendParams);
    }

    async getReportDateFn(arg,obj={page:'1'}){
        //获取表头列表
        const tableTitleList = CONSTANTS[`cooperatedevelop_table_title_${this.radioDefaultValue}`];
        //获取表内容
        const sendParams = _.extend({},arg);
        const wrapSendParams = this.wrapGetReportParams(sendParams);
        //首次进入时，包括radio切换时，默认取一个表头第一个字段降序排序
        if (obj.orderKey === undefined) {
            obj.orderKey = tableTitleList[0].field_name;
            obj.order = 'desc';
            this.setState({sortColumn:tableTitleList[0].field_name,sortType:'desc'})
        }
        //校验为空,如果是第一次渲染，则不进行为空校验
        // if (this.checkFromNull(wrapSendParams,this.reportRenderTime[this.radioDefaultValue] === 0)) {
            const resData = await getReportDate({...wrapSendParams,...obj,pageSize:CONSTANTS.report_default_page_size});
            const {reportData,params:filterData} = resData;
            let reportDataSources = [];
            const _check_list = CONSTANTS.cooperatedevelop_has_stream_column_name_map[this.radioDefaultValue] || [];
            reportData.data.map((item,key)=>{
                let list = {};
                if (this.radioDefaultValue === 'dev') {
                    _.map(tableTitleList,(column)=>{
                        if (_check_list.indexOf(column.field_name) > -1) {
                            list[column.field_name] = <span className='coop-dev-branch-list' onClick={()=>{this.onClickReportDesc(column.field_name,item)}}>{item[column.field_name]}</span>
                        }else{
                            list[column.field_name] = item[column.field_name];
                        }
                    })
                }else {
                    _.map(tableTitleList,(column)=>{
                        if (item[column.field_name]) {
                            if (column.field_name == 'coop_branch_list') {
                                list[column.field_name] = <span className='coop-dev-branch-list' onClick={()=>{this.onClickReportDesc('',item[column.field_name])}}>详情查看</span>;
                            }else if(column.field_name == 'coop_branch_name'){
                                list[column.field_name] = <span className='coop-dev-branch-name'>{item[column.field_name]}</span>;
                            }else{
                                list[column.field_name] = item[column.field_name];
                            }
                        }
                    })
                }
                reportDataSources.push({row_index:key+1,branch_name:item.branch_name,...list,key});
            })
            const reportTitle = CONSTANTS.cooperatedevelop_report_title_map[this.radioDefaultValue];
            //如果报表第一次渲染，包括切换radio，筛选条件要重新set value
            if (this.reportRenderTime[this.radioDefaultValue] === 0) {
                this.prevInputData = this.refs.filterController.setControllerData(this.wrapCtrlParams(filterData),true);
            }else {
                this.prevInputData = arg;
            }
            //对应报表的渲染次数
            this.reportRenderTime[this.radioDefaultValue]++;
            //如果在渲染页面时切换radio,则不渲染这次请求
            if (this.cooperatedevelop_id_name[this.radioDefaultValue] === wrapSendParams.reportId) {
                this.setState({targetList:tableTitleList,reportDataSources,reportTitle,tableLoading:false,reportDataSourcesTotal:reportData.total});
            }
        // }
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();
        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj) && this.checkFromNull(returnData,this.reportRenderTime[this.radioDefaultValue] === 0)) {
            this.setState({tableLoading:true,sortType:undefined,sortColumn:undefined,tableCurrentPage:1});
            this.isSortAndList = {};   //重新查询的，去掉排序
            this.getReportDateFn(returnData);
        }
    }

    radioOnChange(e) {
        this.prevInputData = {};    //上次的筛选条件，重置，很重要！！！
        this.radioDefaultValue = e.target.value;
        this.reportRenderTime[this.radioDefaultValue] = 0;  //切换radio时,对应报表的渲染次数重置
        this.setState({
            loading:true,
            tableCurrentPage:1,
            reportDataSources:[],
            sortType:undefined,
            sortColumn:undefined,
            tipTableIndex:this.tipTableIndexMap[e.target.value]
        })
        this.filterReportFn(this.cooperatedevelop_id_name[this.radioDefaultValue]);
    }

    getBranchChildNameList = list => {
        const __keys = Object.keys(this.branchChildrenList);
        //将父节点转化为子节点合集
        const __list = list.map(v=>{
            if (__keys.indexOf(v) >= 0) return this.branchChildrenList[v]
            return v
        })
        // [1,[2,3]] ==> [1,2,3]
        let listArray = _.reduceRight(
            __list,(a, b)=> {
                return a.concat(typeof b == 'number'?[b]:b)
            }, []
        );
        return listArray.join(',');
    }

    checkFromNull(sendParams,returnTrue=false){
        //校验参数是否为空
        // sendParams  -->  需要检验的参数
        // returnTrue  -->  是否直接返回true，不需要校验
        let flag = true;
        if (!returnTrue) {
            const check_null_list = this.radioDefaultValue==='dev'?['startDate','endDate','startDate1','endDate1']:['startDate','endDate'];
            for (let i=0;i<check_null_list.length;i++){
                let v = sendParams[check_null_list[i]];
                if (v == '' || v == undefined || v == null || v.length == 0) {
                    message.info('请选择日期后再查询！');
                    this.setState({tableLoading:false})
                    flag = false;
                    break
                }
            }
        }

        return flag
    }

    handlePaginationOnChange(page){
        this.setState({tableLoading:true,tableCurrentPage:page});
        this.getReportDateFn(this.prevInputData,{page,...this.isSortAndList});
    }

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.prevInputData);
        const wrapSendParams = this.wrapGetReportParams(sendParams);
        const urlParams = $.param({...wrapSendParams,exportType:e.key});

        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    onClickReportDesc(name,data){
        // 分两种下钻
        let childReportDataSources = [];
        if (this.radioDefaultValue === 'dev') {
            let {title:childReportTitle,data:_child_data} = CONSTANTS[`cooperatedevelop_table_title_${this.radioDefaultValue}_child_${name}`];
            const childReportDataSources = _child_data.map((item,key)=>{
                return {
                    indexDesc:item.name,
                    indexInfo:data[item.dataIndex],
                    indexId:key,
                    blank:item.blank
                }
            })
            this.setState({moadlVisible:true,childReportTitle,childReportDataSources})
        }else {
            data.map((item,key)=>{
                let list = {};
                _.map(CONSTANTS.cooperatedevelop_table_title_count_child,(column)=>{
                    if (item[column.field_name]) {
                        list[column.field_name] = item[column.field_name];
                    }
                })
                childReportDataSources.push({...list,key});
            })
            this.setState({moadlVisible:true,childReportDataSources})
        }
    }

    wrapCtrlParams(params){
        _.map(this.paramsFormatRule[this.radioDefaultValue],(v,k)=>{
            params[k] = moment(params[k],v);
        })

        return params
    }

    wrapGetReportParams(params){
        params.branchId = this.getBranchChildNameList(params.branchId);
        params.coopBranchId = this.getBranchChildNameList(params.coopBranchId);
        params.reportId = this.cooperatedevelop_id_name[this.radioDefaultValue];

        return params
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            sortColumn,
            sortType,
            tableLoading:true
        });
        //在清空排序的时候也要把这个变量一并清空   ！！！ important
        this.isSortAndList = {orderKey:sortColumn,order:sortType};
        this.getReportDateFn(this.prevInputData,{...this.isSortAndList,page:this.state.tableCurrentPage});
    }

    getControllers(reportType) {
        let controllers = [
            []
        ];
        let commonControllers = this.commonControllers;
        switch (reportType) {
            case 'dev':
                controllers = [
                    [
                        commonControllers.startDate,
                        commonControllers.endDate,
                        {...commonControllers.startDate,label:'开户起始时间：',name:'startDate1',disableIndex:'1'},
                        {...commonControllers.endDate,label:'开户结束时间：',name:'endDate1',disableIndex:'1'},
                        commonControllers.queryBtn,
                    ],
                    [
                        commonControllers.customername,
                        commonControllers.branchNo,
                        {...commonControllers.branchNo,label:'合作营业部：',name:'coopBranchId'},
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'count':
                controllers = [
                    [
                        {...commonControllers.startDate,label:'开户起始时间：'},
                        {...commonControllers.endDate,label:'开户结束时间：'},
                        {...commonControllers.branchNo,labelCol:'42%',wrapperCol:'58%'},
                        commonControllers.queryBtn
                    ],
                    [
                        commonControllers.customername,
                        {...commonControllers.branchNo,label:'合作营业部：',name:'coopBranchId',labelCol:'42%',wrapperCol:'58%'},
                        commonControllers.exportBtn
                    ]
                ];
                break;
            default:;
        }

        return controllers;
    }

    hideModal(){
        this.setState({moadlVisible:false});
    }

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);

        return <TipTable info={info} />
    }

    render() {
        const tableRadio = (
            <RadioGroup onChange={this.radioOnChange} defaultValue={this.radioDefaultValue} size='large'>
                <RadioButton value="dev">合作开发统计报表</RadioButton>
                <RadioButton value="count">合作开发客户报表</RadioButton>
            </RadioGroup>
        );

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onDataChange={this.handleFilterContent}
        />;

        let reportTitleList = this.radioDefaultValue == 'dev'?[
            <Column align="center" width={50} key='row_index' resizable fixed width={70}>
                <HeaderCell>序号</HeaderCell>
                <Cell dataKey='row_index' />
            </Column>,
            <Column align="center" key='branch_name' resizable fixed width={200}>
                <HeaderCell>营业部名称</HeaderCell>
                <Cell dataKey='branch_name' />
            </Column>
        ]:[
            <Column align="center" width={50} key='row_index' resizable fixed width={70}>
                <HeaderCell>序号</HeaderCell>
                <Cell dataKey='row_index' />
            </Column>,
            <Column align="center" key='customer' resizable fixed width={200}>
                <HeaderCell>客户</HeaderCell>
                <Cell dataKey='customer' />
            </Column>
        ];

        this.state.targetList.map(item=>{
            if(item.isShow !== 'no'){
                reportTitleList.push(
                    <Column align="center" key={item.index_id} resizable sortable={item.field_name!='coop_branch_list'} width={200}>
                        <HeaderCell width={41}>{item.name}</HeaderCell>
                        <Cell dataKey={item.field_name} />
                    </Column>
                )
            }
        })
        const hasDate = this.state.reportDataSources.length>0;

        return (
            <div>
                <PanelContainer
                    hasFilter={<div> {filterContent} </div>}
                    title='合作开发报表'
                    hasTip={()=>{return this.returnTipTable(this.state.tipTableIndex)}} hasRadio={tableRadio}
                ><div className="transaction_table_bb">
                    <div className="management_pagination_bg"></div>
                    <JfCard title={this.state.reportTitle} loading={this.state.tableLoading}>
                        {hasDate?<div><Table
                            data={this.state.reportDataSources}
                            sortColumn={this.state.sortColumn}
                            sortType={this.state.sortType}
                            onSortColumn={this.handleSortColumn}
                            height={770}
                        >
                            {reportTitleList}
                        </Table><Pagination
                            current={this.state.tableCurrentPage}
                            pageSize={CONSTANTS.report_default_page_size}
                            total={this.state.reportDataSourcesTotal}
                            onChange={this.handlePaginationOnChange}
                        /></div>:<div className="ant-table-placeholder"><span><i className="anticon anticon-frown-o"></i>暂无数据</span></div>}
                    </JfCard>
                </div>
                </PanelContainer>
                <Modal
                    title="合作业务统计报表-合作营业部详情查看"
                    visible={this.state.moadlVisible}
                    footer={null}
                    onCancel={this.hideModal}
                    width={1250}
                >
                    <div>
                        {
                            this.radioDefaultValue==='count'?<Table
                                data={this.state.childReportDataSources}
                                height={400}
                            >
                                {childReportTitle}
                            </Table>:<TipTable info={this.state.childReportDataSources} />
                        }

                    </div>
                </Modal>
                <div className='layout-footer'>本页数据更新至{this.props.date[this.lastUpdateDateMap[this.radioDefaultValue]]}</div>
            </div>
        );
    }

}

module.exports = Cooperatedevelop;
