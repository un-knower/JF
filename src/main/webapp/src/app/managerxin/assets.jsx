import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {message,Table} from 'antd';
import $ from 'jquery';
import 'rsuite-table/lib/less/index.less';
import {PanelContainer,FilterController,JfCard,Column, Cell, HeaderCell,TipTable,Tools} from 'app_common';
import {getBusinessReport,getBusinessProdCode} from '../../api';
import _ from 'underscore';
import moment from 'moment';

import CONSTANTS from 'app_constants';
import immutable from 'immutable';

require('es6-promise').polyfill();

export default class Assets extends Component {
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
                    date:this.props.date.c_cashclient_business_01,
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
                    date:this.props.date.c_cashclient_business_01,
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
        this.reportId = '17';
        this.allProdCode = [];
    };

    handlePaginationOnChange(page){
        this.setState({tableLoading:true,tableCurrentPage:page});
        this.prevInputData.page = page;
        this.getReportDateFn(this.prevInputData);
    }

    getControllers() {

        let commonControllers = this.commonControllers;

        let controllers = [
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

    async componentDidMount(){
       const _this = this;
       const prodCode = await getBusinessProdCode();
       //console.log(prodCode);
       this.commonControllers.productid.treeData = [{value:'all',label:'全部',key:'all',children:prodCode.map(item=>{
           this.allProdCode.push(item.prod_code);
           return {value:item.prod_code,label:item.prod_code,key:item.prod_code}
       })}]
       this.commonControllers.productid.defaultValue = ['all'];

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
       sendParams.page = this.state.tableCurrentPage;
       sendParams.pageSize = CONSTANTS.report_default_page_size;
       if( sendParams['prodCode'] == 'all' ){
          sendParams['prodCode'] = this.allProdCode.join(',');
       }
       //6. 把这一次的参数设置为上次一使用的参数，用于下次切换筛选条件后的查询，如果和一样，则不进行查询，还用于报表的筛选和翻页
       this.prevInputData = sendParams;
       //7. 最后把默认表头和参数列表给到请求报表FN（如果没有指标就不传，会有默认表头）
       this.getReportDateFn(sendParams);
    }

    async getReportDateFn(sendParams){
        //校验为空
        for(let __key in sendParams){
            let __item = sendParams[__key];
            if (__item == '' || __item == undefined || __item == null || __item.length == 0) {
                message.info('请选择完整再进行查询');
                return false
            }
        }
        this.reportList = await getBusinessReport({...sendParams,reportId:this.reportId});
        let reportDataSources = this.reportList.data.map((item,index)=>(
            {...item,key:index,index:index+1}
        ));
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
        return `资金变动情况（${this.formatDate(this.radioDefaultValue=='year'?startDate.substring(0,4):this.radioDefaultValue=='month'?startDate.substring(0,6):startDate)}-${this.formatDate(this.radioDefaultValue=='year'?endDate.substring(0,4):this.radioDefaultValue=='month'?endDate.substring(0,6):endDate)}）`
    }

    //报表导出
    exportReport(e){
        const sendParams = _.extend({},this.prevInputData);
        sendParams.reportId = '17';
        const {page,pageSize,...elseobj} = sendParams;
        const urlParams = $.param({...elseobj,exportType:e.key});

        window.open(CONSTANTS.APP_BASE_URL+'/jr_report/jsp/reportExp.jsp?'+urlParams);
        // window.open('http://172.88.23.2:8885/jf'+'/jr_report/jsp/reportExp.jsp?'+urlParams);
    }

    //根据筛选条件重新查询报表
    clickQueryBtn(){
        const returnData = this.refs.filterController.getControllerData();
        let __prevObj = immutable.fromJS(this.prevInputData);
        let __nextObj = immutable.fromJS(returnData);
        //如果筛选条件一样不需要重新渲染
        if (!immutable.is(__prevObj,__nextObj)) {
            if( returnData['prodCode'] == 'all' ){
                returnData['prodCode'] = this.allProdCode.join(',');
            }

            this.setState({tableLoading:true});
            this.prevInputData = _.extend({
                page:1,
                pageSize:CONSTANTS.report_default_page_size
            }, returnData);
            this.getReportDateFn(this.prevInputData);
        }
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            sortColumn,
            sortType
        });
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

        const hasDate = this.state.reportDataSources.length>0;
        return (
            <div>
                <PanelContainer
                    hasFilter={<div> {filterContent} </div>}
                    title='资金变动统计'
                    hasTip={()=>{return this.returnTipTable('75')}}
                >
                    <div className="transaction_table_bb assets_table assets_height">
                        <div className="management_pagination_bg"></div>
                    <JfCard title={
                        <div>
                        <span>{this.state.reportTitle}</span>
                        <span className="pull-right">单位：万元</span>
                        </div>} loading={this.state.tableLoading}>
                        {hasDate?<Table
                            columns={CONSTANTS.assets_table_title}
                            scroll={{ x: 1500}}

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

module.exports = Assets;
