import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,message,Pagination} from 'antd';
import 'rsuite-table/lib/less/index.less';
import {PanelContainer,FilterController,JfCard,Table,Column, Cell, HeaderCell,TipTable} from 'app_common';
import {getReportDate,queryBranchList,queryTargetList,exportReportAPI,queryAssetList} from '../../api';
import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import immutable from 'immutable';

require('es6-promise').polyfill();

export default class Customercount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targetList:[],
            reportDataSources:[],
            commonControllers:[],
            tableLoading:false,
            reportTitle:'',
            sortColumn:undefined,
            sortType:undefined,
            childSortColumn:undefined,
            childSortType:undefined,
            reportDataSourcesTotal:0,
            tableCurrentPage:1,
            tipTableIndex:'63'
        };

        this.commonControllers = {
            startDate: {
                type: 'startDate',
                name: 'startDate',
                width: 6,
                label: '开户起始时间：',
                labelCol:'42%',
                wrapperCol:'58%'
            },
            endDate: {
                type: 'endDate',
                name: 'endDate',
                width: 6,
                label: '开户结束时间：',
                labelCol:'42%',
                wrapperCol:'58%'
            },
            month: {
                type: 'month',
                name: 'month',
                width: 5,
                label: '时间选择：',
                labelCol:'37%',
                wrapperCol:'63%'
            },
            range: {
                type: 'treeSelect',
                name: 'assetSection',
                width: 5,
                label: '资产范围：',
                placeholder: '请选择',
                className: 'ant-branch-left',
                treeData: [],
                labelCol:'37%',
                wrapperCol:'63%'
            },
            branch: {
                type: 'treeSelect',
                name: 'branchId',
                width: 5,
                label: '分支机构：',
                placeholder: '请选择',
                className: 'ant-branch-left',
                treeData: [],
                labelCol:'37%',
                wrapperCol:'63%'
            },
            indicator: {
                type: 'treeSelect',
                name: 'indexId',
                width: 5,
                label: '指标筛选：',
                className: 'ant-branch-left',
                treeData: [],
                placeholder: '请选择',
                defaultValue:[],
                labelCol:'37%',
                wrapperCol:'63%'
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
            backBtn: {
                type: 'button',
                name: 'back',
                width: 2,
                label: '返回',
                className: 'ant-btn-primary',
                onClickBtn:this.clickBackBtn.bind(this),
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

        this.childRadioName = 'origin_child';
        this.isChild = false;
        this.lastOriginCtrlValue = {};

        this.radioDefaultValue = 'origin';
        this.branchChildrenList = {};
        this.targetChildrenList = [];
        this.rangeChildrenList = [];
        this.tipTableIndexMap = {
            origin:'63',
            subquery:'64',
            serquery:'65'
        };
        this.lastUpdateDateMap = {
            origin:'c_open_client_statistics_01',
            subquery:'c_asset_section_statistics_01',
            serquery:'c_margin_trading_statistics_01'
        };

        this.customercount_id_name_map = CONSTANTS.customercount_id_name_map;
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.targetList = [];                 //指标列表
        this.reportList = [];                 //查询回来的报表列表
        this.isSortAndList = {};              //判断是否排过序，并且把排序后的参数存进来
        this.defaultTargetList = [];
        this.exportParamsList = {};           //报表导出是需要的参数

        this.radioOnChange = this.radioOnChange.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
        this.onClickReportDesc = this.onClickReportDesc.bind(this);
        this.handlePaginationOnChange = this.handlePaginationOnChange.bind(this);
        this.handleChildSortColumn = this.handleChildSortColumn.bind(this);
    }

    getControllers(reportType) {
        let controllers = [
            []
        ];
        let commonControllers = this.commonControllers;
        switch (reportType) {
            case 'origin':
                controllers = [
                    [
                        {...commonControllers.startDate,label:'统计起始时间：'},
                        {...commonControllers.endDate,label:'统计结束时间：'},
                        commonControllers.branch,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'subquery':
                controllers = [
                    [
                        commonControllers.month,
                        {...commonControllers.branch,width:5},
                        {...commonControllers.range,width:4,labelCol:'46%',wrapperCol:'54%'},
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'serquery':
                controllers = [
                    [
                        {...commonControllers.startDate,label:'统计起始时间：',width:5,labelCol:'48%',wrapperCol:'52%'},
                        {...commonControllers.endDate,label:'统计结束时间：',width:5,labelCol:'48%',wrapperCol:'52%'},
                        {...commonControllers.branch,width:5},
                        {...commonControllers.indicator,width:4,labelCol:'46%',wrapperCol:'54%'},
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'origin_child':
                controllers = [
                    [
                        commonControllers.startDate,
                        commonControllers.endDate,
                        commonControllers.branch,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn,
                        commonControllers.backBtn
                    ]
                ];
                break;
            default:;
        }
        return controllers;
    }

    async componentDidMount(){
        //获取分行分支机构列表
        const {branchList,childrenList} = await queryBranchList();
        const assetList = await queryAssetList();
        this.branchChildrenList = childrenList;
        this.commonControllers.branch.treeData = branchList;
        this.commonControllers.branch.defaultValue = ['1000'];
        let __options = assetList.map(assetItem=>{
            this.rangeChildrenList.push(assetItem.businessflag_code);
            return {
                label:assetItem.businessflag_name,
                value:assetItem.businessflag_code,
                key:assetItem.businessflag_code
            }
        });
        this.commonControllers.range.treeData = [{label:'全部',value:'all',key:'all',children:__options}];
        this.commonControllers.range.defaultValue = this.rangeChildrenList;
        this.filterReportFn(this.customercount_id_name_map[this.radioDefaultValue]);
    }

    radioOnChange(e) {
        this.isChild = false;
        this.isSortAndList = {};
        this.prevInputData = {};    //上次的筛选条件，重置，很重要！！！
        this.radioDefaultValue = e.target.value;
        this.setState({
            tableLoading:true,
            reportDataSources:[],
            sortColumn:undefined,
            sortType:undefined,
            childSortColumn:undefined,
            childSortType:undefined,
            tipTableIndex:this.tipTableIndexMap[e.target.value]
        })
        this.lastOriginCtrlValue = {};
        this.exportParamsList = {};
        this.filterReportFn(this.customercount_id_name_map[this.radioDefaultValue]);
    }

    clickBackBtn(){
        this.isChild = false;
        this.isSortAndList = {};
        this.prevInputData = {};    //上次的筛选条件，重置，很重要！！！
        this.setState({
            tableLoading:true,
            tableCurrentPage:1,
            childSortColumn:undefined,
            childSortType:undefined,
            reportDataSources:[]
        })
        this.radioDefaultValue = 'origin';
        this.filterReportFn(this.customercount_id_name_map[this.radioDefaultValue],this.lastOriginCtrlValue);
        this.lastOriginCtrlValue = {};
    }

    onClickReportDesc(params,branchId){
        this.prevInputData = {};    //上次的筛选条件，重置，很重要！！！
        this.setState({
            tableLoading:true
        })
        // this.commonControllers.branch.defaultValue = [branchId];
        this.isChild = true;
        this.childReportParams = {
            page:1,
            pageSize:CONSTANTS.report_default_page_size,
            branchId:[branchId]
        }
        this.exportParamsList = {};
        this.lastOriginCtrlValue = {startDate:moment(params.startDate, 'YYYY-MM-DD'),endDate:moment(params.endDate, 'YYYY-MM-DD'),branchId:params.branchId.split(',')}
        this.filterReportFn('1301',{startDate:moment(params.startDate, 'YYYY-MM-DD'),endDate:moment(params.endDate, 'YYYY-MM-DD'),branchId:[branchId]});
    }

    async filterReportFn(reportId,ctrlValue=undefined){
        const _this = this;
        this.setState({tableLoading:true})
        const __radioName = this.isChild?this.childRadioName:this.radioDefaultValue;
        //获取指标列表
        let __defaultTargetList = [];   //获取table表头信息
        if(this.radioDefaultValue==='serquery'){
            this.targetList = await queryTargetList({reportId});
            let __targetchildrenList = [];
            //树结构
            const __treeNodeList = this.targetList.map(item=>{
                __targetchildrenList.push(item.index_id)
                __defaultTargetList.push(item);
                return {label:item.name,value:item.index_id}
            });
            this.targetChildrenList = __targetchildrenList;     //父节点和子节点的map关系
            // 配置筛选条件参数 ， 树机构以及默认值
            this.commonControllers.indicator.treeData = [{label:'全部',value:'all',key:'all',children:__treeNodeList}];
            this.commonControllers.indicator.defaultValue = ['all'];
        }else {
            __defaultTargetList = CONSTANTS['customercount_table_title_'+__radioName];
        }
        this.defaultTargetList = __defaultTargetList;

        const commonControllers = this.getControllers(__radioName);
        const orderList = this.isChild?{childSortColumn:__defaultTargetList[0].field_name,childSortType:'desc'}:{sortColumn:__defaultTargetList[0].field_name,sortType:'desc'}
        //先渲染筛选组件
        this.setState({commonControllers,...orderList});
        //  给筛选条件设置默认值
        let defaultControllerData = {};
        //获取筛选条件默认参数集合
        commonControllers.map(item=>{
            item.map(item_in=>{
                if (item_in.defaultValue != undefined) {
                    defaultControllerData[item_in.name] = item_in.defaultValue;
                }
            })
        })
        if (ctrlValue) {
            defaultControllerData = ctrlValue;
        }
        //set默认值 并到格式化参数
        const sendParams = this.refs.filterController.setControllerData(defaultControllerData);
        this.prevInputData = sendParams;
        let __sendParams = this.isChild?{...sendParams,...this.childReportParams,reportId,orderKey:__defaultTargetList[0].field_name,order:'desc'}:{...sendParams,reportId};
        //请求报表数据并渲染报表
        this.getReportDateFn(__defaultTargetList,__sendParams);
    }

    async getReportDateFn(tableTitleList,arg){
        //获取表内容
        const sendParams = _.extend({},arg);
        sendParams.branchId = this.getBranchChildNameList(sendParams.branchId);
        // sendParams.reportId = this.customercount_id_name_map[this.radioDefaultValue];
        if (sendParams.assetSection) sendParams.assetSection = sendParams.assetSection==='all'?this.rangeChildrenList.join(','):sendParams.assetSection;
        if (sendParams.indexId) sendParams.indexId = sendParams.indexId[0]==='all'?this.targetChildrenList: sendParams.indexId;
        //校验为空
        if (this.checkFromNull(sendParams)) {
            let res = await getReportDate(sendParams);
            let sendParamsCurrent = {...sendParams,...res['params']};

            //console.log(sendParamsCurrent);
            this.reportList = res.reportData;
            const {reportId:__reportId} = arg;
            this.exportParamsList = sendParams;
            this.prevInputData = sendParams;
            let reportDataSources = [];
            const __data = this.isChild?this.reportList.data:this.reportList;
            __data.map((item,key)=>{
                let list = {};
                _.map(tableTitleList,(column)=>{
                    if (item[column.field_name]) {
                        if (column.field_name == 'open_cust_num' && this.radioDefaultValue === 'origin') {
                            list[column.field_name] = <span className='coop-dev-branch-list' onClick={()=>{this.onClickReportDesc(sendParamsCurrent,item.branch_no)}}>{item[column.field_name]}</span>;
                        }else{
                            list[column.field_name] = item[column.field_name];
                        }
                    }
                })
                reportDataSources.push({row_index:key+1,branch_name:item.branch_name,...list,key});
            })
            const reportTitle = CONSTANTS.customercount_report_title_map[this.radioDefaultValue];
            if (this.isChild) {
                if(this.radioDefaultValue === 'origin'){
                    this.setState({targetList:tableTitleList,reportDataSources,reportTitle,tableLoading:false,reportDataSourcesTotal:this.reportList.total});
                }
            }else{
                let defaultControllerData = {...arg};
                switch (this.radioDefaultValue) {
                    case 'origin':
                        defaultControllerData.startDate = moment(res.params.startDate,'YYYYMMDD');
                        defaultControllerData.endDate = moment(res.params.endDate,'YYYYMMDD');
                        break;
                    case 'subquery':
                        defaultControllerData.month = moment(res.params.endDate,'YYYYMM');
                        defaultControllerData.assetSection = arg.assetSection.split(',');
                        break;
                    case 'serquery':
                        defaultControllerData.startDate = moment(res.params.startDate,'YYYYMMDD');
                        defaultControllerData.endDate = moment(res.params.endDate,'YYYYMMDD');
                        break;
                    default:;
                }
                this.prevInputData = this.refs.filterController.setControllerData(defaultControllerData);
                this.exportParamsList = {...this.prevInputData};
                //如果在渲染页面时切换radio,则不渲染这次请求
                if (this.customercount_id_name_map[this.radioDefaultValue] === sendParams.reportId) {
                    this.setState({targetList:tableTitleList,reportDataSources,reportTitle,tableLoading:false});
                }
            }
        }
    }

    async getChildReportDateFn(arg,obj={page:'1'}){

        //获取表头列表
        const tableTitleList = CONSTANTS[`customercount_table_title_${this.childRadioName}`];
        //获取表内容
        const sendParams = _.extend({},arg);
        sendParams.branchId = this.getBranchChildNameList(sendParams.branchId);
        // if (obj.orderKey === undefined) {
        //     obj.orderKey = tableTitleList[0].field_name;
        //     obj.order = 'desc';
        //     this.setState({sortColumn:tableTitleList[0].field_name,sortType:'desc'})
        // }
        //校验为空
        if (this.checkFromNull(sendParams)) {
            this.reportList = await getReportDate({...sendParams,...obj,pageSize:CONSTANTS.report_default_page_size});
            if( this.reportList.reportData != undefined && this.reportList.reportData.data != undefined ){
                let reportData  = this.reportList.reportData;
                const {reportId:__reportId} = arg;
                this.prevInputData = sendParams;
                let reportDataSources = [];
                reportData.data.map((item,key)=>{
                    let list = {};
                    _.map(tableTitleList,(column)=>{
                        if (item[column.field_name]) {
                            list[column.field_name] = item[column.field_name];
                        }
                    })
                    reportDataSources.push({row_index:key+1,branch_name:item.branch_name,...list,key});
                })
                this.setState({reportDataSources,tableLoading:false,reportDataSourcesTotal:reportData.total});
            }else{
                this.setState({tableLoading:false});
            }
        }
    }

    getBranchChildNameList = list => {
        if( typeof list === "string" ){
            list = [list];
        }
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

    checkFromNull(sendParams){
        let flag = true;
        let check_null_list = [];
        let msg = '';
        if(this.isChild){
            check_null_list = ['branchId','startDate','endDate'];
            msg = '请选择日期和分支机构后再查询！';
        }else{
            check_null_list = ['branchId'];
            msg = '请选择分支机构后再查询！';
        }
        for (let i=0;i<check_null_list.length;i++){
            let v = sendParams[check_null_list[i]];
            if (v == '' || v == undefined || v == null || v.length == 0) {
                message.info(msg);
                this.setState({tableLoading:false})
                flag = false;
                break
            }
        }
        return flag
    }

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.exportParamsList);
        if (sendParams.indexId) sendParams.indexId = sendParams.indexId[0]==='all'?this.targetChildrenList.join(','): sendParams.indexId.join(',');
        const urlParams = $.param({...sendParams,exportType:e.key});

        // CONSTANTS.APP_BASE_URL
        // window.open('http://172.88.65.36:8885/jf'+'/jr_report/jsp/reportExp.jsp?'+urlParams);
        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();

        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj)) {
            if (this.isChild) {
                this.setState({tableLoading:true,childSortColumn:undefined,childSortType:undefined,tableCurrentPage:1});
                this.isSortAndList = {};   //重新查询的，去掉排序
                this.getChildReportDateFn({...returnData,reportId:'1301'});
            }else{
                this.setState({tableLoading:true,sortType:undefined,sortColumn:undefined,tableCurrentPage:1});
                //新表头列表
                let __filterTargetList = [];
                //如果指标列表改变，那么要重新计算表头列表
                if (!immutable.is(__nextObj.get('indexId'),__prevObj.get('indexId'))) {
                    let __showTarget = [];
                    if (returnData.indexId[0] == 'all') {
                        __showTarget = this.targetChildrenList;
                    }else{
                        __showTarget = returnData.indexId;
                    }
                    this.targetList.map((item,key)=>{
                        if (__showTarget.indexOf(item.index_id) >= 0) {
                            __filterTargetList.push(item);
                        }
                    })
                    this.defaultTargetList = __filterTargetList;
                }
                this.setState({tableLoading:true,sortColumn:this.defaultTargetList[0].field_name,sortType:'desc',tableCurrentPage:1});
                this.getReportDateFn(__filterTargetList.length==0?this.defaultTargetList:__filterTargetList,{...returnData,reportId:this.customercount_id_name_map[this.radioDefaultValue]});
            }
        }
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            sortColumn,
            sortType
        });
    }

    handlePaginationOnChange(page){
        this.setState({tableLoading:true,tableCurrentPage:page});
        this.getChildReportDateFn({...this.prevInputData,reportId:'1301'},{page,...this.isSortAndList});
    }

    handleChildSortColumn(childSortColumn, childSortType){
         this.setState({
            childSortColumn,
            childSortType,
            tableLoading:true
        });
        //在清空排序的时候也要把这个变量一并清空   ！！！ important
        this.isSortAndList = {orderKey:childSortColumn,order:childSortType};
        this.getChildReportDateFn({...this.prevInputData,reportId:'1301'},{...this.isSortAndList,page:this.state.tableCurrentPage});
    }

    getReportData() {
        const { reportDataSources, sortColumn, sortType } = this.state;
        if (sortColumn && sortType) {
            const sortArr = reportDataSources.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if(!isNaN(Number(x))){
                    x = Number(x);
                }else{
                    if (typeof x === 'object') {
                        x = Number(x.props.children);
                    }else if(['%','‰'].indexOf(x.substring(x.length-1)) > -1){
                        if (x.substring(0,1) === '-' && x.length === 1) {
                            x = 9999999999;
                        }else{
                            x = Number(x.substring(0,x.length-1));
                        }
                    }else{
                        x = x.charCodeAt();
                    }
                }

                if(!isNaN(Number(y))){
                    y = Number(y);
                }else{
                    if (typeof y === 'object') {
                        y = Number(y.props.children);
                    }else if(['%','‰'].indexOf(y.substring(y.length-1)) > -1){
                        if (y.substring(0,1) === '-' && y.length === 1) {
                            y = 9999999999;
                        }else{
                            y = Number(y.substring(0,y.length-1));
                        }
                    }else{
                        y = y.charCodeAt();
                    }
                }

                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
            //序号不变  1,2,3,4
            sortArr.map((item,key)=>{
                item.row_index = key + 1;
            })
            return sortArr
        }else{
            //序号不变  1,2,3,4
            reportDataSources.map((item,key)=>{
                item.row_index = key + 1;
            })
            return reportDataSources;
        }
    }

    getTable = (reportTitleList) => {
        if (this.isChild) {
            return (
                <div>
                    <Table
                        data={this.state.reportDataSources}
                        sortColumn={this.state.childSortColumn}
                        sortType={this.state.childSortType}
                        onSortColumn={this.handleChildSortColumn}
                        height={770}
                    >
                        {reportTitleList}
                    </Table><Pagination
                        current={this.state.tableCurrentPage}
                        pageSize={CONSTANTS.report_default_page_size}
                        total={this.state.reportDataSourcesTotal}
                        onChange={this.handlePaginationOnChange}
                    />
                </div>
            )
        }else{
            return (
                <div>
                    <Table
                        data={this.getReportData()}
                        sortColumn={this.state.sortColumn}
                        sortType={this.state.sortType}
                        onSortColumn={this.handleSortColumn}
                        height={770}
                    >
                        {reportTitleList}
                    </Table>
                </div>
            )
        }
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
                <RadioButton value="origin">开户情况统计报表</RadioButton>
                <RadioButton value="subquery">分支机构资产分段查询</RadioButton>
                <RadioButton value="serquery">融资融券日常业务统计</RadioButton>
            </RadioGroup>
        );

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            onDataChange={this.handleFilterContent}
        />;

        let reportTitleList = this.radioDefaultValue=='subquery'?[
            <Column align="center" width={50} key='row_index' resizable fixed width={70}>
                <HeaderCell>序号</HeaderCell>
                <Cell dataKey='row_index' />
            </Column>]:[
            <Column align="center" width={50} key='row_index' resizable fixed width={70}>
                <HeaderCell>序号</HeaderCell>
                <Cell dataKey='row_index' />
            </Column>,
            <Column align="center" key='branch_name' resizable fixed width={200}>
                <HeaderCell>营业部名称</HeaderCell>
                <Cell dataKey='branch_name' />
            </Column>
        ];
        this.state.targetList.map(item=>{
            reportTitleList.push(
                <Column align="center" key={item.index_id} resizable sortable width={200}>
                    <HeaderCell width={41}>{item.name}</HeaderCell>
                    <Cell dataKey={item.field_name} />
                </Column>
            )
        })
        const hasDate = this.state.reportDataSources.length>0;
        const isshowClass = this.isChild?'transaction_table_bb':'transaction_table_bb customercount_pagination'
        return (
            <div>
                <PanelContainer
                    hasFilter={<div> {filterContent} </div>}
                    title='客户统计报表'
                    hasTip={()=>{return this.returnTipTable(this.state.tipTableIndex)}} hasRadio={tableRadio}
                ><div className={isshowClass}>
                    <div className="management_pagination_bg"></div>
                    <JfCard title={this.state.reportTitle} loading={this.state.tableLoading}>
                        {hasDate?this.getTable(reportTitleList):<div className="ant-table-placeholder"><span><i className="anticon anticon-frown-o"></i>暂无数据</span></div>}
                    </JfCard>
                </div>
                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date[this.lastUpdateDateMap[this.radioDefaultValue]]}</div>
            </div>
        );
    }

}

module.exports = Customercount;
