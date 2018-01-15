import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,message,Modal} from 'antd';
import 'rsuite-table/lib/less/index.less';
import {PanelContainer,FilterController,JfCard,Table,Column, Cell, HeaderCell,TipTable,Tools} from 'app_common';
import {getReportDate,queryBranchList,queryTargetList,exportReportAPI} from '../../api';
import _ from 'underscore';
import $ from 'jquery';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import immutable from 'immutable';

require('es6-promise').polyfill();

export default class TransactionStatistics extends Component {
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
            moadlVisible:false,
            childReportDataSources:[],
            childReportTitle:'',
            tipTableIndex:'51'
        };

        this.radioOnChange = this.radioOnChange.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);
        this.onClickReportDesc = this.onClickReportDesc.bind(this);

        this.commonControllers = {
            start: {
                type: 'startDate',
                name: 'startDate',
                width: 4,
                label: '起始时间：',
                labelCol:'37%',
                wrapperCol:'63%'
            },
            end: {
                type: 'endDate',
                name: 'endDate',
                width: 4,
                label: '结束时间：',
                labelCol:'37%',
                wrapperCol:'63%'
            },
            day: {
                type: 'day',
                name: 'day',
                width: 5,
                label: '时间选择：',
                labelCol:'37%',
                wrapperCol:'63%'
            },
            week: {
                type: 'week',
                name: 'week',
                width: 5,
                label: '时间选择：',
                labelCol:'37%',
                wrapperCol:'63%'
            },
            month: {
                type: 'month',
                name: 'month',
                width: 5,
                label: '时间选择：',
                labelCol:'37%',
                wrapperCol:'63%'
            },
            year: {
                type: 'select',
                name: 'year',
                width: 5,
                label: '时间选择：',
                options: [],
                labelCol:'37%',
                wrapperCol:'63%',
                options:Tools.getYearOptions({
                    date:this.props.date.c_trade_statistics_yearly_01
                }),
            },
            branch: {
                type: 'treeSelect',
                name: 'branchId',
                width: 5,
                label: '分支机构：',
                placeholder: '请选择',
                className: 'ant-branch-left',
                treeData: this.state.treeNodeList,
                defaultValue:[],
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
                defaultValue:['all'],
                labelCol:'37%',
                wrapperCol:'63%'
            },
            queryBtn: {
                type: 'button',
                name: 'query',
                width: 2,
                label: '查询',
                className: 'ant-btn-primary',
                labelCol:'2%',
                wrapperCol:'98%',
                onClickBtn:this.clickQueryBtn.bind(this)
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
                labelCol:'2%',
                wrapperCol:'98%',
                width: 2,
                label: '导出',
                className: '',
                onClickBtn:this.exportReport.bind(this)
            }
        };

        this.radioDefaultValue = 'origin';
        this.branchChildrenList = {};
        this.targetChildrenList = [];
        this.transaction_id_name_map = CONSTANTS.transaction_id_name_map;
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.targetList = [];                 //指标列表
        this.defaultTargetList = [];

        this.tipTableIndexMap = {
            origin:'51',
            day:'52',
            week:'53',
            month:'54',
            year:'55'
        }
        this.lastUpdateDateMap = {
            origin:'c_trade_statistics_detail_01',
            day:'c_trade_statistics_daily_01',
            week:'c_trade_statistics_weekly_01',
            month:'c_trade_statistics_monthly_01',
            year:'c_trade_statistics_yearly_01'
        }
        this.reportRenderTime = {
            origin:0,
            day:0,
            week:0,
            month:0,
            year:0
        }
        this.paramsFormatRule = {
            origin:{
                startDate:'YYYY-MM-DD',
                endDate:'YYYY-MM-DD'
            },
            day:{
                day:'YYYY-MM-DD'
            },
            week:{
                week:'YYYY-MM-DD'
            },
            month:{
                month:'YYYY-MM'
            },
            year:{
                year:'YYYY'
            }
        }
    };

    async componentDidMount(){
        //获取分行分支机构列表
        const {branchList,childrenList} = await queryBranchList();
        this.branchChildrenList = childrenList;
        this.commonControllers.branch.treeData = branchList;
        this.commonControllers.branch.defaultValue = ['1000'];

        // // let lastUpdateTime = Number(this.props.date.c_trade_statistics_yearly_01.substring(0,4));
        // let yearOptions = [];
        // yearOptions = Tools.getYearOptions({
        //     date:this.props.date.c_trade_statistics_yearly_01,
        //     //size:10
        // });
        // // console.log(yearOptions);
        // // for (var i = 0; i < 10; i++) {
        // //     yearOptions.push({
        // //         label:lastUpdateTime+'年',
        // //         value:lastUpdateTime+''
        // //     })
        // //     lastUpdateTime =  --lastUpdateTime
        // // }
        // //this.commonControllers.year.options = yearOptions;
        this.filterReportFn();
    }

    async filterReportFn(reportId=this.transaction_id_name_map[this.radioDefaultValue]){
        const _this = this;
        //1. show loading
        this.setState({tableLoading:true})
        //2. 获取指标列表，转化出默认表头，指标的子节点，
        let __defaultTargetList = [];   //获取table表头信息

        if (['week','month','day','year'].indexOf(this.radioDefaultValue) < 0) {
            this.targetList = await queryTargetList({reportId});
            let __targetchildrenList = [];
            const __treeNodeList = this.targetList.map(item=>{   //转化树结构
                __targetchildrenList.push(item.index_id)
                __defaultTargetList.push(item);
                return {label:item.name,value:item.index_id}
            });
            this.targetChildrenList = __targetchildrenList;     //父节点和子节点的map关系
            //3. 配置筛选form的默认值，和相关配置（select-option）
            this.commonControllers.indicator.treeData = [{label:'全部',value:'all',key:'all',children:__treeNodeList}];
        }else{
            __defaultTargetList = CONSTANTS[`transaction_table_title_${this.radioDefaultValue}`];
        }
        this.defaultTargetList = __defaultTargetList;

        const commonControllers = this.getControllers(this.radioDefaultValue);
        //4. 渲染筛选from
        this.setState({commonControllers,sortColumn:__defaultTargetList[0].field_name,sortType:'desc'});
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
        this.getReportDateFn(__defaultTargetList,sendParams);
    }

    async getReportDateFn(tableTitleList,arg){
        //获取表内容
        const sendParams = _.extend({},arg);
        sendParams.branchId = this.getBranchChildNameList(sendParams.branchId);
        if (sendParams.indexId) sendParams.indexId = sendParams.indexId[0] === 'all'?this.targetChildrenList:sendParams.indexId;
        sendParams.reportId = this.transaction_id_name_map[this.radioDefaultValue];
        // if (this.checkFromNull(sendParams,this.reportRenderTime[this.radioDefaultValue] === 0)) {
            let resData = await getReportDate(sendParams);
            const {reportData,params:filterData} = resData;
            // reportData = res.reportData;
            // this.prevInputData = arg;
            let reportDataSources = [];
            const _check_list = CONSTANTS.transaction_has_stream_column_name_map[this.radioDefaultValue] || [];
            // let ___data = [];
            // if (this.radioDefaultValue == 'origin') {
            //     ___data = this.reportList.reportData;
            // }else {
            //     ___data = this.reportList;
            // }
            reportData.map((item,key)=>{
                let list = {};
                _.map(tableTitleList,(column)=>{
                    if (_check_list.indexOf(column.field_name) > -1) {
                        list[column.field_name] = <span className='coop-dev-branch-list' onClick={()=>{this.onClickReportDesc(column.field_name,item)}}>{item[column.field_name]}</span>
                    }else{
                        list[column.field_name] = item[column.field_name];
                    }
                })
                reportDataSources.push({row_index:key+1,branch_name:item.branch_name,...list,key});
            })
            // let defaultControllerData = {};
            // let startDate = res.params.startDate;
            // let endDate = res.params.endDate;
            // if(startDate){
            //     startDate = moment(startDate,'YYYYMMDD');
            // }
            // if(endDate){
            //     endDate = moment(endDate,'YYYYMMDD');
            // }
            // switch (this.radioDefaultValue) {
            //     case 'origin':
            //         defaultControllerData = {...arg,startDate,endDate};
            //         break;
            //     case 'day':
            //         let day = endDate;
            //         defaultControllerData = {...arg,day};
            //         break;
            //     case 'week':
            //         let week = endDate;
            //         defaultControllerData = {...arg,week};
            //         break;
            //     case 'month':
            //         let month = endDate;
            //         defaultControllerData = {...arg,month};
            //         break;
            //     case 'year':
            //         let year = res.params.endDate;
            //         defaultControllerData = {...arg,year};
            //         break;
            //     default:;
            // }
            // this.prevInputData = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数

            //如果报表第一次渲染，包括切换radio，筛选条件要重新set value
            if (this.reportRenderTime[this.radioDefaultValue] === 0) {
                this.prevInputData = this.refs.filterController.setControllerData(this.wrapCtrlParams(filterData),true);
            }else {
                this.prevInputData = arg;
            }
            //对应报表的渲染次数
            this.reportRenderTime[this.radioDefaultValue]++;
            const reportTitle = this.formatReportTitle({startDate:filterData.startDate,endDate:filterData.endDate});
            //如果在渲染页面时切换radio,则不渲染这次请求
            if (this.transaction_id_name_map[this.radioDefaultValue] === sendParams.reportId) {
                this.setState({targetList:tableTitleList,reportDataSources,reportTitle,tableLoading:false});
            }
        // }
    }

    formatDate(date){
        if(date.length==8) return `${date.substring(0,4)}.${date.substring(4,6)}.${date.substring(6,8)}`
        else if (date.length==6) return `${date.substring(0,4)}年${date.substring(4,6)}月`
        else if (date.length==4) return `${date.substring(0,4)}年`
        return date
    }

    formatReportTitle(params){
        const {startDate,endDate} = params;
        if (['origin','week'].indexOf(this.radioDefaultValue) >= 0) return `${CONSTANTS.transaction_report_title_map[this.radioDefaultValue]}（${this.formatDate(startDate)}-${this.formatDate(endDate)}）`
        return `${CONSTANTS.transaction_report_title_map[this.radioDefaultValue]}（${this.formatDate(endDate)}）`
    }

    onClickReportDesc(name,data){
        let {title:childReportTitle,data:_child_data} = CONSTANTS[`transaction_table_title_${this.radioDefaultValue}_child_${name}`];
        const childReportDataSources = _child_data.map((item,key)=>{
            return {
                indexDesc:item.name,
                indexInfo:data[item.dataIndex],
                indexId:key,
                blank:item.blank
            }
        })
        this.setState({moadlVisible:true,childReportTitle,childReportDataSources})
    }

    wrapCtrlParams(params){
        let returnParams = {};
        _.map(this.paramsFormatRule[this.radioDefaultValue],(v,k)=>{
            // const key = ['day','week','month'].indexOf(this.radioDefaultValue) > -1?'endDate':k;
            if (['day','week','month'].indexOf(this.radioDefaultValue) > -1) {
                returnParams[k] = moment(params.endDate,v);
            }else if (this.radioDefaultValue === 'year') {
                returnParams[k] = params.endDate;
            }else{
                returnParams[k] = moment(params[k],v);
            }
        })
        return returnParams
    }

    checkFromNull(sendParams,returnTrue){
        let flag = true;
        if (!returnTrue) {
            let check_null_list = [];
            if(['origin','week'].indexOf(this.radioDefaultValue)>-1){
                check_null_list = ['branchId','startDate','endDate'];
            }else{
                check_null_list = ['endDate','branchId'];
            }
            for (let i=0;i<check_null_list.length;i++){
                let v = sendParams[check_null_list[i]];
                if (v == '' || v == undefined || v == null || v.length == 0) {
                    if (check_null_list[i] === 'branchId') {
                        message.info('请选择分支机构后再查询！');
                    }else {
                        message.info('请选择日期后再查询！');
                    }
                    this.setState({tableLoading:false})
                    flag = false;
                    break
                }
            }
        }
        return flag
    }

    radioOnChange(e) {
        this.prevInputData = {};    //上次的筛选条件，重置，很重要！！！
        this.radioDefaultValue = e.target.value;
        this.reportRenderTime[this.radioDefaultValue] = 0;  //切换radio时,对应报表的渲染次数重置
        this.setState({
            tableLoading:true,
            tipTableIndex:this.tipTableIndexMap[e.target.value],
            reportDataSources:[],
            sortColumn:undefined,
            sortType:undefined
        })
        this.filterReportFn(this.transaction_id_name_map[this.radioDefaultValue]);
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

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.prevInputData);
        sendParams.branchId = this.getBranchChildNameList(sendParams.branchId);
        if (sendParams.indexId) sendParams.indexId = sendParams.indexId[0] === 'all'?this.targetChildrenList.join(','):sendParams.indexId.join(',');
        sendParams.reportId = this.transaction_id_name_map[this.radioDefaultValue];
        const urlParams = $.param({...sendParams,exportType:e.key});

        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();
        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj) && this.checkFromNull(returnData,this.reportRenderTime[this.radioDefaultValue] === 0)) {
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
            this.getReportDateFn(__filterTargetList.length==0?this.defaultTargetList:__filterTargetList,returnData);
        }
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
                        {...commonControllers.start,labelCol:'43%',wrapperCol:'57%'},
                        {...commonControllers.end,labelCol:'43%',wrapperCol:'57%'},
                        {...commonControllers.branch,labelCol:'35%',wrapperCol:'65%'},
                        {...commonControllers.indicator,labelCol:'35%',wrapperCol:'65%'},
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'day':
                controllers = [
                    [
                        commonControllers.day,
                        commonControllers.branch,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'week':
                controllers = [
                    [
                        commonControllers.week,
                        commonControllers.branch,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'month':
                controllers = [
                    [
                        commonControllers.month,
                        commonControllers.branch,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'year':
                controllers = [
                    [
                        commonControllers.year,
                        commonControllers.branch,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];
                break;
            default:;
        }

        return controllers;
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            sortColumn,
            sortType
        });
    }

    hideModal(){
        this.setState({moadlVisible:false});
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

    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }

    render() {
        const tableRadio = (
            <RadioGroup onChange={this.radioOnChange} defaultValue={this.radioDefaultValue} size='large' >
                <RadioButton value="origin" >交易统计原始日报</RadioButton>
                <RadioButton value="day">分支机构统计日报</RadioButton>
                <RadioButton value="week">分支机构统计周报</RadioButton>
                <RadioButton value="month">分支机构统计月报</RadioButton>
                <RadioButton value="year">分支机构统计年报</RadioButton>
            </RadioGroup>
        );

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
        />;

        let reportTitleList = [
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
        return (
            <div>
                <PanelContainer
                    hasFilter={<div> {filterContent} </div>}
                    title='交易统计报表'
                    hasRadio={tableRadio}
                    hasTip={()=>{return this.returnTipTable(this.state.tipTableIndex)}}
                ><div className="transaction_table_bb customercount_pagination">
                    <div className="management_pagination_bg"></div>
                    <JfCard title={this.state.reportTitle} loading={this.state.tableLoading}>
                        {hasDate?<div><Table
                            data={this.getReportData()}
                            sortColumn={this.state.sortColumn}
                            sortType={this.state.sortType}
                            onSortColumn={this.handleSortColumn}
                            height={770}
                        >
                            {reportTitleList}
                        </Table></div>:<div className="ant-table-placeholder"><span><i className="anticon anticon-frown-o"></i>暂无数据</span></div>}
                    </JfCard>
                </div>
                </PanelContainer>{
                    this.state.moadlVisible?<Modal
                    title={this.state.childReportTitle}
                    visible={this.state.moadlVisible}
                    footer={null}
                    onCancel={this.hideModal}
                >
                    <div>
                        <TipTable info={this.state.childReportDataSources} />
                    </div>
                </Modal>:undefined }
                <div className='layout-footer'>本页数据更新至{this.props.date[this.lastUpdateDateMap[this.radioDefaultValue]]}</div>
            </div>
        );
    }

}

module.exports = TransactionStatistics;
