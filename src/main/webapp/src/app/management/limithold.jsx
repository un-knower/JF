import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Radio,message,Pagination} from 'antd';
import 'rsuite-table/lib/less/index.less';
import {PanelContainer,FilterController,JfCard,Table,Column, Cell, HeaderCell,TipTable} from 'app_common';
import {queryBranchList,querySecurityNumberList,queryStockAccountList,getReportDate} from '../../api';
import _ from 'underscore';
import $ from 'jquery';
import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import CONSTANTS from 'app_constants';
import immutable from 'immutable';

require('es6-promise').polyfill();

export default class Limithold extends Component {
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
            tipTableIndex:'61'
        };

        this.commonControllers = {
            startDate: {
                type: 'startDate',
                name: 'startDate',
                width: 5,
                label: '统计起始时间：',
                labelCol:'48%',
                wrapperCol:'52%'
            },
            endDate: {
                type: 'endDate',
                name: 'endDate',
                width: 5,
                label: '统计结束时间：',
                labelCol:'48%',
                wrapperCol:'52%'
            },
            market: {
                type: 'tagSelect',
                name: 'exchangeType',
                width: 5,
                label: '市场：',
                options: [
                    {
                        label: '上海',
                        value: '1'
                    }, {
                        label: '深圳',
                        value: '2'
                    }, {
                        label: '新三板',
                        value: '9'
                    }
                ],
                defaultValue:['1','2','9'],
                labelCol:'37%',
                wrapperCol:'63%'
            },
            branchNo: {
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
            customerNo: {
                type: 'customSelect',
                name: 'customerNo',
                width: 5,
                label: '客户号：',
                placeholder: '输入客户号',
                labelCol:'47%',
                wrapperCol:'53%'
            },
            securitiesAccount: {
                type: 'inputSelect',
                name: 'stockAccount',
                width: 5,
                label: '证券账号：',
                labelCol:'47%',
                wrapperCol:'53%',
                placeholder: '输入证券账户号'
            },
            securitiesName: {
                type: 'searchSelect',
                name: 'secuCode',
                width: 10,
                label: '证券搜索：',
                placeholder: '输入证券代码/证券名称',
                className: 'ant-btn-primary'
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

        this.radioDefaultValue = 'stream';    //默认radio 值
        this.branchChildrenList = {};         //分支机构父节点与子节点对应的集合
        this.limithold_id_name_map = CONSTANTS.limithold_id_name_map;
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.reportList = [];                 //查询回来的报表列表
        this.isSortAndList = {};              //判断是否排过序，并且把排序后的参数存进来


        this.tipTableIndexMap = {
            stream:'61',
            store:'62'
        };

        this.lastUpdateDateMap = {
            stream:'c_restricted_statistics_01',
            store:'c_restricted_statistics_01'
        };


        this.radioOnChange = this.radioOnChange.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);                 //排序
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.customSelectOnChange = this.customSelectOnChange.bind(this);
        this.handlePaginationOnChange = this.handlePaginationOnChange.bind(this);
    };

    getControllers(reportType) {
        let controllers = [
            []
        ];
        let commonControllers = this.commonControllers;
        switch (reportType) {
            case 'stream':
                controllers = [
                    [
                        commonControllers.startDate,
                        commonControllers.endDate,
                        commonControllers.market,
                        commonControllers.branchNo,
                        commonControllers.queryBtn
                    ],
                    [
                        commonControllers.customerNo,
                        {...commonControllers.securitiesAccount},
                        {...commonControllers.securitiesName,labelCol:'18%',wrapperCol:'82%'},
                        commonControllers.exportBtn
                    ]
                ];
                break;
            case 'store':
                controllers = [
                    [
                        commonControllers.startDate,
                        commonControllers.endDate,
                        {...commonControllers.customerNo,width:4,labelCol:'42%',wrapperCol:'58%'},
                        {...commonControllers.securitiesAccount,width:4},
                        {...commonControllers.market,width:3,labelCol:'36%',wrapperCol:'64%'},
                        {...commonControllers.queryBtn,width:2,labelCol:'0%',wrapperCol:'100%'},
                    ],
                    [
                        {...commonControllers.startDate,name:'startDate1',label:'开户起始时间：',disableIndex:'1'},
                        {...commonControllers.endDate,name:'endDate1',label:'开户结束时间：',disableIndex:'1'},
                        {...commonControllers.branchNo,width:4,labelCol:'43%',wrapperCol:'57%'},
                        {...commonControllers.securitiesName,width:7,labelCol:'25%',wrapperCol:'75%'},
                        {...commonControllers.exportBtn,labelCol:'0%',wrapperCol:'100%'}
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
        this.branchChildrenList = childrenList;
        this.commonControllers.branchNo.treeData = branchList;
        this.commonControllers.branchNo.defaultValue = ['1000'];
        this.filterReportFn();
    }

    async filterReportFn(reportId=this.limithold_id_name_map[this.radioDefaultValue]){
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
        this.prevInputData = sendParams;
        //7. 最后把默认表头和参数列表给到请求报表FN（如果没有指标就不传，会有默认表头）
        this.getReportDateFn(sendParams);
    }

    customSelectOnChange(value,CB){
        queryStockAccountList({customerNo:value.join(',')}).then(res=>{
            CB(res)
        })
    }

    //  处理证券搜索
    async handleSearchSelect(value,CB){
        const securityList = await querySecurityNumberList({searchKeyword:value});
        let __list = securityList.length>20?securityList.slice(0,20):securityList;
        const __cb_list = __list.map(b=>{
            let {stock_code,stock_name} = b;
            const __flagIndex = stock_name.indexOf('|');
            let show_text = null;
            if (stock_name.indexOf(value) == 0) {
                show_text = <span><span style={{color:'red'}}>{value}</span>{stock_name.substring(value.length,stock_name.length)}</span>
            }else{
                show_text = <span>{stock_name.substring(0,__flagIndex+2)}<span style={{color:'red'}}>{value}</span>{stock_name.substring(value.length+__flagIndex+2,stock_name.length)}</span>
            }
            return {
                value:stock_code,
                text:<span>{show_text}</span>,
                noHighLight:stock_name
            }
        })
        CB(__cb_list);
    }

    radioOnChange(e) {
        this.prevInputData = {};    //上次的筛选条件，重置，很重要！！！
        this.radioDefaultValue = e.target.value;
        this.setState({
            tableLoading:true,
            tableCurrentPage:1,
            reportDataSources:[],
            sortType:undefined,
            sortColumn:undefined,
            tipTableIndex:this.tipTableIndexMap[e.target.value]
        })
        this.refs.filterController.resetSelectSearch();
        this.filterReportFn(this.limithold_id_name_map[this.radioDefaultValue]);
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

    handlePaginationOnChange(page){
        this.setState({tableLoading:true,tableCurrentPage:page});
        this.getReportDateFn(this.prevInputData,{page,...this.isSortAndList});
    }

    checkFromNull(sendParams){
        let flag = true;
        const check_null_list = ['branchId'];
        for (let i=0;i<check_null_list.length;i++){
            let v = sendParams[check_null_list[i]];
            if (v == '' || v == undefined || v == null || v.length == 0) {
                message.info('请选择分支机构后再查询！');
                this.setState({tableLoading:false})
                flag = false;
                break
            }
        }
        return flag
    }

    async getReportDateFn(arg,obj={page:'1'}){
        //获取表头列表
        const tableTitleList = CONSTANTS[`limithold_table_title_${this.radioDefaultValue}`];
        //获取表内容
        const sendParams = _.extend({},arg);
        sendParams.branchId = this.getBranchChildNameList(sendParams.branchId);
        sendParams.reportId = this.limithold_id_name_map[this.radioDefaultValue];
        if (obj.orderKey === undefined) {
            obj.orderKey = tableTitleList[0].field_name;
            obj.order = 'desc';
            this.setState({sortColumn:tableTitleList[0].field_name,sortType:'desc'})
        }
        //校验为空
        if (this.checkFromNull(sendParams)) {
            let res = await getReportDate({...sendParams,...obj,pageSize:CONSTANTS.report_default_page_size});
            this.reportList = res.reportData;
            this.prevInputData = arg;

            let reportDataSources = [];
            this.reportList.data.map((item,key)=>{
                let list = {};
                _.map(tableTitleList,(column)=>{
                    if (item[column.field_name]) {
                        list[column.field_name] = item[column.field_name]
                    }
                })
                reportDataSources.push({row_index:key+1,branch_name:item.branch_name,...list,key});
            })
            let dates = {};
            switch (this.radioDefaultValue) {
                case 'stream':
                    dates.startDate = moment(res.params.startDate,'YYYYMMDD');
                    dates.endDate = moment(res.params.endDate,'YYYYMMDD');
                    break;
                case 'store':
                    dates.startDate = moment(res.params.startDate,'YYYYMMDD');
                    dates.endDate = moment(res.params.endDate,'YYYYMMDD');
                    dates.startDate1 = moment(res.params.startDate1,'YYYYMMDD');
                    dates.endDate1 = moment(res.params.endDate1,'YYYYMMDD');
                    break;
                default:;
            }
            let exchangeType = arg.exchangeType.split(',');
            let defaultControllerData = {...arg,...dates,exchangeType};
            this.prevInputData = this.refs.filterController.setControllerData(defaultControllerData);
            const reportTitle = this.formatReportTitle({startDate:res.params.startDate,endDate:res.params.endDate});
            //如果在渲染页面时切换radio,则不渲染这次请求
            if (this.limithold_id_name_map[this.radioDefaultValue] === sendParams.reportId) {
                this.setState({targetList:tableTitleList,reportDataSources,reportTitle,tableLoading:false,reportDataSourcesTotal:this.reportList.total});
            }
        }
    }

    formatDate(date){
        if(date.length==8) return `${date.substring(0,4)}.${date.substring(4,6)}.${date.substring(6,8)}`
        else if (date.length==6) return `${date.substring(0,4)}年${date.substring(4,6)}月`
        else if (date.length==4) return `${date.substring(0,4)}年`
        return date
    }

    formatReportTitle(params){
        const {startDate,endDate} = params;
        return `${CONSTANTS.limithold_report_title_map[this.radioDefaultValue]}（${this.formatDate(startDate)}-${this.formatDate(endDate)}）`
        // return `${CONSTANTS.limithold_report_title_map[this.radioDefaultValue]}（${this.formatDate(this.radioDefaultValue=='year'?startDate.substring(0,4):this.radioDefaultValue=='month'?startDate.substring(0,6):startDate)}）`
    }

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.prevInputData);
        sendParams.branchId = this.getBranchChildNameList(sendParams.branchId);
        sendParams.reportId = this.limithold_id_name_map[this.radioDefaultValue];
        const urlParams = $.param({...sendParams,exportType:e.key});

        // CONSTANTS.APP_BASE_URL
        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
        // window.open('http://172.88.65.36:8885/jf'+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();
        console.log(returnData);
        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj)) {
            this.setState({tableLoading:true,sortType:undefined,sortColumn:undefined,tableCurrentPage:1});
            this.isSortAndList = {};   //重新查询的，去掉排序
            this.getReportDateFn(returnData);
        }
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
    returnTipTable(tag){
        const category = CONSTANTS.TARGETTIPLIST.category;
        const desc = CONSTANTS.TARGETTIPLIST.index;
        const info = category[tag].index.map(key=>desc[key]);
        return <TipTable info={info} />
    }
    render() {
        const tableRadio = (
            <RadioGroup onChange={this.radioOnChange} defaultValue={this.radioDefaultValue} size='large'>
                <RadioButton value="stream">限售非流通股份变动流水</RadioButton>
                <RadioButton value="store">限售非流通股份持仓</RadioButton>
            </RadioGroup>
        );

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
            handleSearchSelect={this.handleSearchSelect}
            customSelectOnChange={this.customSelectOnChange}
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
                <Column align="center" key={item.index_id} resizable sortable width={170}>
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
                    title='限售持仓报表'
                    hasTip={()=>{return this.returnTipTable(this.state.tipTableIndex)}}  hasRadio={tableRadio}
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
                <div className='layout-footer'>本页数据更新至{this.props.date[this.lastUpdateDateMap[this.radioDefaultValue]]}</div>
            </div>
        );
    }

}

module.exports = Limithold;
