import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {message,Table} from 'antd';
import {PanelContainer,FilterController,JfCard,TipTable,Tools} from 'app_common';
import {getBusinessReport,queryTargetList,exportReportAPI,
    getBusinessProdCode,queryBranchList,queryCustomerName,queryCustomerNumberList} from '../../api';
import _ from 'underscore';
import moment from 'moment';

import CONSTANTS from 'app_constants';
import immutable from 'immutable';
import $ from 'jquery';

require('es6-promise').polyfill();

export default class Analysis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // targetList:[],
            reportDataSources:[],
            commonControllers:[],
            tableCurrentPage:1,
            reportDataSourcesTotal:0,
            // sortType:undefined,
            // sortColumn:undefined,
            tableLoading:false,
            reportTitle:''
        };

        this.handlePaginationOnChange= this.handlePaginationOnChange.bind(this);

        this.commonControllers = {
            start: {
                type: 'startDate',
                name: 'startDate',
                width: 5,
                label: '统计开始日期：',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_business_01,
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
                label: '统计结束日期：',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_business_01,
                    formart:'YYYY-MM-DD',
                }),
                labelCol:'48%',
                wrapperCol:'52%'
            },
            productid: {
                type: 'tagSelect',
                name: 'prodCode',
                placeholder: '请选择',
                width:4,
                label: '产品编号:',
                labelCol:'42%',
                wrapperCol:'58%',
                options: [],
                defaultValue:''
            },
            indicator: {
                type: 'select',
                name: 'indexId-1',
                width: 9,
                label: '指标筛选：',
                className: 'ant-branch-left',
                options: [],
                placeholder: '请选择',
                defaultValue:'',
                labelCol:'25.5%',
                wrapperCol:'74%'
            },
            inputstart: {
                type: 'input',
                name: 'inputstart-1',
                placeholder:'输入资金',
                width: 3,
                label: '从',
                labelCol:'20%',
                wrapperCol:'80%',
                defaultValue:'',
                checkInput:true
            },
            inputend: {
                type: 'input',
                name: 'inputend-1',
                placeholder:'输入资金',
                width: 3,
                label: '到',
                labelCol:'20%',
                wrapperCol:'80%',
                defaultValue:'',
                checkInput:true
            },
            branchNo: {
                type: 'treeSelect',
                name: 'branchId',
                width: 5,
                label: '营业部名称：',
                placeholder: '请选择',
                className: 'ant-branch-left',
                treeData: [],
                defaultValue:[],
                labelCol:'43%',
                wrapperCol:'57%'
            },
            customerid: {
                type: 'searchSelect',
                name: 'customerNo',
                placeholder:'输入客户号',
                width: 5,
                label: '客户ID:',
                labelCol:'26%',
                wrapperCol:'65%'
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
                width: 1,
                label: '导出',
                className: '',
                onClickBtn:this.exportReport.bind(this)
            },
            addBtn: {
                type: 'button',
                name: 'query',
                width: 3,
                label: '+',
                className: 'ant-btn-primary analysis_add_btn',
                style:{width:40},
                labelCol:'2%',
                wrapperCol:'98%',
                onClickBtn:this.clickAddBtn.bind(this)
            },
            delBtn: {
                type: 'button',
                name: 'del',
                width: 3,
                label: '×',
                className: 'ant-btn-danger',
                style:{width:40},
                labelCol:'2%',
                wrapperCol:'98%',
                value:'',
                onClickBtn:this.clickDelBtn.bind(this)
            },
        };

        this.reportId = '18';                 //报表ID
        this.ctrlList = [];
        this.branchChildrenList = {};         //分支机构父节点与子节点对应的集合
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.targetNameIdMap = {};
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.indexKey = 2;
    };

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

    //  处理客户ID搜索
    async handleSearchSelect(value,CB){
        const customerList = await queryCustomerNumberList({searchKeyword:value});
        let __list = customerList.length>20?customerList.slice(0,20):customerList;
        const __cb_list = __list.map(b=>{
            let {cust_no,customer} = b;
            const __flagIndex = customer.indexOf('|');
            let show_text = null;
            if (customer.indexOf(value) == 0) {
                show_text = <span><span style={{color:'red'}}>{value}</span>{customer.substring(value.length,customer.length)}</span>
            }else{
                show_text = <span>{customer.substring(0,__flagIndex+2)}<span style={{color:'red'}}>{value}</span>{customer.substring(value.length+__flagIndex+2,customer.length)}</span>
            }
            return {
                value:cust_no,
                text:<span>{show_text}</span>,
                noHighLight:customer
            }
        })
        CB(__cb_list);
    }

    getControllers() {
        const commonControllers = this.commonControllers;
        const controllers = [
            [
                commonControllers.start,
                commonControllers.end,
                commonControllers.productid,
                commonControllers.branchNo,
                commonControllers.customerid,
                commonControllers.queryBtn,
                commonControllers.exportBtn

            ],
            [
                commonControllers.indicator,
                commonControllers.inputstart,
                commonControllers.inputend,
                {...commonControllers.delBtn,value:1},
                commonControllers.addBtn,

            ]
        ];
        return controllers;
    }

    async componentDidMount(){

        //获取指标
        const targetList = await queryTargetList({reportId:this.reportId});
        let indicatorOptions = targetList.map(item=>{
            this.targetNameIdMap[item.index_id] = item.field_name;
            return {label:item.name,value:item.index_id}
        });
        this.commonControllers.indicator.options = indicatorOptions;

        //获取产品编号
        const codeList = await getBusinessProdCode();
        this.commonControllers.productid.options = codeList.map(item=>({value:item.prod_code,label:item.prod_code}));
        this.commonControllers.productid.defaultValue = [codeList[0].prod_code];

        //营业部
        const {branchList,childrenList} = await queryBranchList();
        this.branchChildrenList = childrenList;
        this.commonControllers.branchNo.treeData = branchList;
        this.commonControllers.branchNo.defaultValue = ['1000'];
        //客户id
        const customerNameList = await queryCustomerName();
        const options = customerNameList.map(item=>({
            label:item.customer,
            value:item.cust_no
        }))
        this.commonControllers.customerid.options = options;

        //获取ctrl
        // this.ctrlList = this.getControllers();
        // this.setState({commonControllers:this.ctrlList});
        this.filterReportFn();
    }

    async filterReportFn(reportId=this.reportId){
        //1. show loading
        //2. 获取指标列表，转化出默认表头，指标的子节点，
        //3. 配置筛选form的默认值，和相关配置（select-option）
        this.ctrlList = this.getControllers();
        //4. 渲染筛选from
        this.setState({commonControllers:this.ctrlList,tableLoading:true});
        //5. 给筛选from设置默认值，并拿到转化后的参数，用默认的筛选条件第一次请求报表接口
        let defaultControllerData = {};
        this.ctrlList.map(item=>{   //获取筛选条件默认参数集合
            item.map(item_in=>{
                if (item_in.defaultValue != undefined) {
                    defaultControllerData[item_in.name] = item_in.defaultValue;
                }
            })
        })
        const sendParams = this.refs.filterController.setControllerData(defaultControllerData);   //set默认值 并到格式化参数
        //6. 把这一次的参数设置为上次一使用的参数，用于下次切换筛选条件后的查询，如果和一样，则不进行查询，还用于报表的筛选和翻页
        const params = this.warpSendParams(sendParams);
        if(params){
            this.prevInputData = params;
            //7. 最后把默认表头和参数列表给到请求报表FN（如果没有指标就不传，会有默认表头）
            this.getReportDateFn(params);
        }
    }

    async getReportDateFn(params){
        if (this.checkFromNull(params)) {
            //请求接口数据
            let branchId = this.getBranchChildNameList(params.branchId);
            const sendParams = {...params,branchId};
            const reportList = await getBusinessReport(sendParams);
            //配置报表数据
            const reportDataSources = reportList.data.map((item,key)=>{
                item.key = key;
                item.index = key+1;
                return item
            })
            const reportTitle = this.formatReportTitle(params.startDate,params.endDate)
            this.prevInputData = params;
            //渲染报表
            this.setState({reportDataSources,tableLoading:false,reportDataSourcesTotal:reportList.total,reportTitle});
        }
    }

    checkFromNull(sendParams){
        let flag = true;
        for (let k in sendParams) {
            if(k!=='customerNo'&&k!=='index'){
                let v = sendParams[k];
                if (v === '' || v === undefined || v === null || v.length === 0) {
                    message.info('请填写完整后再查询！');
                    this.setState({tableLoading:false})
                    flag = false;
                    break
                }
            }
        }
        return flag
    }

    clickAddBtn(){
        const commonControllers = this.commonControllers;
        let returnData = this.refs.filterController.getControllerData();
        let lastKey = this.ctrlList[this.ctrlList.length-1][0].name;
        if(!returnData[lastKey]){
            return;
        }
        const addCtrl = [
            {...commonControllers.indicator,name:`indexId-${this.indexKey}`},
            {...commonControllers.inputstart,name:`inputstart-${this.indexKey}`,defaultValue:''},
            {...commonControllers.inputend,name:`inputend-${this.indexKey}`,defaultValue:''},
            {...commonControllers.delBtn,value:this.indexKey},
            commonControllers.addBtn
        ];
        this.ctrlList[this.ctrlList.length-1].splice(4);
        this.ctrlList.push(addCtrl);
        this.setState({commonControllers:this.ctrlList});
        this.indexKey +=1;
    }

    clickDelBtn(e){
        let delIndex = e.target.value;
        let commonControllers = this.state.commonControllers;
        if(commonControllers.length===2){
            let returnData = this.refs.filterController.getControllerData();
            for(let key in returnData){
                switch (key) {
                    case 'startDate':
                        returnData.startDate = moment(returnData.startDate,'YYYYMMDD');
                        break;
                    case 'endDate':
                        returnData.endDate = moment(returnData.endDate,'YYYYMMDD');
                        break;
                    case 'customerNo':
                        returnData.customerNo = returnData.customerNo.split(',');
                        break;
                    case 'prodCode':
                        returnData.prodCode = returnData.prodCode.split(',');
                        break;
                    default:
                        if(key.indexOf('index') > -1){
                            returnData[key] = '';
                            const addChart = key.split('-')[1];
                            returnData[`inputstart-${addChart}`] = '';
                            returnData[`inputend-${addChart}`] = '';
                        }
                }
            }
            this.refs.filterController.setControllerData(returnData);
        }
        else {
            this.ctrlList = commonControllers.filter((row)=>{
                return row[3].name!=='del'||(row[3].value+'')!==delIndex;
            });
            this.ctrlList[this.ctrlList.length-1][4] = this.commonControllers.addBtn;
            this.setState({commonControllers:this.ctrlList});
        }
    }

    formatDate(date){
        return `${date.substring(0,4)}.${date.substring(4,6)}.${date.substring(6,8)}`
    }

    formatReportTitle(startDate,endDate){
        return `签约客户资金变动情况（${this.formatDate(startDate)}-${this.formatDate(endDate)}）`
    }

    warpSendParams(params){
        let index = []
        let indexNameList = [];
        for(let i=1;i<this.ctrlList.length;i++){
            indexNameList.push(this.ctrlList[i][0].name);
        }
        let isCompelete = true;
        _.map(params,(value,key)=>{
            if (indexNameList.indexOf(key)>-1) {
                const addChart = key.indexOf('-')<=-1?'':'-'+key.split('-')[1];
                if(value){
                    let start = params[`inputstart${addChart}`];
                    let end = params[`inputend${addChart}`];
                    if(start&&end){
                        index.push(
                            {
                                name:this.targetNameIdMap[value],
                                from:parseFloat(start),
                                to:parseFloat(end)
                            }
                        );
                    }
                    else {
                        isCompelete = false;
                    }
                }
            }
        })
        if(!isCompelete){
            message.error('资金范围未填写完整！');
            return false;
        }
        const {startDate,endDate,prodCode,branchId,customerNo} = params;
        return {startDate,endDate,prodCode,branchId,customerNo,
            reportId:this.reportId,
            pageSize:CONSTANTS.report_default_page_size,
            page:this.state.tableCurrentPage,index}
    }

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.prevInputData);
        sendParams.reportId = '18';
        const {page,pageSize,...elseobj} = sendParams;
        elseobj.index = JSON.stringify(elseobj.index);
        elseobj.branchId = this.getBranchChildNameList(elseobj.branchId);
        const urlParams = $.param({...elseobj,exportType:e.key});

        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        let returnData = this.refs.filterController.getControllerData();
        let __prevObj = immutable.fromJS(this.prevInputData);
        let params = this.warpSendParams(returnData);
        if(params){
            let __nextObj = immutable.fromJS(params);
            //如果筛选条件一样不需要重新渲染
            if (!immutable.is(__prevObj,__nextObj)) {
                this.setState({tableLoading:true});
                this.getReportDateFn(params);
            }
        }
    }

    handlePaginationOnChange(page){
        this.setState({tableLoading:true,tableCurrentPage:page});
        const params = {...this.prevInputData,page};
        this.getReportDateFn(params);
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
            handleSearchSelect={this.handleSearchSelect}
        />;

        const hasDate = this.state.reportDataSources.length>0;

        return (
            <div>
                <PanelContainer
                    hasFilter={<div className="analysis_sx"> {filterContent} </div>}
                    title='签约客户分析'
                    hasTip={()=>{return this.returnTipTable('76')}}
                >

                    <div className="transaction_table_bb analysis_table assets_table ">
                    <div className="management_pagination_bg"></div>
                    <JfCard title={
                        <div>
                        <span>{this.state.reportTitle}</span>
                        <span className="pull-right">单位：万元</span>
                        </div>} loading={this.state.tableLoading}>
                        {hasDate?<Table
                            columns={CONSTANTS.analysis_table_title}
                            scroll={{ x: 1500 }}
                            dataSource={this.state.reportDataSources}
                            pagination={{
                                current:this.state.tableCurrentPage,
                                pageSize:CONSTANTS.report_default_page_size,
                                total:this.state.reportDataSourcesTotal,
                                onChange:this.handlePaginationOnChange
                            }}
                        >
                        </Table>:<div className="ant-table-placeholder"><span><i className="anticon anticon-frown-o"></i>暂无数据</span></div>}
                    </JfCard>
                    </div>

                </PanelContainer>
                <div className='layout-footer'>本页数据更新至{this.props.date.c_cashclient_business_01}</div>
            </div>
        );
    }

}

module.exports = Analysis;
