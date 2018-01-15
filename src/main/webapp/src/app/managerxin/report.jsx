import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {message,Pagination} from 'antd';
import $ from 'jquery';
import 'rsuite-table/lib/less/index.less';
import {PanelContainer,FilterController,JfCard,Table,Column, Cell, HeaderCell,TipTable,Tools} from 'app_common';
import {getBusinessReport,getBusinessProdCode} from '../../api';
import _ from 'underscore';
import moment from 'moment';
import CONSTANTS from 'app_constants';
import immutable from 'immutable';
// import $ from 'jquery';

require('es6-promise').polyfill();

export default class Report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportDataSources:[],
            commonControllers:[],
            sortType:undefined,
            sortColumn:undefined,
            tableLoading:false,
            reportTitle:'',
            tableCurrentPage:1,
            reportDataSourcesTotal:0
        };

        this.handlePaginationOnChange = this.handlePaginationOnChange.bind(this);
        this.handleSortColumn = this.handleSortColumn.bind(this);

        this.commonControllers = {
            start: {
                type: 'startDate',
                name: 'startDate',
                width: 6,
                label: '统计开始日期：',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_redemption_01,
                    formart:'YYYY-MM-DD',
                    addType:'months',
                    addVal:-1
                }),
                labelCol:'40%',
                wrapperCol:'60%'
            },
            end: {
                type: 'endDate',
                name: 'endDate',
                width: 6,
                label: '统计结束日期：',
                defaultValue:Tools.getStartDefaultDate({
                    date:this.props.date.c_cashclient_redemption_01,
                    formart:'YYYY-MM-DD',
                }),
                labelCol:'40%',
                wrapperCol:'60%'
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
            productid: {
                // type: 'select',
                // name: 'prodCode',
                // placeholder: '请选择',
                // width: 5,
                // label: '产品编号:',
                // labelCol:'33%',
                // wrapperCol:'65%',
                // multiple:true,
                // options: [
                //     {
                //         label: '003479',
                //         value: '003479'
                //     }, {
                //         label: 'C40005',
                //         value: 'C40005'
                //     }
                // ],
                // defaultValue:['003479','C40005']
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



        this.targetChildrenList = [];
        this.prevInputData = {};              //上次的查询条件，没每次切换报表类型时要重置此变量
        this.reportList = [];                 //查询回来的报表列表
        this.defaultTargetList = [];
        this.isSortAndList = {};              //判断是否排过序，并且把排序后的参数存进来
        this.reportId = '16';
        this.allProdCode = [];
    };

    getControllers() {

        let commonControllers = this.commonControllers;

        let     controllers = [
                    [
                        commonControllers.start,
                        commonControllers.end,
                        commonControllers.productid,
                        commonControllers.queryBtn,
                        commonControllers.exportBtn
                    ]
                ];


        return controllers;
    }

    async componentDidMount(obj={page:'1'}){
       const _this = this;
       const prodCode = await getBusinessProdCode();
       //console.log(prodCode);
       this.commonControllers.productid.treeData = [{value:'all',label:'全部',key:'all',children:prodCode.map(item=>{
           this.allProdCode.push(item.prod_code);
           return {value:item.prod_code,label:item.prod_code,key:item.prod_code}
       })}]
       this.commonControllers.productid.defaultValue = ['all'];

       this.defaultTargetList = CONSTANTS.report_table_title;  //获取table表头信息
       // if (obj.orderKey === undefined) {
       //     obj.orderKey = this.defaultTargetList[0].field_name;
       //     obj.order = 'desc';
       //     this.setState({sortColumn:this.defaultTargetList[0].field_name,sortType:'desc'})
       // }
       const commonControllers = this.getControllers();
       //先渲染筛选组件
       this.setState({commonControllers,tableLoading:true});
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

       if( sendParams['prodCode'] == 'all' ){
          sendParams['prodCode'] = this.allProdCode.join(',');
       }
       //6. 把这一次的参数设置为上次一使用的参数，用于下次切换筛选条件后的查询，如果和一样，则不进行查询，还用于报表的筛选和翻页
       this.prevInputData = sendParams;
       //7. 最后把默认表头和参数列表给到请求报表FN（如果没有指标就不传，会有默认表头）
       this.getReportDateFn();
    }

    async getReportDateFn(){
        //获取表内容
        const sendParams = {...this.prevInputData,...this.isSortAndList};
        //校验为空
        for(let __key in sendParams){
            let __item = sendParams[__key];
            if (__item == '' || __item == undefined || __item == null || __item.length == 0) {
                message.info('请选择完整再进行查询');
                return false
            }
        }
        this.reportList = await getBusinessReport({
            ...sendParams,
            reportId:this.reportId,
            page:this.state.tableCurrentPage,
            pageSize:CONSTANTS.report_default_page_size
        });
        let reportDataSources = [];
        this.reportList.data.map((item,key)=>{
            let list = {};
            _.map(this.defaultTargetList,(column)=>{
                if (item[column.field_name]) {
                    list[column.field_name] = item[column.field_name]
                }
            })
            reportDataSources.push({row_index:key+1,branch_name:item.branch_name,...list,key});
        })
        const reportTitle = this.formatReportTitle({startDate:sendParams.startDate,endDate:sendParams.endDate});
        this.setState({reportDataSources,reportTitle,tableLoading:false,reportDataSourcesTotal:this.reportList.total});
    }

    formatDate(date){
        if(date.length==8) return `${date.substring(0,4)}.${date.substring(4,6)}.${date.substring(6,8)}`
        else if (date.length==6) return `${date.substring(0,4)}年${date.substring(4,6)}月`
        else if (date.length==4) return `${date.substring(0,4)}年`
        return date
    }

    formatReportTitle(params){
        const {startDate,endDate} = params;
        return `${CONSTANTS.managerxin_report_title}（${this.formatDate(this.radioDefaultValue=='year'?startDate.substring(0,4):this.radioDefaultValue=='month'?startDate.substring(0,6):startDate)}-${this.formatDate(this.radioDefaultValue=='year'?endDate.substring(0,4):this.radioDefaultValue=='month'?endDate.substring(0,6):endDate)}）`
    }

    handlePaginationOnChange(page){
        //console.log(page);
        let _this = this;
        this.setState({tableLoading:true,tableCurrentPage:page},()=>{
            _this.getReportDateFn();
        });

    }

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.prevInputData);
        sendParams.reportId = '16';
        const urlParams = $.param({...sendParams,exportType:e.key});

        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();
        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj)) {

            if( returnData['prodCode'] == 'all' ){
                //console.log(this.allProdCode);
                returnData['prodCode'] = this.allProdCode.join(',');
            }

            this.setState({tableLoading:true});
            this.prevInputData = _.extend({}, returnData);
            this.isSortAndList = {};   //重新查询的，去掉排序
            this.getReportDateFn();
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
        this.getReportDateFn();
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
                            console.log(x);
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


        // $('.ant-menu li:first').find('.ant-menu-sub').addClass('ant-menu-height');
        // $('.ant-menu li:nth-child(2)').find('.ant-menu-sub').addClass('ant-menu-height');

        const filterContent = <FilterController
            ref='filterController'
            controllers={this.state.commonControllers}
        />;

        let reportTitleList = [
            <Column align="center" width={50} key='row_index' resizable fixed width={70}>
                <HeaderCell>序号</HeaderCell>
                <Cell dataKey='row_index' />
            </Column>
        ];
        this.defaultTargetList.map(item=>{
            reportTitleList.push(
                <Column align="center" key={item.index_id} resizable sortable width={260}>
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
                    title='申购赎回'
                    hasTip={()=>{return this.returnTipTable('74')}}
                >
                    <div className="transaction_table_bb report_table report_right">
                        <div className="management_pagination_bg"></div>
                    <JfCard title={<div>
                    <span>{this.state.reportTitle}</span>
                    <span className="pull-right">单位：万元</span>
                    </div>}

                         loading={this.state.tableLoading}>
                        {hasDate?<div><Table
                            data={this.getReportData()}
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
                <div className='layout-footer'>本页数据更新至{this.props.date.c_cashclient_redemption_01}</div>

            </div>
        );
    }

}

module.exports = Report;
